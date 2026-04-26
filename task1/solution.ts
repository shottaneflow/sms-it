import * as fs from 'fs';
import * as path from 'path';

const ROOT_DIRS: string[] = [
  './sample/dirA',
  './sample/dirB',
  './sample/dirC',
];

const N = 2; 

interface FolderInfo {
  folderPath: string;
  jsCount:    number;
}

function collectJsFolders(dirs: string[]): FolderInfo[] {
  const result: FolderInfo[] = [];

  function walk(dir: string): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    const subDirs = entries.filter(e => e.isDirectory());
    const files   = entries.filter(e => e.isFile());

    if (files.length > 0) {
      const jsCount = files.filter(f => path.extname(f.name) === '.js').length;
      if (jsCount > 0) {
        result.push({ folderPath: dir, jsCount });
      }
    } else {
      for (const sub of subDirs) {
        walk(path.join(dir, sub.name));
      }
    }
  }

  for (const dir of dirs) {
    walk(dir);
  }

  return result;
}

function splitIntoNGroups(folders: FolderInfo[], n: number): FolderInfo[][] {
  const groups: FolderInfo[][] = Array.from({ length: n }, () => []);
  const groupSums = new Array<number>(n).fill(0);

  const sorted = [...folders].sort((a, b) => b.jsCount - a.jsCount);

  for (const folder of sorted) {
    const minIndex = groupSums.indexOf(Math.min(...groupSums));
    groups[minIndex].push(folder);
    groupSums[minIndex] += folder.jsCount;
  }

  return groups;
}

function main(): void {
  const folders = collectJsFolders(ROOT_DIRS);

  console.log('=== Уровень 1 — пути к папкам с .js файлами ===');
  folders.forEach(f => console.log(' ', f.folderPath));

  console.log('\n=== Уровень 2 — пути + кол-во .js файлов ===');
  folders.forEach(f =>
    console.log(`  ${f.folderPath}  →  ${f.jsCount} .js файл(ов)`)
  );

  console.log(`\n=== Уровень 3 — разбивка на ${N} групп ===`);
  const groups = splitIntoNGroups(folders, N);
  groups.forEach((group, i) => {
    const total = group.reduce((sum, f) => sum + f.jsCount, 0);
    console.log(`\n  Группа ${i + 1} (итого .js: ${total}):`);
    group.forEach(f => console.log(`    ${f.folderPath} (${f.jsCount})`));
  });
}

main();