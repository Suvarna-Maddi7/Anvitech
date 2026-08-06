const https = require('https');
const fs = require('fs');
const path = require('path');

const query = encodeURIComponent('CP PLUS CCTV camera');
const searchUrl = `https://html.duckduckgo.com/html/?q=${query}`;

https.get(searchUrl, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const urls = [];
    // DuckDuckGo image search in HTML sometimes has images, but web search has thumbnails
    const regex = /<img[^>]+src="([^">]+)"/g;
    let match;
    while ((match = regex.exec(data)) !== null) {
      if (match[1].startsWith('//')) {
        urls.push('https:' + match[1]);
      } else if (match[1].startsWith('http')) {
        urls.push(match[1]);
      }
    }

    // Filter out obvious non-product images (like duckduckgo logo)
    const validUrls = urls.filter(u => !u.includes('duckduckgo.com/assets'));
    
    console.log(`Found ${validUrls.length} image URLs.`);
    
    // We need 6 images
    const targetUrls = validUrls.slice(0, 6);
    const names = ['pro_camera_real.jpg', 'lite_dome_real.jpg', 'bullet_cam_real.jpg', 'ptz_cam_real.jpg', 'mini_indoor_real.jpg', 'dual_lens_real.jpg'];
    
    targetUrls.forEach((url, i) => {
      const dest = path.join(__dirname, 'public', 'products', names[i]);
      const file = fs.createWriteStream(dest);
      https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded ${names[i]}`);
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        console.error(`Error downloading ${names[i]}:`, err.message);
      });
    });
  });
}).on('error', err => {
  console.error('Error fetching search results:', err.message);
});
