const fs = require('fs');
const files = [
  'A Guide to Visual Consistency and Credibility.pdf',
  'Proposal.pdf',
  'Media kit Draft 01.pdf'
];

files.forEach(function(f) {
  try {
    const buf = fs.readFileSync(f);
    const text = buf.toString('latin1').replace(/[^\x20-\x7E\n\r\t]/g, ' ').replace(/\s+/g, ' ');
    const matches = text.match(/[A-Za-z][A-Za-z\s,.\-!?:&]{20,}/g);
    console.log('=== ' + f + ' ===');
    if (matches) {
      matches.slice(0, 80).forEach(function(m) { console.log(m.trim()); });
    }
    console.log('');
  } catch(e) {
    console.log('Error: ' + e.message);
  }
});
