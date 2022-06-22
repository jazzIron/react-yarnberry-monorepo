const path = require('path');

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    // 순서 중요
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'prettier', '@emotion', 'jest', 'jest-dom'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-var-requires': 'off', // var 사용금지
    '@typescript-eslint/no-unused-vars': 'off', // 선언 후 미사용 금지

    'import/no-extraneous-dependencies': [
      'error',
      {
        //  테스트 또는 개발환경을 구성하는 파일에서는 devDependency 사용을 허용
        devDependencies: [
          '**/*.stories.tsx',
          '**/*.@(spec|test).@(js|ts)?(x)',
          '**/testUtils.tsx',
          '**/jest.setup.ts',
          '**/.storybook/*.@(js|ts)?(x)',
          '**/webpack.*.js',
          '**/script/*.js',
          '**/mocks/**/*.@(js|ts)?(x)',
        ],
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off', // props로 받은 것 바로 props로 넘기기 허용
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.tsx', '.jsx', 'spec.js'] }, //확장자 설정
    ],
    'react/function-component-definition': 'off',
    'import/no-duplicates': 'off', // 중복 가져오기 허용여부
    'import/extensions': [
      // import text from './text/text.js
      // 이럴 때 뒤에 js같은 확장자 붙일지 말지 결정
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/order': [
      // 입력 순서 검사
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '[@]common/**',
            group: 'external',
            position: 'after',
          },
        ],
        //pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  overrides: [
    // 설정 오버라이드
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off', // 함수 리턴타입 정의
        'no-use-before-define': 'off', // 변수가 정의되기 전에 사용 금지
        '@typescript-eslint/no-use-before-define': ['error', { variables: false }],
        'no-useless-constructor': 'off', // 불필요한 생성자 생성 금지
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/no-floating-promises': 'off',
      },
      parserOptions: {
        project: ['./tsconfig.json', './packages/**/tsconfig.json'],
      },
    },
    {
      files: ['**/*.spec.ts?(x)'],
      rules: {
        '@typescript-eslint/unbound-method': 'off',
        'jest/unbound-method': 'error',
      },
    },
    {
      files: ['packages/common-components/**/*.ts?(x)', 'packages/common-components/**/*.js?(x)'],
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(`${__dirname}/packages/common-components/tsconfig.json`),
          },
        },
      },
    },
    {
      files: ['packages/common-styles/**/*.ts?(x)', 'packages/common-styles/**/*.js?(x)'],
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(`${__dirname}/packages/common-styles/tsconfig.json`),
          },
        },
      },
    },
    {
      files: ['packages/common-utils/**/*.ts?(x)', 'packages/common-utils/**/*.js?(x)'],
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(`${__dirname}/packages/common-utils/tsconfig.json`),
          },
        },
      },
    },
    {
      files: ['packages/admin-combine/**/*.ts?(x)', 'packages/admin-combine/**/*.js?(x)'],
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(`${__dirname}/packages/admin-combine/tsconfig.json`),
          },
        },
      },
    },
    {
      files: ['packages/admin-hospital/**/*.ts?(x)', 'packages/admin-hospital/**/*.js?(x)'],
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(`${__dirname}/packages/admin-hospital/tsconfig.json`),
          },
        },
      },
    },
  ],

  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', 'spec.js'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts', '.js', '.jsx'],
    },
    'import/resolver': {
      //ESLint 를 적용하지 않을 폴더나 파일을 명시
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
