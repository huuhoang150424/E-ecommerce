import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import ts from '@typescript-eslint/parser'; 
import tsConfig from '@typescript-eslint/eslint-plugin'; 

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
      'no-unused-vars': 'off', // Tắt quy tắc no-unused-vars của ESLint
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { 'vars': 'all', 'varsIgnorePattern': '^_', 'argsIgnorePattern': '^_' },
      ], // Tắt cảnh báo cho import không sử dụng bắt đầu với dấu _
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
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
        React: true, // Biến React có sẵn
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Không cần thiết trong React 17+
      'react-refresh/only-export-components': 'off',
    },
  },
];

