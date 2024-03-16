/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier',
    ],
    overrides: [
        {
            files: [
                '**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}',
                'cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}',
                '*.config.js',
            ],
            extends: ['plugin:cypress/recommended'],
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    ignorePatterns: ['*.config.js'],
};
