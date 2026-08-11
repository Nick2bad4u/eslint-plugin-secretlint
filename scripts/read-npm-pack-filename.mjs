import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const isRecord = (value) =>
    typeof value === "object" && value !== null && !Array.isArray(value);

const getPackageRecords = (metadata) => {
    if (Array.isArray(metadata)) return metadata;
    if (isRecord(metadata)) return Object.values(metadata);

    throw new TypeError(
        "npm pack metadata must be an array or a package-name-keyed object."
    );
};

export const getNpmPackFilename = (metadata, expectedPackageName) => {
    const packageRecords = getPackageRecords(metadata);
    if (packageRecords.length !== 1 || !isRecord(packageRecords[0])) {
        throw new TypeError(
            `Expected exactly one valid npm pack record; received ${packageRecords.length}.`
        );
    }

    const [packageRecord] = packageRecords;
    if (
        expectedPackageName !== undefined &&
        typeof packageRecord.name === "string" &&
        packageRecord.name !== expectedPackageName
    ) {
        throw new TypeError(
            `Expected npm pack metadata for ${expectedPackageName}; received ${packageRecord.name}.`
        );
    }

    const filename = packageRecord.filename;
    if (typeof filename !== "string" || filename.trim().length === 0) {
        throw new TypeError(
            "npm pack metadata must contain a nonblank filename."
        );
    }
    return filename;
};

const run = async () => {
    const [metadataPath, expectedPackageName] = process.argv.slice(2);
    if (metadataPath === undefined) {
        throw new TypeError(
            "Usage: node scripts/read-npm-pack-filename.mjs <metadata-path> [package-name]"
        );
    }

    const metadata = JSON.parse(await readFile(metadataPath, "utf8"));
    process.stdout.write(getNpmPackFilename(metadata, expectedPackageName));
};

if (process.argv[1] !== undefined) {
    const entrypointUrl = pathToFileURL(process.argv[1]).href;
    if (import.meta.url === entrypointUrl) await run();
}
