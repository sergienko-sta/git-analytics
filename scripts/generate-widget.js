#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentName = process.argv[2];

if (!componentName) {
    console.error('❌ Пожалуйста, укажите имя компонента');
    console.log('   Пример: npm run generate:widget tech-stack');
    process.exit(1);
}

const componentClassName = componentName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const componentFileName = componentName.toLowerCase();

const basePath = path.join(__dirname, '..', 'src', 'widgets', componentFileName);

const folders = [basePath, path.join(basePath, 'model'), path.join(basePath, 'ui')];

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
  className?: string;
}`,
    },
    {
        path: path.join(basePath, 'model', 'index.ts'),
        content: `export * from './${componentFileName}.model';
`,
    },
    {
        path: path.join(basePath, 'ui', `${componentFileName}.component.tsx`),
        content: `
import * as Model from '../model';
import * as Styles from './${componentFileName}.styles';

export const ${componentClassName} = ({ 
  className 
}: Model.I${componentClassName}Props) => {
  return (
    <Styles.Container className={className}>
      <h2>${componentClassName} Component</h2>
    </Styles.Container>
  );
};
`,
    },
    {
        path: path.join(basePath, 'ui', `${componentFileName}.styles.ts`),
        content: `import styled from 'styled-components';

export const Container = styled.div\`
  padding: 24px;
\`;
`,
    },
    {
        path: path.join(basePath, 'ui', 'index.ts'),
        content: `export * from './${componentFileName}.component';`,
    },
    {
        path: path.join(basePath, 'index.ts'),
        content: `export * from './ui';`,
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
console.log(`src/widgets/${componentFileName}/`);
console.log(`├── model/`);
console.log(`│   ├── ${componentFileName}.model.ts`);
console.log(`│   └── index.ts`);
console.log(`├── ui/`);
console.log(`│   ├── ${componentFileName}.component.tsx`);
console.log(`│   ├── ${componentFileName}.styles.ts`);
console.log(`│   └── index.ts`);
console.log(`└── index.ts`);
