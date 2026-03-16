const fs = require('fs');
const path = require('path');

const nodePtyRoot = path.join(__dirname, '..', 'node_modules', 'node-pty');
const helperPath = path.join(
  nodePtyRoot,
  'prebuilds',
  `${process.platform}-${process.arch}`,
  'spawn-helper'
);

if (!fs.existsSync(helperPath)) {
  console.log('node-pty spawn-helper not found for this platform, skipping');
  process.exit(0);
}

const stats = fs.statSync(helperPath);
if ((stats.mode & 0o111) === 0o111) {
  console.log('node-pty spawn-helper already executable');
  process.exit(0);
}

fs.chmodSync(helperPath, stats.mode | 0o111);
console.log(`Made node-pty spawn-helper executable: ${helperPath}`);
