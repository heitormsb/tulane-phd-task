import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function importTypeScriptModule(relativePath) {
  let source = await readFile(path.join(projectRoot, relativePath), 'utf8');
  source = source
    .replace(/^import type .*;\n/gm, '')
    .replace(/ satisfies SiteCopy;/g, ';');

  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const dataUrl = `data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`;
  return import(dataUrl);
}

function compareShape(reference, candidate, location = 'messages') {
  assert.equal(Array.isArray(candidate), Array.isArray(reference), `${location}: array shape differs`);

  if (Array.isArray(reference)) {
    assert.ok(Array.isArray(candidate), `${location}: expected an array`);
    const mayVaryInLength = location.includes('.keywords.');
    if (!mayVaryInLength) assert.equal(candidate.length, reference.length, `${location}: item count differs`);
    if (reference[0]) candidate.forEach((item, index) => compareShape(reference[0], item, `${location}[${index}]`));
    return;
  }

  if (reference && typeof reference === 'object') {
    assert.ok(candidate && typeof candidate === 'object', `${location}: expected an object`);
    assert.deepEqual(Object.keys(candidate).sort(), Object.keys(reference).sort(), `${location}: keys differ`);
    Object.keys(reference).forEach((key) => compareShape(reference[key], candidate[key], `${location}.${key}`));
    return;
  }

  assert.equal(typeof candidate, typeof reference, `${location}: value type differs`);
  if (typeof candidate === 'string') assert.ok(candidate.trim().length > 0, `${location}: translation is empty`);
}

const [{ default: ptBR }, { default: en }, localeConfig] = await Promise.all([
  importTypeScriptModule('app/i18n/messages/pt-BR.ts'),
  importTypeScriptModule('app/i18n/messages/en.ts'),
  importTypeScriptModule('app/i18n/config.ts'),
]);

compareShape(ptBR, en);
assert.equal(localeConfig.localeFromAcceptLanguage('pt-BR,pt;q=0.9,en;q=0.8'), 'pt-BR');
assert.equal(localeConfig.localeFromAcceptLanguage('pt-BR;q=0.4,en-US;q=0.9'), 'en');
assert.equal(localeConfig.localeFromAcceptLanguage('fr-FR,fr;q=0.9'), 'en');
assert.equal(localeConfig.localeFromPathname('/en'), 'en');
assert.equal(localeConfig.localeFromPathname('/en/missing'), 'en');
assert.equal(localeConfig.localeFromPathname('/'), 'pt-BR');
assert.equal(localeConfig.isLocale('es'), false);

console.log('i18n catalogs and locale resolution are valid');
