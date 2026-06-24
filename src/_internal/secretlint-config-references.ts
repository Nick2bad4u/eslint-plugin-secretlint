import type { ArrayValues } from "type-fest";

import { objectHasOwn } from "ts-extras";

export const secretlintConfigNames = [
    "all",
    "configs",
    "configuration",
    "recommended",
    "secretlintOnly",
    "text",
] as const;

export type SecretlintConfigMetadata = Readonly<{
    icon: string;
    presetName: `secretlint:${SecretlintConfigName}`;
    readmeOrder: number;
}>;

export type SecretlintConfigName = ArrayValues<typeof secretlintConfigNames>;

export const secretlintConfigMetadataByName: Readonly<
    Record<SecretlintConfigName, SecretlintConfigMetadata>
> = {
    all: { icon: "🟣", presetName: "secretlint:all", readmeOrder: 4 },
    configs: { icon: "🔧", presetName: "secretlint:configs", readmeOrder: 6 },
    configuration: {
        icon: "🔧",
        presetName: "secretlint:configuration",
        readmeOrder: 3,
    },
    recommended: {
        icon: "🟡",
        presetName: "secretlint:recommended",
        readmeOrder: 1,
    },
    secretlintOnly: {
        icon: "🧪",
        presetName: "secretlint:secretlintOnly",
        readmeOrder: 2,
    },
    text: { icon: "🧪", presetName: "secretlint:text", readmeOrder: 5 },
};

export const secretlintConfigNamesByReadmeOrder: readonly SecretlintConfigName[] =
    [
        "recommended",
        "secretlintOnly",
        "configuration",
        "all",
    ];

export const secretlintConfigReferenceToName = {
    "secretlint.configs.all": "all",
    "secretlint.configs.configs": "configuration",
    "secretlint.configs.configuration": "configuration",
    "secretlint.configs.recommended": "recommended",
    "secretlint.configs.secretlintOnly": "secretlintOnly",
    "secretlint.configs.text": "secretlintOnly",
} as const;

export type SecretlintConfigReference =
    keyof typeof secretlintConfigReferenceToName;

export const isSecretlintConfigReference = (
    value: string
): value is SecretlintConfigReference =>
    objectHasOwn(secretlintConfigReferenceToName, value);
