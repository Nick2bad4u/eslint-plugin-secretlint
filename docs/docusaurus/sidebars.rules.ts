import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars = {
    rules: [
        {
            className: "sb-doc-overview",
            id: "overview",
            label: "🏁 Overview",
            type: "doc",
        },
        {
            className: "sb-cat-guides",
            collapsed: false,
            items: [
                "guides/intro",
                "guides/getting-started",
                "guides/secretlint-bridge",
                "guides/config-authoring",
                "guides/faq",
            ],
            label: "📚 Guides",
            type: "category",
        },
        {
            className: "sb-cat-presets",
            collapsed: false,
            items: [
                {
                    className: "sb-preset-recommended",
                    id: "presets/recommended",
                    label: "🟡 Recommended",
                    type: "doc",
                },
                {
                    className: "sb-preset-only",
                    id: "presets/secretlint-only",
                    label: "🧪 Secretlint bridge only",
                    type: "doc",
                },
                {
                    className: "sb-preset-configuration",
                    id: "presets/configuration",
                    label: "🔧 Configuration",
                    type: "doc",
                },
                {
                    className: "sb-preset-all",
                    id: "presets/all",
                    label: "🟣 All",
                    type: "doc",
                },
            ],
            label: "🛠️ Presets",
            link: { id: "presets/index", type: "doc" },
            type: "category",
        },
        {
            className: "sb-cat-rules",
            collapsed: false,
            items: [
                "secretlint",
                "require-secretlint-config-file-naming-convention",
                "require-secretlint-rules-array",
                "require-secretlint-rule-id",
                "disallow-secretlint-duplicate-rules",
                "disallow-secretlint-empty-rule-id",
                "disallow-secretlint-relative-rule-paths",
                "disallow-secretlint-unknown-rule-properties",
                "prefer-secretlint-allow-message-ids-array",
                "prefer-secretlint-nested-rules-array",
                "require-secretlint-rules-packages-installed",
            ],
            label: "📜 Rules",
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
