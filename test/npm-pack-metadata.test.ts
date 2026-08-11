import { describe, expect, it } from "vitest";

import { getNpmPackFilename } from "../scripts/read-npm-pack-filename.mjs";

const packageRecord = {
    filename: "eslint-plugin-secretlint-2.0.3.tgz",
    name: "eslint-plugin-secretlint",
};

describe("npm pack metadata", () => {
    it("reads the npm 11 array form", () => {
        expect.assertions(1);

        expect(
            getNpmPackFilename([packageRecord], "eslint-plugin-secretlint")
        ).toBe(packageRecord.filename);
    });

    it("reads the npm 12 package-name-keyed object form", () => {
        expect.assertions(1);

        expect(
            getNpmPackFilename(
                { "eslint-plugin-secretlint": packageRecord },
                "eslint-plugin-secretlint"
            )
        ).toBe(packageRecord.filename);
    });

    it.each([
        ["no records", []],
        ["multiple records", [packageRecord, packageRecord]],
        ["a non-record entry", [null]],
        ["a blank filename", [{ ...packageRecord, filename: " " }]],
    ])("rejects %s", (_label, metadata) => {
        expect.assertions(1);

        expect(() =>
            getNpmPackFilename(metadata, "eslint-plugin-secretlint")
        ).toThrow(TypeError);
    });

    it("rejects metadata for a different package", () => {
        expect.assertions(1);

        expect(() =>
            getNpmPackFilename([packageRecord], "different-package")
        ).toThrow(/different-package/v);
    });
});
