const fs = require('fs');
const path = require('path');

const filePath = path.join('d:', 'afirica web', 'demo', 'style1.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Logos
// Nav logo
content = content.replace(
  '<span class="logo-africa" style="font-size:20px">AFRICA</span>',
  '<img src="../logos/Png-01.png" alt="Africa Travel and Life Logo" style="height: 32px; object-fit: contain;">'
);
content = content.replace(
  '<span class="logo-sub" style="font-size:10px">Travel and Life</span>',
  ''
);

// Footer logo
content = content.replace(
  '<span class="logo-africa" style="font-size:22px">AFRICA</span>',
  '<img src="../logos/Png-02.png" alt="Africa Travel and Life Logo" style="height: 40px; object-fit: contain; margin-bottom: 10px;">'
);
content = content.replace(
  '<span class="logo-sub" style="font-size:10px;display:block;margin-top:2px">Travel and Life</span>',
  ''
);

// 2. Hero Background
content = content.replace(
  'id="hero-img">',
  'id="hero-img" style="filter: brightness(0.85);">'
);
content = content.replace(
  'src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1600&q=80" alt="Africa" id="hero-img"',
  'src="../assets/final cover Jpeg export.jpg.jpeg" alt="Africa Rock Formation" id="hero-img"'
);

// 3. Current Issue Showcase
content = content.replace(
  'src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80" alt="Current Issue"',
  'src="../assets/1mockup.jpg.jpeg" alt="Current Issue"'
);

// 4. Spotlight Image (Freetown)
content = content.replace(
  'src="https://images.unsplash.com/photo-1523428096881-5bd79d043006?w=900&q=80" alt="Freetown" id="spot-img"',
  'src="../assets/2.jpg.jpeg" alt="Freetown Mockup" id="spot-img"'
);

// 5. Editorial Cards
// Big card
content = content.replace(
  'src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=80" alt=""',
  'src="../assets/Final Final.png" alt="Rainforest Cover"'
);
// Card 2 (Style Without Borders) -> Freetown Fashion
content = content.replace(
  'src="https://images.unsplash.com/photo-1509059852496-f3822ae057bf?w=600&q=80" alt=""',
  'src="../assets/1.jpg.jpeg" alt="Fashion in Freetown"'
);
// Card 3 (Beyond the Horizon) -> Rainforest shadow mockup
content = content.replace(
  'src="https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=600&q=80" alt=""',
  'src="../assets/413043769_11608779eha.jpg.jpeg" alt="Rainforest Mockup"'
);
// Card 4 (A Table in Marrakech) -> Food mockup
content = content.replace(
  'src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80" alt=""',
  'src="../assets/Magazine_Mockup_6.jpg.jpeg" alt="Food Spread"'
);
// Card 5 (Dawn Over Maasai Mara) -> Tribal art mockup
content = content.replace(
  'src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80" alt=""',
  'src="../assets/magazine-mockup.jpg.jpeg" alt="Tribal Art Spread"'
);

// 6. The Archive Cards
// Archive 1
content = content.replace(
  'src="https://images.unsplash.com/photo-1509059852496-f3822ae057bf?w=400&q=80" class="archive-img"',
  'src="../assets/Magazine_Mockup_4WRGV.jpg.jpeg" class="archive-img"'
);
// Archive 2
content = content.replace(
  'src="https://images.unsplash.com/photo-1523428096881-5bd79d043006?w=400&q=80" class="archive-img"',
  'src="../assets/final cover Jpeg export.jpg.jpeg" class="archive-img"'
);
// Archive 3
content = content.replace(
  'src="https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=400&q=80" class="archive-img"',
  'src="../assets/Final Final.png" class="archive-img"'
);
// Archive 4
content = content.replace(
  'src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80" class="archive-img"',
  'src="../assets/1.jpg.jpeg" class="archive-img"'
);

// 7. Newsletter Background
content = content.replace(
  'src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1600&q=80" id="news-img"',
  'src="../assets/413043769_11608779eha.jpg.jpeg" id="news-img"'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully injected real assets into style1.html');
