import { FlatCompat } from '@eslint/eslintrc';
import perfectionist from 'eslint-plugin-perfectionist';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        plugins: {
            perfectionist,
        },
        rules: {
            'perfectionist/sort-imports': [
                'error',
                {
                    type: 'alphabetical',
                    order: 'asc',
                    fallbackSort: { type: 'unsorted' },
                    ignoreCase: true,
                    specialCharacters: 'keep',
                    internalPattern: ['^~/.+', '^@/.+'],
                    partitionByComment: false,
                    partitionByNewLine: false,
                    newlinesBetween: 1,
                    maxLineLength: undefined,
                    groups: [
                        'type-import',
                        ['value-builtin', 'value-external'],
                        'type-internal',
                        'value-internal',
                        ['type-parent', 'type-sibling', 'type-index'],
                        ['value-parent', 'value-sibling', 'value-index'],
                        'ts-equals-import',
                        'unknown',
                    ],
                    customGroups: [],
                    environment: 'node',
                },
            ],
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    disallowTypeAnnotations: false,
                },
            ],
        },
    },
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'react-hooks/exhaustive-deps': 'off',
        },
    },
];

export default eslintConfig;
