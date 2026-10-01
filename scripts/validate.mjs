import { access, readFile } from 'node:fs/promises';

const requiredFiles = ['site/index.html', 'site/styles.css', 'site/app.js', 'site/assets/brics-logo.png', 'site/assets/favicon.svg'];
await Promise.all(requiredFiles.map((file) => access(file)));

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const [classes, raids, rules] = await Promise.all([readJson('site/data/classes.json'), readJson('site/data/raids.json'), readJson('site/data/rules.json')]);
const unique = (items) => new Set(items.map((item) => item.slug)).size === items.length;

if (classes.length !== 9 || !unique(classes)) throw new Error('O catálogo precisa conter nove classes com slugs únicos.');
if (!raids.length || !unique(raids)) throw new Error('As raids precisam ter slugs únicos.');
if (rules.dkp.minimumBid <= 0 || rules.dkp.earnings.length < 4) throw new Error('A política DKP está incompleta.');

console.log('Conteúdo e arquivos estáticos validados.');
