// Optional local visual QA: requires Playwright in the environment, not a site dependency.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'), pub=path.join(root,'public'), out=path.join(root,'qa');
fs.mkdirSync(out,{recursive:true});
const server=http.createServer((req,res)=>{
 let p=path.join(pub,decodeURIComponent(new URL(req.url,'http://localhost').pathname));
 if(fs.existsSync(p)&&fs.statSync(p).isDirectory())p=path.join(p,'index.html');
 if(!fs.existsSync(p)){res.writeHead(404);res.end();return;}
 const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};
 res.setHeader('Content-Type',mime[path.extname(p)]||'application/octet-stream');fs.createReadStream(p).pipe(res);
});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 let browser;
 try{
  browser=await chromium.launch({headless:true, channel:process.env.PLAYWRIGHT_CHANNEL || "msedge"});
  const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  let checks=0;
  for(const width of [320,360,390,768,1024,1440])for(const lang of ['en','zh'])for(const slug of ['','about/','research/','publications/','contact/']){
   await page.setViewportSize({width,height:1000});
   await page.goto('http://127.0.0.1:'+server.address().port+'/'+(lang==='zh'?'zh/':'')+slug);
   await page.evaluate(()=>document.fonts.ready);
   const layout=await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth,nav:[...document.querySelectorAll('#menu a')].map(a=>({height:a.getBoundingClientRect().height,width:a.getBoundingClientRect().width})),bg:getComputedStyle(document.body).backgroundColor}));
   assert(layout.scroll<=layout.viewport,JSON.stringify({width,lang,slug,layout}));
   assert(layout.nav.every(a=>a.height>=44),'Nav targets too short');
   assert.equal(layout.bg,'rgb(12, 20, 34)');
   if(width<=600)assert(await page.locator('.header').evaluate(e=>e.getBoundingClientRect().height)<=110,'Header too tall');
   if(!slug&&(width===390||width===1440))await page.screenshot({path:path.join(out,lang+'-'+width+'.png'),fullPage:true});
   checks++;
  }
  await page.goto('http://127.0.0.1:'+server.address().port+'/');
  await page.keyboard.press('Tab');assert.equal(await page.locator(':focus').getAttribute('href'),'#main-content');
  await page.keyboard.press('Enter');assert.equal(await page.locator(':focus').getAttribute('id'),'main-content');
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.equal(await page.locator('.home-hero h1').evaluate(e=>getComputedStyle(e).animationName),'none');
  await page.locator('#theme-toggle').click();
assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
await page.reload();assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
for(const lang of ['','zh/'])for(const width of [360,1440]){
 await page.setViewportSize({width,height:1000});await page.goto('http://127.0.0.1:'+server.address().port+'/'+lang+'publications/');
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 assert.equal(await page.locator('section[aria-labelledby=published] .publication-entry').count(),24);
 assert.equal(await page.locator('#preprint').count(),0);
 await page.screenshot({path:path.join(out,'publications-'+(lang?'zh':'en')+'-'+width+'-light.png'),fullPage:true});
}
await page.goto('http://127.0.0.1:'+server.address().port+'/');
assert.equal(await page.locator('#selected .selected-paper').count(),6);
await page.context().setOffline(true);
  assert.equal(await page.locator('.research-card').count(),3);
  assert.deepEqual(errors,[]);
  console.log(JSON.stringify({responsivePages:checks,viewports:[320,360,390,768,1024,1440],keyboardSkip:'passed',reducedMotion:'passed',runtimeErrors:errors,screenshots:out},null,2));
 } finally {if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
