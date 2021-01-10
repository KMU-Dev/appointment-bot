module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
    ],
    env: {
        node: true,
    },
    rules: {
        'prettier/prettier': [
            'error',
            {
                printWidth: 120,
                trailingComma: 'es5',
                tabWidth: 4,
                singleQuote: true,
            },
        ],
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off',
    },
    plugins: ['import', 'prettier', '@typescript-eslint'],
    overrides: [
        {
            files: ['**/*.test.ts'],
            env: {
                jest: true,
            },
        },
    ],
};
