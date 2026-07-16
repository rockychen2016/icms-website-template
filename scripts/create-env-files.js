import { existsSync, copyFileSync, unlinkSync } from 'fs';
import { join } from 'path';

const envFiles = ['.env.development', '.env.local', '.env.production'];

envFiles.forEach(file => {
  const filePath = join(process.cwd(), file);
  console.log('start copy file >>>', filePath)
  if (!existsSync(filePath)) {
    const envFile = join(__dirname, '..', `${file}.example`);
    copyFileSync(envFile, filePath);
    // 删除 .example 文件
    unlinkSync(envFile);
    console.log('deleted example file >>>', envFile);
  }
});