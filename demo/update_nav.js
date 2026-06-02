const fs = require('fs');
const path = require('path');

const demoDir = path.join('d:', 'afirica web', 'demo');

const newLinksList = `
      <li><a href="#" style="text-decoration:underline;text-underline-offset:4px;">Subscribe</a></li>
      <li><a href="#">The Book</a></li>
      <li><a href="#">Merch &#8964;</a></li>
      <li><a href="#">Cover Art &#8964;</a></li>
      <li><a href="#">About &#8964;</a></li>
`;

const newLinksDiv = `
    <a href="#" style="text-decoration:underline;text-underline-offset:4px;">Subscribe</a>
    <a href="#">The Book</a>
    <a href="#">Merch &#8964;</a>
    <a href="#">Cover Art &#8964;</a>
    <a href="#">About &#8964;</a>
`;

// Helper to replace content inside a tag
function replaceInside(html, startTag, endTag, replacement) {
  const startIndex = html.indexOf(startTag);
  if (startIndex === -1) return html;
  
  const innerStart = startIndex + startTag.length;
  const endIndex = html.indexOf(endTag, innerStart);
  if (endIndex === -1) return html;

  return html.substring(0, innerStart) + replacement + html.substring(endIndex);
}

const files = fs.readdirSync(demoDir).filter(f => f.startsWith('style') && f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(demoDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Standard <ul class="nav-links">
  content = replaceInside(content, '<ul class="nav-links">', '</ul>', newLinksList);
  
  // 2. Style 4 (Split nav) - we'll just put all in the first and empty the second, or put 2 in first, 3 in second
  if (file === 'style4.html') {
    const list1 = `
      <li><a href="#" style="text-decoration:underline;text-underline-offset:4px;">Subscribe</a></li>
      <li><a href="#">The Book</a></li>
      <li><a href="#">Merch &#8964;</a></li>
`;
    const list2 = `
      <li><a href="#">Cover Art &#8964;</a></li>
      <li><a href="#">About &#8964;</a></li>
`;
    // Find first nav-links-l and second nav-links-l
    let parts = content.split('<ul class="nav-links-l">');
    if (parts.length === 3) {
      let firstUlEnd = parts[1].indexOf('</ul>');
      let secondUlEnd = parts[2].indexOf('</ul>');
      
      parts[1] = list1 + parts[1].substring(firstUlEnd);
      parts[2] = list2 + parts[2].substring(secondUlEnd);
      
      content = parts.join('<ul class="nav-links-l">');
    }
  }

  // 3. Style 6 (<div class="nav-row2">)
  if (file === 'style6.html') {
    content = replaceInside(content, '<div class="nav-row2">', '</div>', newLinksDiv);
  }

  // 4. Style 8 (<ul class="hero-nav">)
  if (file === 'style8.html') {
    content = replaceInside(content, '<ul class="hero-nav">', '</ul>', newLinksList);
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`No changes made to ${file}`);
  }
});

console.log('Done!');
