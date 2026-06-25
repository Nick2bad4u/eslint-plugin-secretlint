module.exports = {
    rules: [
        {
            id: "@secretlint/secretlint-rule-pattern",
            options: {
                patterns: [
                    {
                        name: "Fixture secret",
                        pattern: "/fixture-secret-[A-Za-z0-9]{20,}/",
                    },
                ],
            },
        },
    ],
};
