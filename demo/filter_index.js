const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Update text
html = html.replace('Twelve Concepts', 'Selected Concepts');
html = html.replace('Twelve distinct visual directions', 'The four selected visual directions');
html = html.replace('Choose Your Direction', 'Selected Designs');
html = html.replace('Every style uses the exact same brand palette and typography.', 'These four styles have been selected as the main directions to proceed with.');

// Remove headers
html = html.replace('<div class="phase-header"><span>Phase 1 Styles</span></div>', '');
html = html.replace('<div class="phase-header"><span>Phase 2 Styles</span></div>', '');

// We need to keep only styles 1, 2, 5, 6.
// The easiest way is to use a quick regex to extract all cards.
const cards = [];
const regex = /<a href="style(\d+)\.html" class="card">[\s\S]*?<\/a>/g;
let match;
while ((match = regex.exec(html)) !== null) {
  cards.push({ id: match[1], html: match[0] });
}

// Find the entire grid block
const gridStart = html.indexOf('<div class="grid">');
const footerStart = html.indexOf('<footer class="site-footer">');

if (gridStart > -1 && footerStart > -1) {
  const selectedCards = cards.filter(c => ['1', '2', '5', '6'].includes(c.id)).map(c => c.html).join('\n\n');
  const newGrid = `<div class="grid">\n${selectedCards}\n</div>\n\n`;
  html = html.substring(0, gridStart) + newGrid + html.substring(footerStart);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Done!');
