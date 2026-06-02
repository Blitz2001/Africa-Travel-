const fs = require('fs');
const path = require('path');

const stylesToUpdate = ['style1.html', 'style2.html', 'style5.html', 'style6.html', 'style13.html'];

const cssToInject = `
/* --- STRUCTURAL ADDITIONS --- */
. structural-section { padding: 80px 40px; }
.structural-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; max-width: 1200px; margin: 0 auto; align-items: center; }
.archive-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; max-width: 1200px; margin: 40px auto 0; }
.archive-item { border: 1px solid rgba(255,255,255,0.1); padding: 20px; text-align: center; background: rgba(0,0,0,0.2); transition: 0.3s; }
.archive-item:hover { transform: translateY(-5px); border-color: var(--go); }
.archive-img { width: 100%; aspect-ratio: 3/4; object-fit: cover; margin-bottom: 15px; }

.newsletter-box { max-width: 600px; margin: 0 auto; text-align: center; padding: 60px 40px; background: rgba(0,0,0,0.4); border: 1px solid rgba(196,134,24,0.3); }
.newsletter-form { display: flex; gap: 10px; margin-top: 20px; justify-content: center; }
.newsletter-form input { padding: 15px 20px; flex: 1; max-width: 300px; background: transparent; border: 1px solid rgba(255,255,255,0.3); color: #fff; font-family: 'Lato', sans-serif; }
.newsletter-form button { padding: 15px 30px; background: var(--go); color: #000; border: none; font-family: 'Oswald', sans-serif; text-transform: uppercase; letter-spacing: 2px; cursor: pointer; font-weight: bold; transition: 0.3s; }
.newsletter-form button:hover { background: #fff; }

.sec-title { font-family: 'Oswald', sans-serif; font-size: 36px; text-transform: uppercase; margin-bottom: 20px; letter-spacing: 1px; color: var(--go); }
.sec-text { font-family: 'Playfair Display', serif; font-style: italic; font-size: 18px; line-height: 1.8; margin-bottom: 20px; color: rgba(255,255,255,0.8); }
`;

const htmlToInject = `
<!-- CURRENT ISSUE & EDITOR NOTE -->
<section class="structural-section" style="background: var(--dg); border-top: 1px solid rgba(255,255,255,0.1);">
  <div class="structural-grid">
    <div>
      <h2 class="sec-title">Current Issue Showcase</h2>
      <p style="font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--go); margin-bottom: 10px;">Issue 1112 (June-August)</p>
      <p class="sec-text">A Guide to Visual Consistency and Credibility. Our newest issue dives deep into the visual language of the continent, exploring how consistency in design and storytelling builds unshakeable credibility.</p>
      <a href="#" class="cta">Get The Issue <span class="cta-arrow">→</span></a>
    </div>
    <div>
      <img src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80" alt="Current Issue" style="width: 100%; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
    </div>
  </div>
</section>

<!-- EDITOR'S NOTE -->
<section class="structural-section" style="background: var(--cr);">
  <div class="structural-grid" style="grid-template-columns: 1fr 2fr;">
    <div>
      <h2 class="sec-title" style="color: #fff;">Editor's Note</h2>
    </div>
    <div>
      <p class="sec-text" style="color: var(--cm);">"In a busy world, we owe it to ourselves to seek moments of peace and quiet. Not only does it exude space and solitude, but its natural rhythm slows you down and reconnects you with the restorative power of nature. Welcome to our Media Kit Draft 01 journey."</p>
      <p style="font-family: 'Oswald', sans-serif; text-transform: uppercase; letter-spacing: 2px;">— Editor in Chief</p>
    </div>
  </div>
</section>

<!-- THE ARCHIVE -->
<section class="structural-section" style="background: var(--bg);">
  <div style="text-align: center; max-width: 800px; margin: 0 auto;">
    <h2 class="sec-title">The Archive</h2>
    <p class="sec-text">A wealth of information in our archive. Explore all available past issues here.</p>
  </div>
  <div class="archive-grid">
    <div class="archive-item">
      <img src="https://images.unsplash.com/photo-1509059852496-f3822ae057bf?w=400&q=80" class="archive-img">
      <h3 style="font-family: 'Oswald', sans-serif;">Issue 1111</h3>
      <p style="font-size: 12px; color: #888;">March</p>
    </div>
    <div class="archive-item">
      <img src="https://images.unsplash.com/photo-1523428096881-5bd79d043006?w=400&q=80" class="archive-img">
      <h3 style="font-family: 'Oswald', sans-serif;">Issue 1110</h3>
      <p style="font-size: 12px; color: #888;">November</p>
    </div>
    <div class="archive-item">
      <img src="https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=400&q=80" class="archive-img">
      <h3 style="font-family: 'Oswald', sans-serif;">Issue 109</h3>
      <p style="font-size: 12px; color: #888;">August</p>
    </div>
    <div class="archive-item">
      <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80" class="archive-img">
      <h3 style="font-family: 'Oswald', sans-serif;">Issue 108</h3>
      <p style="font-size: 12px; color: #888;">May</p>
    </div>
  </div>
</section>

<!-- NEWSLETTER -->
<section class="structural-section" style="background: url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1600&q=80') center/cover; position: relative;">
  <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.8);"></div>
  <div style="position: relative; z-index: 2;">
    <div class="newsletter-box">
      <h2 class="sec-title" style="color: #fff;">Join The Newsletter</h2>
      <p class="sec-text" style="font-size: 14px;">Sign up to receive additional content, news and travel tips by email. Your address will be used only for this purpose.</p>
      <form class="newsletter-form">
        <input type="email" placeholder="Your Email Address">
        <button type="button">Subscribe</button>
      </form>
    </div>
  </div>
</section>

`;

stylesToUpdate.forEach(file => {
  const filePath = path.join('d:', 'afirica web', 'demo', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Inject CSS if not already there
    if (!content.includes('structural-section')) {
      content = content.replace('</style>', cssToInject + '\n</style>');
    }
    
    // Inject HTML just before <footer>
    if (!content.includes('<!-- CURRENT ISSUE & EDITOR NOTE -->')) {
      content = content.replace('<footer', htmlToInject + '\n<footer');
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', file);
  } else {
    console.log('Not found:', file);
  }
});
