// 一键部署：构建网站 → 推送 GitHub Pages（gh-pages 分支）→ 备份源码（main 分支）
// 用法：node scripts/deploy.js
const { execFileSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const hugo = path.join(root, 'tools', 'hugo.exe');
const pub = path.join(root, 'public');
const REMOTE = 'https://github.com/Zhaoxinjia/Zhaoxinjia.github.io.git';

const run = (cmd, args, cwd, allowFail = false) => {
  const r = spawnSync(cmd, args, { stdio: 'inherit', cwd });
  if (r.status !== 0 && !allowFail) process.exit(r.status || 1);
  return r.status === 0;
};

console.log('[1/4] 构建网站...');
run(hugo, ['--gc', '--minify'], root);

// 防止 Windows 把 LF 转成 CRLF（会破坏资源文件的哈希校验）
fs.writeFileSync(path.join(pub, '.gitattributes'), '* -text\n');

console.log('[2/4] 提交构建产物 (gh-pages 分支)...');
let hasGit = true;
try { execFileSync('git', ['rev-parse', '--git-dir'], { cwd: pub, stdio: 'ignore' }); }
catch { hasGit = false; }
if (!hasGit) {
  run('git', ['init', '-b', 'gh-pages'], pub);
} else {
  run('git', ['checkout', '-B', 'gh-pages'], pub, true);
}
run('git', ['remote', 'remove', 'origin'], pub, true);
run('git', ['remote', 'add', 'origin', REMOTE], pub, true);
run('git', ['add', '-A'], pub);
const committed = run('git', ['-c', 'user.name=Xinjia Zhao', '-c', 'user.email=zhaoxinjia@dicp.ac.cn', 'commit', '-m', 'Deploy site'], pub, true);

if (committed) {
  console.log('[3/4] 推送 gh-pages...');
  run('git', ['push', 'origin', 'gh-pages:gh-pages', '--force'], pub);
} else {
  console.log('[3/4] 构建产物没有变化，跳过推送。');
}

console.log('[4/4] 备份源码到 main 分支...');
try {
  execFileSync('git', ['rev-parse', '--git-dir'], { cwd: root, stdio: 'ignore' });
  run('git', ['add', '-A'], root);
  const srcCommitted = run('git', ['-c', 'user.name=Xinjia Zhao', '-c', 'user.email=zhaoxinjia@dicp.ac.cn', 'commit', '-m', 'Update site content'], root, true);
  if (srcCommitted) {
    run('git', ['push', 'origin', 'main'], root);
  } else {
    console.log('      源码没有变化，跳过推送。');
  }
} catch {
  console.log('      源码目录不是 git 仓库，跳过源码备份。');
}

console.log('完成 → https://zhaoxinjia.github.io/');
console.log('提示：首次推送时可能弹出 GitHub 登录授权窗口，按提示完成即可。');
