import sharp from 'sharp';

await sharp('public/images/logo-full.png')
  .webp({ quality: 90 })
  .toFile('public/images/logo-full.webp');

console.log('Logo converted to WebP');
