const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

// Image optimization function using Sharp
async function optimizeImages() {
  console.log('Optimizing images with Sharp...');
  
  // Directory containing images
  const imageDir = path.join(__dirname, 'src', 'assets');
  
  // Get all PNG and JPG files
  try {
    const files = await fs.readdir(imageDir);
    const imageFiles = files.filter(file => 
      file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')
    );
    
    console.log(`Found ${imageFiles.length} images to optimize`);
    
    // Process each image
    for (const file of imageFiles) {
      const filePath = path.join(imageDir, file);
      const stats = await fs.stat(filePath);
      
      // Only optimize large images (>100KB)
      if (stats.size > 100 * 1024) {
        console.log(`Optimizing ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
        
        // Create optimized version
        const optimizedPath = filePath.replace(/\.(png|jpg|jpeg)$/, '-optimized.$1');
        
        // Optimize based on file type
        if (file.endsWith('.png')) {
          await sharp(filePath)
            .png({ quality: 80, compressionLevel: 9 })
            .toFile(optimizedPath);
        } else {
          await sharp(filePath)
            .jpeg({ quality: 80, progressive: true })
            .toFile(optimizedPath);
        }
        
        // Get optimized file size
        const optimizedStats = await fs.stat(optimizedPath);
        const savings = ((stats.size - optimizedStats.size) / stats.size * 100).toFixed(1);
        
        console.log(`  Optimized: ${file} -> ${(optimizedStats.size / 1024).toFixed(2)} KB (${savings}% smaller)`);
      }
    }
    
    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

// Run optimization
optimizeImages();