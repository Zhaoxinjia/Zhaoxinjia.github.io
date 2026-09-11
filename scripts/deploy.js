// Build the site and push the static output to the gh-pages branch.
const { execFileSync, spawnSync } = require('child_process');
const path = require('path');

const root = path.join(__dirname, '..');
const hugo = path.join(root, 'tools', 'hugo.exe');
const pub = path.join(root, 'public');

const run = (cmd, args, cwd) => {
  const r = spawnSync(cmd, args, { stdio: 'inherit', cwd });
  if (r.status !== 0) process.exit(r.status || 1);
};

console.log('[deploy] building site...');
run(hugo, ['--gc', '--minify'], root);

console.log('[deploy] committing public/ ...');
const hasGit = (() => { try { execFileSync('git', ['rev-parse', '--git-dir'], { cwd: pub, stdio: 'ignore' }); return true; } catch { return false; } })();
if (!hasGit) run('git', ['init', '-b', 'gh-pages'], pub);
run('git', ['add', '-A'], pub);
run('git', ['-c', 'user.name=Xinjia Zhao', '-c', 'user.email=zhaoxinjia@dicp.ac.cn', 'commit', '-m', 'Deploy site'], pub);

console.log('[deploy] pushing gh-pages...');
run('git', ['push', 'origin', 'gh-pages:gh-pages', '--force'], pub);
console.log('[deploy] done → https://zhaoxinjia.github.io/');
