import type { Linter } from "eslint";

import { arrayIncludes } from "ts-extras";

type RawProgram = Readonly<{
    body: [];
    comments: [];
    loc: { end: SourcePosition; start: SourcePosition };
    range: [number, number];
    sourceType: "module";
    tokens: [];
    type: "Program";
}>;
type SourcePosition = Readonly<{ column: number; line: number }>;

const getDocumentEndPosition = (text: string): SourcePosition => {
    let column = 0;
    let line = 1;
    for (let index = 0; index < text.length; index += 1) {
        const character = text[index];
        if (character === "\r") {
            line += 1;
            column = 0;
            if (text[index + 1] === "\n") index += 1;
            continue;
        }
        if (
            arrayIncludes(
                [
                    "\n",
                    "\u{2028}",
                    "\u{2029}",
                ] as const,
                character
            )
        ) {
            line += 1;
            column = 0;
            continue;
        }
        column += 1;
    }
    return { column, line };
};

const createRawProgram = (text: string): RawProgram => ({
    body: [],
    comments: [],
    loc: { end: getDocumentEndPosition(text), start: { column: 0, line: 1 } },
    range: [0, text.length],
    sourceType: "module",
    tokens: [],
    type: "Program",
});

/**
 * RawTextParser raw text parser contract.
 */
export const rawTextParser: Linter.Parser = {
    meta: {
        name: "eslint-plugin-secretlint/raw-text-parser",
        version: "1.0.0",
    },
    parseForESLint: (text: string) => ({
        ast: createRawProgram(text),
        services: {},
        visitorKeys: { Program: [] },
    }),
};
