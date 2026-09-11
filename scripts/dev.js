// Dev server launcher: forwards CLI host/port arguments to Hugo.
const { spawn } = require('child_process');
const path = require('path');

const root = path.join(__dirname, '..');
const hugo = path.join(root, 'tools', 'hugo.exe');

let host = '0.0.0.0';
let port = '7100';

const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--host') host = argv[++i];
  else if (a.startsWith('--host=')) host = a.slice('--host='.length);
  else if (a === '--port') port = argv[++i];
  else if (a.startsWith('--port=')) port = a.slice('--port='.length);
}

const args = [
  'server',
  '--bind', host,
  '--port', port,
  '--disableFastRender',
  '--navigateToChanged',
];

console.log(`[dev] hugo server --bind ${host} --port ${port}`);
const child = spawn(hugo, args, { stdio: 'inherit', cwd: root });
child.on('exit', (code) => process.exit(code == null ? 1 : code));
process.on('SIGTERM', () => child.kill('SIGTERM'));
process.on('SIGINT', () => child.kill('SIGINT'));
