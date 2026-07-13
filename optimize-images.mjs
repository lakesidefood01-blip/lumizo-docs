import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const publicDir = 'public/images';

async function optimizeImages() {
  const files = await readdir(publicDir);
  
  for (const file of files) {
    if (!file.endsWith('.png')) continue;
    
    const inputPath = join(publicDir, file);
    const outputPath = join(publicDir, file.replace('.png', '.webp'));
    
    try {
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      console.log(`Optimized: ${file} -> ${file.replace('.png', '.webp')}`);
    } catch (error) {
      console.error(`Error optimizing ${file}:`, error);
    }
  }
}

optimizeImages();
