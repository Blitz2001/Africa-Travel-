const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

html = html.replace('The four selected visual directions', 'The five selected visual directions');
html = html.replace('These four styles', 'These five styles');

const newCard = `
  <a href="style13.html" class="card">
    <div class="preview p13" style="background:#070a08;border-bottom:4px solid #c48618">
      <div class="preview-logo">
        <span class="pl-africa" style="color:#fff;-webkit-text-fill-color:#fff">AFRICA</span>
        <span class="pl-sub" style="color:#c48618">3D Interactive</span>
      </div>
      <span class="preview-badge" style="background:#c48618;color:#000">13</span>
    </div>
    <div class="card-body">
      <p class="style-no">Style 13</p>
      <h2 class="style-name s13-name" style="color:#fff">3D Interactive</h2>
      <p class="style-desc">A highly animated design featuring GSAP scroll triggers and a fully functional 3D flipping magazine built with CSS transforms.</p>
      <div class="swatches">
        <div class="sw" style="background:#070a08"></div>
        <div class="sw" style="background:#5b081e"></div>
        <div class="sw" style="background:#014a34"></div>
        <div class="sw" style="background:#c48618"></div>
        <div class="sw" style="background:#fff"></div>
      </div>
      <span class="cta">View Style <span class="cta-arrow">→</span></span>
    </div>
  </a>
`;

html = html.replace('</div>\n\n<footer', newCard + '\n</div>\n\n<footer');
fs.writeFileSync('index.html', html, 'utf8');
console.log('Added style 13');
