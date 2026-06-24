import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";

const runnerEntryUrl = new URL(
    "../src/_internal/secretlint-runner.ts",
    import.meta.url
);
const runnerEntry = runnerEntryUrl.href;

describe("secretlint worker lifecycle", () => {
    it("allows an isolated process to exit after bridge execution", () => {
        expect.assertions(2);

        const script = `
            import { runSecretlintSynchronously } from ${JSON.stringify(runnerEntry)};
            runSecretlintSynchronously({
                code: ${JSON.stringify("OPENAI_API_KEY=sk-testtesttesttesttesttesttesttesttesttesttesttest\n")},
                codeFilename: "sample.env",
                cwd: process.cwd(),
                
            });
        `;
        const result = spawnSync(
            process.execPath,
            [
                "--experimental-strip-types",
                "--input-type=module",
                "--eval",
                script,
            ],
            {
                cwd: process.cwd(),
                encoding: "utf8",
                timeout: 20_000,
                windowsHide: true,
            }
        );

        expect(result.error).toBeUndefined();
        expect(result.signal).toBeNull();
    }, 30_000);
});
