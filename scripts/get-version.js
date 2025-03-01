const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  const tag = execSync('git describe --tags --abbrev=0').toString().trim();
  const version = tag.startsWith('v') ? tag.substring(1) : tag; // Remove 'v' if present

  const versionFilePath = path.join(__dirname, '../src/environments/version.ts');
  const versionFileContent = `export const version = '${version}';\n`;

  fs.writeFileSync(versionFilePath, versionFileContent);

  console.log(`Version ${version} written to src/environments/version.ts`);
} catch (error) {
  console.error('Error getting Git tag:', error.message);
  process.exit(1);
}
