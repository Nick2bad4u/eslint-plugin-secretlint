import { describe, expect, it } from "vitest";

import { secretlintConfigNames } from "../src/_internal/secretlint-config-references";
import secretlintPlugin from "../src/plugin";

describe("secretlint plugin configs", () => {
    it("exports exactly the supported config keys", () => {
        expect(Object.keys(secretlintPlugin.configs).toSorted()).toStrictEqual(
            [...secretlintConfigNames].toSorted()
        );
    });

    it("keeps aliases wired to preferred preset names", () => {
        expect(secretlintPlugin.configs.text).toBe(
            secretlintPlugin.configs.secretlintOnly
        );
        expect(secretlintPlugin.configs.configs).toBe(
            secretlintPlugin.configs.configuration
        );
    });
});
