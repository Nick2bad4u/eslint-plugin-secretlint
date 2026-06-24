import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars = {
    rules: [
        {
            collapsed: false,
            items: [
                "guides/intro",
                "guides/getting-started",
                "guides/secretlint-bridge",
                "guides/config-authoring",
                "guides/faq",
            ],
            label: "Guides",
            type: "category",
        },
        {
            collapsed: false,
            items: [
                "presets/recommended",
                "presets/secretlint-only",
                "presets/configuration",
                "presets/all",
            ],
            label: "Presets",
            link: { id: "presets/index", type: "doc" },
            type: "category",
        },
        {
            collapsed: false,
            items: [
                "secretlint",
                "require-secretlint-config-file-naming-convention",
                "require-secretlint-rules-array",
                "require-secretlint-rule-id",
                "disallow-secretlint-empty-rule-id",
                "disallow-secretlint-duplicate-rules",
                "disallow-secretlint-relative-rule-paths",
                "require-secretlint-rules-packages-installed",
                "disallow-secretlint-unknown-rule-properties",
                "prefer-secretlint-allow-message-ids-array",
                "prefer-secretlint-nested-rules-array",
            ],
            label: "Rules",
            link: {
                slug: "/",
                title: "Rule Reference",
                type: "generated-index",
            },
            type: "category",
        },
    ],
} satisfies SidebarsConfig;
export default sidebars;
