// @ts-check
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

import eslint from '@eslint/js';

import errors from './eslint/errors.js';
import style from './eslint/style.js';
import typescript from './eslint/typescript.js';

export default tseslint.config(
    eslint.configs.recommended,
    ...typescript,
    ...errors,
    ...style,
    eslintConfigPrettier,
    {
        plugins: {
            react: eslintPluginReact,
            'react-hooks': eslintPluginReactHooks
        },
        rules: {
            ...eslintPluginReactHooks.configs.recommended.rules
        }
    },
    {
        ignores: [
            '**/.yarn/',
            '**/build/',
            '**/dist/',
            '**/.cache/',
            '**/prettier.config.js',
            '**/eslint.config.js'
        ]
    }
);
