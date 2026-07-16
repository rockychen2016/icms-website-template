const { existsSync, unlinkSync, readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

// 删除 create-env-files.cjs 文件
const createEnvFilesPath = join(__dirname, 'create-env-files.cjs');
if (existsSync(createEnvFilesPath)) {
  unlinkSync(createEnvFilesPath);
  console.log('Removed scripts/create-env-files.cjs');
}

// 读取 package.json 文件
const packageJsonPath = join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

// 删除 postinstall 脚本
if (packageJson.scripts && packageJson.scripts.postinstall) {
  delete packageJson.scripts.postinstall;
  console.log('Removed postinstall script from package.json');
}

// 写回修改后的 package.json
writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
console.log('Cleanup completed successfully');

// 删除自身文件
if (existsSync(__filename)) {
  unlinkSync(__filename);
  console.log('Removed scripts/remove-postinstall.cjs');
}
