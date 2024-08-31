// @ts-check
import tseslint from 'typescript-eslint';

export default tseslint.config(
    ...tseslint.configs.recommended.map(config => ({
        ...config,
        files: [...(config.files ?? []), '**/*.ts', '**/*.tsx']
    })),
    {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            '@typescript-eslint': tseslint.plugin
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: true,
                ecmaVersion: 'latest',
                sourceType: 'module'
            }
        },
        rules: {
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-shadow': 'error',
            '@typescript-eslint/no-unused-vars': 'warn'
        }
    }
);
