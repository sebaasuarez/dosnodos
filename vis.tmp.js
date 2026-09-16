const {chromium}=require('playwright-core');
const SC=process.argv[2];
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
 const ctx=await b.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:2});
 // El navegador no puede salir por el proxy (solo acepta CONNECT), pero Node
 // sí. Se interceptan las peticiones y se resuelven desde acá.
 await ctx.route('**/*', async (route) => {
   const url = route.request().url();
   if (!url.startsWith('https://dosnodos.com.co')) return route.abort();
   try {
     const r = await fetch(url, { headers: { 'user-agent': 'verificacion-dosnodos' } });
     const buf = Buffer.from(await r.arrayBuffer());
     route.fulfill({ status: r.status, body: buf,
       headers: { 'content-type': r.headers.get('content-type') || 'text/html' } });
   } catch { route.abort(); }
 });
 const p=await ctx.newPage();
 await p.goto('https://dosnodos.com.co/hostinger',{waitUntil:'networkidle',timeout:120000});
 await p.waitForTimeout(1500);
 console.log('  insignia visible:', await p.locator('img[alt*="socio de Hostinger"]').isVisible().catch(()=>false));
 await p.getByRole('radio',{name:'Implementar un VPS'}).click();
 await p.waitForTimeout(700);
 const a = p.locator('a:has-text("Ver precio actual en Hostinger")');
 console.log('  enlace tras elegir VPS:', await a.getAttribute('href'));
 console.log('  rel:', await a.getAttribute('rel'));
 await p.locator('a:has-text("Quiero que lo implementen")').click();
 await p.waitForTimeout(900);
 console.log('  necesidad preseleccionada:', await p.locator('select[name="necesidad"]').inputValue());
 await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(400);
 await p.screenshot({path:SC+'/hostinger-hero.png'});
 await p.locator('#que-necesito').scrollIntoViewIfNeeded(); await p.waitForTimeout(400);
 await p.screenshot({path:SC+'/hostinger-selector.png'});
 await b.close();
})();
