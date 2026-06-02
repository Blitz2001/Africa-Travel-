const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'style1.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update CSS variables to exact Brand Guidelines hexes
content = content.replace(
  /:root\{[^}]+\}/,
  ":root{--cr:#5b081e;--dg:#014a34;--mg:#00944f;--lg:#6dd16d;--cy:#16d0ff;--go-start:#fefaa4;--go-end:#c48618;--go:#c48618}"
);

// 2. Remove Playfair Display completely
content = content.replace(/font-family:'Playfair Display',serif;/g, "font-family:'Lato',sans-serif;font-weight:400;");

// 3. Ensure Oswald headers use the Brand Gradient
content = content.replace(/linear-gradient\(135deg,var\(--cm\),var\(--go\)\)/g, "linear-gradient(135deg,var(--go-start),var(--go-end))");
// Fix background gradients that used --cm
content = content.replace(/linear-gradient\(to bottom,var\(--cm\),var\(--go\)\)/g, "linear-gradient(to bottom,var(--go-start),var(--go-end))");
content = content.replace(/linear-gradient\(to right,var\(--cr\),var\(--go\),var\(--cm\)\)/g, "linear-gradient(to right,transparent,var(--go-start),var(--go-end),transparent)");

// 4. Update Button Hierarchy
const newBtns = `
/* --- BRAND BUTTON SYSTEM --- */
.btn-cr{background:linear-gradient(135deg,var(--go-start),var(--go-end));color:#5b081e;padding:15px 36px;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-family:'Lato',sans-serif;font-weight:900;text-decoration:none;display:inline-block;transition:.25s;border:none;cursor:pointer;}
.btn-cr:hover{background:var(--go-end);color:#fff;}

.btn-outline{background:transparent;border:2px solid var(--go-end);color:var(--go-start);padding:13px 36px;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-family:'Lato',sans-serif;font-weight:700;text-decoration:none;display:inline-block;transition:.25s;cursor:pointer;}
.btn-outline:hover{background:var(--go-end);color:#fff;}

.sub-btn{background:var(--go-start);color:var(--dg);padding:10px 24px;font-size:10px;letter-spacing:2px;text-transform:uppercase;font-family:'Lato',sans-serif;font-weight:700;cursor:pointer;text-decoration:none;transition:.2s;border:none;}
.sub-btn:hover{background:var(--go-end);color:#fff;}

.sbtn{background:var(--dg);color:#fff;padding:16px 40px;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-family:'Lato',sans-serif;font-weight:900;text-decoration:none;border:none;cursor:pointer;transition:.25s;display:inline-block;}
.sbtn:hover{background:var(--mg);color:#fff;}

.sbtn2{background:var(--go-end);color:#fff;padding:16px 40px;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-family:'Lato',sans-serif;font-weight:700;text-decoration:none;display:inline-block;transition:.25s;border:none;}
.sbtn2:hover{background:var(--go-start);color:var(--cr);}
`;

// Inject new buttons by replacing old ones.
// I'll just append it to the end of the style block and let it override the old ones to be safe
content = content.replace('</style>', newBtns + '\n</style>');

// 5. Add subtle gold dividers between sections
// The transition to .subscribe and .editorial currently has harsh cuts. Let's add top borders.
content = content.replace(/\.editorial\{background:#1a000a;padding:80px\}/, ".editorial{background:var(--cr);padding:80px;border-top:1px solid rgba(196,134,24,0.3);}");
content = content.replace(/\.subscribe\{background:var\(--dg\);/, ".subscribe{background:var(--dg);border-top:3px solid var(--go-end);");

// Write back
fs.writeFileSync(filePath, content, 'utf8');
console.log("Brand guidelines applied!");
