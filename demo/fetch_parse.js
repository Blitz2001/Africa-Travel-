const https = require('https');
const cheerio = require('cheerio');
const fs = require('fs');

https.get('https://travelafricamag.com/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const $ = cheerio.load(data);
    $('script, style, noscript, svg, iframe, nav, footer, header').remove();
    const results = [];
    $('h1, h2, h3, h4, h5, p, span').each((i, el) => {
      const text = $(el).text().replace(/\s+/g, ' ').trim();
      if (text.length > 20) {
        results.push(text);
      }
    });
    fs.writeFileSync('extracted_content.txt', Array.from(new Set(results)).join('\n\n'), 'utf8');
    console.log('Done downloading and parsing');
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
