import sharp from 'sharp';

await sharp('public/images/logo-icon.png')
  .webp({ quality: 90 })
  .toFile('public/images/logo-icon.webp');

console.log('Icon converted to WebP');
