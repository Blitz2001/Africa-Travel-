const fs = require('fs');
const cheerio = require('cheerio');

const htmlPath = 'C:\\Users\\asbth\\.gemini\\antigravity-ide\\brain\\c22a0750-ce19-4a03-904d-ee06b400051f\\.system_generated\\steps\\302\\content.md';
const content = fs.readFileSync(htmlPath, 'utf8');

const $ = cheerio.load(content);

// Remove scripts, styles, etc.
$('script, style, noscript, svg, iframe, nav, footer, header').remove();

const results = [];

$('h1, h2, h3, h4, p').each((i, el) => {
  const text = $(el).text().trim();
  if (text.length > 20) {
    results.push(text);
  }
});

fs.writeFileSync('extracted_content.txt', results.join('\n\n'), 'utf8');
console.log('Extraction complete. Wrote to extracted_content.txt');
