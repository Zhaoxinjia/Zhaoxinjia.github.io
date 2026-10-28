// Dependency-free checks for the built site. Run after npm run build.
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..'), pub = path.join(root, 'public');
const base = 'https://zhaoxinjia.github.io';
const walk = dir => fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const htmlFiles = walk(pub).filter(p=>p.endsWith('.html'));
const attrs = s => Object.fromEntries([...s.matchAll(/([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)].map(m=>[m[1],m[2]??m[3]??m[4]??'']));
const ids = new Map(htmlFiles.map(p=>[p,new Set([...fs.readFileSync(p,'utf8').matchAll(/<[^>]+>/g)].map(m=>attrs(m[0]).id).filter(Boolean))]));
let count=0;
for(const p of htmlFiles) {
 const html=fs.readFileSync(p,'utf8'), relative='/'+path.relative(pub,p).split(path.sep).join('/');
 for(const match of html.matchAll(/<(a|link|img|script)\b[^>]*>/g)) {
  const a=attrs(match[0]), value=a.href||a.src;
  if(!value || /^(mailto:|tel:|data:|javascript:)/.test(value)) continue;
  const url=new URL(value.replaceAll('&amp;','&'),base+relative);
  if(url.origin!==base)continue;
  let target=path.join(pub,decodeURIComponent(url.pathname));
  if(fs.existsSync(target)&&fs.statSync(target).isDirectory()) target=path.join(target,'index.html');
  assert(fs.existsSync(target),relative+' -> missing '+value);
  if(url.hash && ids.has(target))assert(ids.get(target).has(decodeURIComponent(url.hash.slice(1))),relative+' -> missing anchor '+value);
  count++;
 }
}
for(const lang of ['en','zh'])for(const slug of ['', 'about','research','publications','contact']) {
 const route=(lang==='zh'?'/zh/':'/')+(slug?slug+'/':'');
 const p=path.join(pub,route,'index.html'), html=fs.readFileSync(p,'utf8');
 assert.equal((html.match(/<h1\b/g)||[]).length,1,route+' needs one h1');
 assert(html.includes('id=main-content')||html.includes('id="main-content"'));
 assert(new RegExp('<html[^>]*lang=["\']?'+lang).test(html),route+' language');
 const tags=[...html.matchAll(/<[^>]+>/g)].map(m=>({tag:m[0],a:attrs(m[0])}));
 assert(tags.some(t=>t.a.rel==='canonical'&&t.a.href===base+route),route+' canonical');
 assert(tags.some(t=>t.a.name==='description'&&t.a.content.length>10),route+' description');
 const target=(lang==='en'?'/zh/':'/')+(slug?slug+'/':'');
 assert(tags.some(t=>t.tag.startsWith('<a ')&&t.a.hreflang===(lang==='en'?'zh':'en')&&t.a.href===target),route+' corresponding translation');
 if(slug)assert(tags.some(t=>t.a['aria-current']==='page'&&t.a.href===route),route+' active nav');
 for(const t of tags.filter(t=>t.tag.startsWith('<img ')))assert('alt' in t.a,route+' image alt');
 if(slug==='publications')assert.equal((html.match(/id=["']?pub-\d+/g)||[]).length,25);
}
const pubs=JSON.parse(fs.readFileSync(path.join(root,'data/publications.json')));
assert.equal(new Set(pubs.map(p=>p.id)).size,pubs.length,'Duplicate publication IDs');
assert(pubs.every(p=>['published','preprint','under_review'].includes(p.status)));
const selections=JSON.parse(fs.readFileSync(path.join(root,'data/selected_publications.json')));
assert.equal(new Set(selections.confirmed_ids).size,selections.confirmed_ids.length);
for(const id of selections.confirmed_ids)assert(pubs.some(p=>p.id===id&&p.status==='published'),'Invalid selected publication');
for(const id of selections.pending_ids)assert(pubs.some(p=>p.id===id&&p.status==='published')&&!selections.confirmed_ids.includes(id),'Invalid pending publication');
console.log(JSON.stringify({htmlFiles:htmlFiles.length,internalReferences:count,bilingualCorePages:10,published:pubs.filter(p=>p.status==='published').length,underReview:pubs.filter(p=>p.status==='under_review').length,confirmedSelections:selections.confirmed_ids.length},null,2));
