const fs = require('fs');
const path = require('path');

const demoDir = path.join('d:', 'afirica web', 'demo');

const files = fs.readdirSync(demoDir).filter(f => f.startsWith('style') && f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(demoDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace the HTML entity for the chevron
  const newContent = content.replace(/ &#8964;/g, '');

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log('Done!');
