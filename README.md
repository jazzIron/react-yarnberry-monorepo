# react-yarn2-monorepo

> yarn berry workspace를 활용한 모노레포 템플릿 프로젝트

## Project Setting 

1. yarn 설치
2. eslint의 사용을 위해 <code>yarn</code>를 통해 core-js 모듈 빌드 필수
3. **VS Code** 사용시 PnP를 정상적으로 사용하기 위해 <code>yarn dlx @yarnpkg/sdks vscode</code> 실행
   > 참고: <https://yarnpkg.com/getting-started/editor-sdks#vscode>

- VSCode extension zipfs추가
```bash
yarn dlx @yarnpkg/sdks vscode
```
.vscode 폴더와.yarn/sdks에 추가된 SDK를 확인 Zero-Installs을 사용하기 때문에 .vscode는 .gitignore에 추가하면 안됩니다.

-. typescript plugin import
플러그인은 types를 포함하지 않는 패키지를 추가할 때 @types/ 패키지를 package.json 폴더에 종속성을 자동으로 추가해줌

```bash
yarn plugin import typescript
```
설치 후에는 .yarn/plugins/@yarnpkg 폴더 아래에 plugin-typescript.cjs 파일이 생성 TypeScript 버전 선택..을 검색해 Use Workspace Version 선택하여 workspace의 typescript sdk 변경



## 파일 구조

```markdown 
 - /.husky
   husky 라이브러리 관련 코드가 위치하며, pre-commit을 수행
 
 - /packages
   개별 프로젝트 디렉터리 입니다.

 - .eslintrc.js
   lint의 설정은 동일, 개별 프로젝트에서는 lint 설정이 필요없음  
   따라서 lint 통합 설정 파일이 됩니다.
 
 - .prettierrc.json
   prettier 통합 설정 파일, lint와 같이 prettier의 설정도 동일
   개별 프로젝트에는 prettier 설정이 필요없음
 
 - lint-staged.config.js
   lint-staged 설정

 - react-yarn2-monorepo.code-workspace
   [multi-root workspaces](https://code.visualstudio.com/docs/editor/multi-root-workspaces) 설정파일

 - tsconfig.json
   공통 타입스크립트 세팅을 개별 프로젝트에서 import하여 사용

```

## 참고사항


1. 개별 프로젝트의 스크립트 실행
프로젝트의 스크립트는 <code>yarn workspace 프로젝트명 스크립트</code>를 통해 실행

ex) 
```js
yarn combine add express @common/components
```

```js
"scripts": {
  "common-components": "yarn workspace @common/components",
  "common-styles": "yarn workspace @common/styles",
  ...
}
```

2. 다른 프로젝트의 참조
각 프로젝트는 package.json의 <code>name</code>으로 식별, 다른 프로젝트는 아래와 같은 방식으로 해당 프로젝트를 참조

```js
"dependencies": {
  "@common/components": "workspace:*",
  "@common/styles": "workspace:*",
  ...
}
```

3. eslint

- 각 프로젝트별 tsconfig.json 설정을 따르기 위해 setting/overriders에 프로젝트별 설정이 필요

```js
{
  files: [
    'packages/디렉토리명/**/*.ts?(x)',
    'packages/디렉토리명/**/*.js?(x)',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: path.resolve(
          // tsconfig.json 경로
        ),
      },
    },
  },
},
```

4. tsconfig 설정
 
 - 참조할 프로젝트 경로를 root tsconfig references에 설정
 - 참조될 개별 프로젝트의 tsconfig에는 composite 및 declartion을 설정
 > 참고: <https://www.typescriptlang.org/docs/handbook/project-references.html>

```js
"references": [
  {
    "path": "packages/common-components"
  },
  {
    "path": "packages/common-styles"
  },
],
```

```js
"compilerOptions": {
  "composite": true,
  "declaration": true,
}
```