#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentName = process.argv[2];

if (!componentName) {
    console.error('❌ Пожалуйста, укажите имя компонента');
    console.log('   Пример: npm run generate:feature search-query');
    process.exit(1);
}

const componentClassName = componentName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const componentFileName = componentName.toLowerCase();
const hookName = `use${componentClassName}`; // useSearchQuery (PascalCase)
const typeHookName = `TUse${componentClassName}`; // TUseSearchQuery
const hookFileName = `use-${componentFileName}`; // use-search-query (kebab-case для файла)

const basePath = path.join(__dirname, '..', 'src', 'features', componentFileName);

const folders = [
    basePath,
    path.join(basePath, 'hooks', hookFileName),
    path.join(basePath, 'model'),
    path.join(basePath, 'ui'),
];

folders.forEach((folder) => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
        console.log(`📁 Создана папка: ${folder}`);
    }
});

const files = [
    {
        path: path.join(basePath, 'model', `${componentFileName}.model.ts`),
        content: `export interface I${componentClassName}Props {
  children?: React.ReactNode;
}
`,
    },
    {
        path: path.join(basePath, 'model', 'index.ts'),
        content: `export * from './${componentFileName}.model';
`,
    },
    {
        path: path.join(basePath, 'hooks', hookFileName, `${hookFileName}.hook.ts`),
        content: `import { useState, useCallback, useMemo } from 'react';
import type * as Types from './${hookFileName}.types';

export const ${hookName}: Types.${typeHookName} = (args) => {
  // TODO: реализовать логику хука
  
  return {
    // TODO: вернуть нужные значения
  };
};
`,
    },
    {
        path: path.join(basePath, 'hooks', hookFileName, `${hookFileName}.types.ts`),
        content: `import type * as Model from '../../model';

type ${typeHookName}Args = {
  // TODO: добавить параметры
}

type ${typeHookName}Result = {
  // TODO: добавить поля результата
}

export type ${typeHookName} = (args: ${typeHookName}Args) => ${typeHookName}Result;
`,
    },
    {
        path: path.join(basePath, 'hooks', hookFileName, 'index.ts'),
        content: `export * from './${hookFileName}.hook';`,
    },
    {
        path: path.join(basePath, 'hooks', 'index.ts'),
        content: `export * from './${hookFileName}';`,
    },
    {
        path: path.join(basePath, 'ui', `${componentFileName}.component.tsx`),
        content: `import { memo } from 'react';
import * as Model from '../model';
import * as Styles from './${componentFileName}.styles';
import * as Hooks from '../hooks';

export const ${componentClassName} = memo(({ 
  children 
}: Model.I${componentClassName}Props) => {
  const { } = Hooks.${hookName}();

  return (
    <Styles.Container>
      <h2>${componentClassName} Component</h2>
      {children}
    </Styles.Container>
  );
});`,
    },
    {
        path: path.join(basePath, 'ui', `${componentFileName}.styles.ts`),
        content: `import styled from 'styled-components';

export const Container = styled.div\`
  padding: 24px;
  width: 100%;
\`;
`,
    },
    {
        path: path.join(basePath, 'ui', 'index.ts'),
        content: `export * from './${componentFileName}.component';
`,
    },
    {
        path: path.join(basePath, 'index.ts'),
        content: `export * from './ui';
`,
    },
];

files.forEach((file) => {
    if (!fs.existsSync(file.path)) {
        fs.writeFileSync(file.path, file.content);
        console.log(`📄 Создан файл: ${file.path}`);
    } else {
        console.log(`⚠️ Файл уже существует: ${file.path}`);
    }
});

console.log('\n✅ Компонент успешно создан!');
console.log(`\nСтруктура компонента ${componentClassName}:`);
console.log(`src/features/${componentFileName}/`);
console.log(`├── hooks/`);
console.log(`│   └── ${hookFileName}/`);
console.log(`│       ├── ${hookFileName}.hook.ts`);
console.log(`│       ├── ${hookFileName}.types.ts`);
console.log(`│       └── index.ts`);
console.log(`│   └── index.ts`);
console.log(`├── model/`);
console.log(`│   ├── ${componentFileName}.model.ts`);
console.log(`│   └── index.ts`);
console.log(`├── ui/`);
console.log(`│   ├── ${componentFileName}.component.tsx`);
console.log(`│   ├── ${componentFileName}.styles.ts`);
console.log(`│   └── index.ts`);
console.log(`└── index.ts`);
