import fs from 'node:fs';import path from 'node:path';
const root=process.cwd();let errors=[];
const must=['index.html','css/style.css','js/app.js','data/products.js','.github/workflows/deploy.yml','robots.txt','sitemap.xml'];
for(const f of must)if(!fs.existsSync(path.join(root,f)))errors.push(`Missing: ${f}`);
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const m of html.matchAll(/(?:src|href)="([^"]+)"/g)){const u=m[1];if(!u.startsWith('http')&&!u.startsWith('#')&&!u.startsWith('mailto:')){const p=path.join(root,u);if(!fs.existsSync(p))errors.push(`Broken local reference: ${u}`)}}
const data=fs.readFileSync(path.join(root,'data/products.js'),'utf8');
for(const m of data.matchAll(/image:'([^']+)'/g)){const u=m[1];if(u){const p=path.join(root,u);if(!fs.existsSync(p))errors.push(`Missing product image: ${u}`)}}
const assets=[];function walk(d){for(const x of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,x.name);if(x.isDirectory())walk(p);else assets.push(p)}}walk(path.join(root,'assets'));
console.log(`SARV site check: ${assets.length} asset files`);if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log('PASS: required files and local references are present.');
