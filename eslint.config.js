import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import ts from '@typescript-eslint/parser'; // Thêm parser cho TypeScript
import tsConfig from '@typescript-eslint/eslint-plugin'; // Thêm plugin cho TypeScript

export default [
  { ignores: ['dist'] },
  // Cấu hình chính
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: ts,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tsConfig,
    },
    rules: {
      'no-unused-vars': 'off', // Tắt quy tắc no-unused-vars
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Các quy tắc cho TypeScript
      '@typescript-eslint/no-unused-vars': ['error'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  
  // Các cấu hình bổ sung cho React
  {
    files: ['**/*.tsx', '**/*.ts'],
    languageOptions: {
      parser: ts,
      globals: {
        ...globals.browser,
        'React': true, // Biến React có sẵn
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Không cần thiết trong React 17+
      'react-refresh/only-export-components': 'off',
    },
  },
];
