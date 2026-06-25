import { ESLint } from "eslint";
import { mkdtempSync, writeFileSync } from "node:fs";
import { rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import pc from "picocolors";

/** @typedef {import("eslint").Linter.Config} FlatConfig */
/** @typedef {import("eslint").ESLint.LintResult} LintResult */
/** @typedef {Record<string, FlatConfig | readonly FlatConfig[]>} PluginConfigs */

const positiveIntegerPattern = /^(?:[1-9]\d*)$/u;

/** @param {string} value */
const parsePositiveInteger = (value) => {
    if (!positiveIntegerPattern.test(value)) return undefined;

    const parsedValue = Number.parseInt(value, 10);
    return Number.isSafeInteger(parsedValue) && parsedValue > 0
        ? parsedValue
        : undefined;
};

/** @param {readonly string[]} argv */
const getExpectedEslintMajor = (argv) => {
    const expectedFlag = argv.find((argument) =>
        argument.startsWith("--expect-eslint-major=")
    );
    if (expectedFlag === undefined) return undefined;

    const rawMajor = expectedFlag.slice("--expect-eslint-major=".length);
    const parsedMajor = parsePositiveInteger(rawMajor);
    if (parsedMajor === undefined) {
        throw new TypeError(
            `Invalid --expect-eslint-major value: ${rawMajor}. Expected a positive integer major version.`
        );
    }
    return parsedMajor;
};

/** @param {string} version */
const getEslintMajorVersion = (version) => {
    const [majorText = "0"] = version.split(".");
    const parsedMajor = parsePositiveInteger(majorText);
    if (parsedMajor === undefined) {
        throw new TypeError(
            `Unable to determine ESLint major version from: ${version}`
        );
    }
    return parsedMajor;
};

/**
 * @param {PluginConfigs} pluginConfigs
 * @param {string} configName
 *
 * @throws {TypeError} When the requested config is missing.
 */
const getFlatConfigArray = (pluginConfigs, configName) => {
    const configValue = pluginConfigs[configName];
    if (configValue === undefined) {
        throw new TypeError(`Could not find plugin.configs.${configName}.`);
    }
    return Array.isArray(configValue)
        ? configValue
        : [/** @type {FlatConfig} */ (configValue)];
};

/**
 * @param {PluginConfigs} pluginConfigs
 * @param {string} configName
 *
 * @throws {TypeError} When the requested config is missing or is not singular.
 */
const getSingleFlatConfig = (pluginConfigs, configName) => {
    const configValue = pluginConfigs[configName];
    if (configValue === undefined) {
        throw new TypeError(`Could not find plugin.configs.${configName}.`);
    }
    if (Array.isArray(configValue)) {
        throw new TypeError(
            `Expected plugin.configs.${configName} to be a single flat config object.`
        );
    }
    return /** @type {FlatConfig} */ (configValue);
};

/** @returns {Promise<PluginConfigs>} */
const loadPluginConfigs = async () => {
    const pluginModule = await import("../plugin.mjs");
    const pluginValue = pluginModule.default;
    return /** @type {PluginConfigs} */ (pluginValue.configs ?? {});
};

/**
 * @param {LintResult | undefined} result
 * @param {string} ruleId
 * @param {string} label
 */
const assertDiagnostic = (result, ruleId, label) => {
    if (!result?.messages.some((message) => message.ruleId === ruleId)) {
        throw new Error(`${label} did not produce ${ruleId} diagnostics.`);
    }
};

const run = async () => {
    const expectedEslintMajor = getExpectedEslintMajor(process.argv.slice(2));
    const installedEslintMajor = getEslintMajorVersion(ESLint.version);

    if (
        expectedEslintMajor !== undefined &&
        installedEslintMajor !== expectedEslintMajor
    ) {
        throw new Error(
            `Expected ESLint major ${expectedEslintMajor} but found ${ESLint.version}.`
        );
    }

    const pluginConfigs = await loadPluginConfigs();
    const temporaryDirectory = mkdtempSync(
        join(tmpdir(), "secretlint-compat-")
    );

    try {
        const configPath = join(temporaryDirectory, ".secretlintrc.cjs");
        writeFileSync(
            configPath,
            'module.exports = { rules: [{ id: "@secretlint/secretlint-rule-pattern", options: { patterns: [{ name: "OpenAI", pattern: "/sk-[A-Za-z0-9]{20,}/" }] } }] };\n'
        );

        const bridgeConfig = getFlatConfigArray(
            pluginConfigs,
            "secretlintOnly"
        ).map((config) =>
            config.rules?.["secretlint/secretlint"] === undefined
                ? config
                : {
                      ...config,
                      rules: {
                          ...config.rules,
                          "secretlint/secretlint": [
                              "error",
                              { configFile: configPath },
                          ],
                      },
                  }
        );
        const bridgeEslint = new ESLint({
            cwd: process.cwd(),
            overrideConfig: bridgeConfig,
            overrideConfigFile: true,
        });
        const [bridgeResult] = await bridgeEslint.lintText(
            "OPENAI_API_KEY=sk-testtesttesttesttesttesttesttesttesttesttesttest\n",
            { filePath: "compat.env" }
        );
        assertDiagnostic(
            bridgeResult,
            "secretlint/secretlint",
            "Secretlint bridge"
        );

        const configEslint = new ESLint({
            cwd: process.cwd(),
            overrideConfig: getSingleFlatConfig(pluginConfigs, "configuration"),
            overrideConfigFile: true,
        });
        const [configResult] = await configEslint.lintText(
            "export default {};",
            { filePath: ".secretlintrc.mjs" }
        );
        assertDiagnostic(
            configResult,
            "secretlint/require-secretlint-rules-array",
            "Secretlint config preset"
        );
    } finally {
        await rm(temporaryDirectory, { force: true, recursive: true });
    }

    console.log(
        `${pc.green("OK")} ESLint ${installedEslintMajor} compatibility smoke checks passed.`
    );
};

await run();
