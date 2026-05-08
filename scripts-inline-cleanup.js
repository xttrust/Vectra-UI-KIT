const fs = require('fs');
const path = require('path');

const root = process.cwd();
const htmlFiles = [];
const styleMap = new Map();
let styleIndex = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
      htmlFiles.push(full);
    }
  }
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function toPosix(p) {
  return p.split(path.sep).join('/');
}

function relHref(fromHtmlPath, targetAbsPath) {
  const rel = path.relative(path.dirname(fromHtmlPath), targetAbsPath);
  return toPosix(rel);
}

function hashStyle(style) {
  let h = 2166136261;
  for (let i = 0; i < style.length; i++) {
    h ^= style.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return (h >>> 0).toString(36);
}

function classForStyle(style) {
  const normalized = style.trim().replace(/\s*;\s*$/g, '').replace(/\s+/g, ' ');
  if (!styleMap.has(normalized)) {
    styleMap.set(normalized, `v-inl-${hashStyle(normalized)}-${++styleIndex}`);
  }
  return styleMap.get(normalized);
}

function rewriteTag(tag) {
  if (!tag.includes('style="')) return tag;
  if (tag.startsWith('</') || tag.startsWith('<!')) return tag;

  const styleMatch = tag.match(/\sstyle="([^"]*)"/);
  if (!styleMatch) return tag;

  const styleValue = styleMatch[1];
  if (styleValue.includes('${')) return tag;
  const cls = classForStyle(styleValue);

  let out = tag.replace(/\sstyle="[^"]*"/, '');

  if (/\sclass="[^"]*"/.test(out)) {
    out = out.replace(/\sclass="([^"]*)"/, (m, existing) => {
      const parts = existing.split(/\s+/).filter(Boolean);
      if (!parts.includes(cls)) parts.push(cls);
      return ` class="${parts.join(' ')}"`;
    });
  } else {
    out = out.replace(/\s*(\/?)>$/, ` class="${cls}" $1>`).replace(/\s{2,}/g, ' ');
  }

  return out;
}

function replaceInlineStylesInText(text) {
  return text.replace(/<[^>]+>/g, rewriteTag);
}

function sanitizeBaseName(absHtmlPath) {
  const rel = path.relative(root, absHtmlPath).replace(/\.[Hh][Tt][Mm][Ll]$/, '');
  return rel.replace(/[\\/]+/g, '-').replace(/[^a-zA-Z0-9\-_.]/g, '-');
}

walk(root);

for (const htmlPath of htmlFiles) {
  let content = fs.readFileSync(htmlPath, 'utf8');
  const base = sanitizeBaseName(htmlPath);

  // Extract inline <style> blocks
  let styleBlockIdx = 0;
  content = content.replace(/<style>([\s\S]*?)<\/style>/gi, (_m, cssCode) => {
    styleBlockIdx += 1;
    const outCss = path.join(root, 'assets', 'css', 'pages', `${base}-inline-${styleBlockIdx}.css`);
    ensureDir(outCss);
    fs.writeFileSync(outCss, cssCode.trim() + '\n', 'utf8');
    const href = relHref(htmlPath, outCss);
    return `<link rel="stylesheet" href="${href}" />`;
  });

  // Extract inline <script> blocks without src attribute
  let scriptBlockIdx = 0;
  content = content.replace(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi, (m, jsCode) => {
    if (!jsCode.trim()) return m;
    scriptBlockIdx += 1;
    const outJs = path.join(root, 'assets', 'js', 'pages', `${base}-inline-${scriptBlockIdx}.js`);
    ensureDir(outJs);
    fs.writeFileSync(outJs, jsCode.trim() + '\n', 'utf8');
    const src = relHref(htmlPath, outJs);
    return `<script src="${src}"></script>`;
  });

  // Replace inline style="..." attributes in HTML tags
  content = replaceInlineStylesInText(content);

  // Ensure generated CSS is linked once
  const genCssAbs = path.join(root, 'assets', 'css', 'generated-inline-cleanup.css');
  const genHref = relHref(htmlPath, genCssAbs);
  if (!content.includes(genHref)) {
    if (content.includes('</head>')) {
      content = content.replace('</head>', `  <link rel="stylesheet" href="${genHref}" />\n</head>`);
    }
  }

  fs.writeFileSync(htmlPath, content, 'utf8');
}

// Replace style attrs inside JS files too (e.g., template strings)
function walkJs(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkJs(full);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.js')) {
      let js = fs.readFileSync(full, 'utf8');
      const updated = replaceInlineStylesInText(js);
      if (updated !== js) fs.writeFileSync(full, updated, 'utf8');
    }
  }
}
walkJs(root);

// Write generated CSS classes
const generatedCss = path.join(root, 'assets', 'css', 'generated-inline-cleanup.css');
ensureDir(generatedCss);
const lines = ['/* Auto-generated: migrated inline style attributes */'];
for (const [style, cls] of styleMap.entries()) {
  lines.push(`.${cls} { ${style}; }`);
}
lines.push('');
fs.writeFileSync(generatedCss, lines.join('\n'), 'utf8');

console.log(`Processed ${htmlFiles.length} HTML files`);
console.log(`Generated ${styleMap.size} CSS utility classes`);
