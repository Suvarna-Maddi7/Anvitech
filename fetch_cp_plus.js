const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://www.cpplusworld.com/';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const regex = /src="([^"]+\.(?:jpg|png|jpeg|webp))"/gi;
    let match;
    const urls = new Set();
    while ((match = regex.exec(data)) !== null) {
      let imgUrl = match[1];
      if (imgUrl.startsWith('/')) {
        imgUrl = 'https://www.cpplusworld.com' + imgUrl;
      } else if (!imgUrl.startsWith('http')) {
        continue;
      }
      
      // Look for images that are likely products (avoiding icons, logos)
      if (imgUrl.includes('upload') || imgUrl.includes('product') || imgUrl.includes('camera') || imgUrl.includes('banner')) {
        if (!imgUrl.includes('logo') && !imgUrl.includes('icon') && !imgUrl.includes('svg')) {
          urls.add(imgUrl);
        }
      }
    }
    
    console.log("Found URLs:", Array.from(urls));
    const targetUrls = Array.from(urls).slice(0, 6);
    
    const names = ['pro_camera_real.jpg', 'lite_dome_real.jpg', 'bullet_cam_real.jpg', 'ptz_cam_real.jpg', 'mini_indoor_real.jpg', 'dual_lens_real.jpg'];
    
    targetUrls.forEach((imgUrl, i) => {
      if (!names[i]) return;
      const dest = path.join(__dirname, 'public', 'products', names[i]);
      const file = fs.createWriteStream(dest);
      const req = imgUrl.startsWith('https') ? https : require('http');
      req.get(imgUrl, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded ${names[i]}`);
        });
      }).on('error', (err) => {
        console.error(`Error downloading ${names[i]}:`, err.message);
      });
    });
  });
}).on('error', err => {
  console.error('Error fetching site:', err.message);
});
