import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuration
const INPUT_DIR = path.join(__dirname, '../public/images')
const OUTPUT_DIR = path.join(__dirname, '../public/images/optimized')
const QUALITY = 80
const FORMATS = ['webp', 'jpg']

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']

async function ensureDir(dir) {
  try {
    await fs.access(dir)
  } catch {
    await fs.mkdir(dir, { recursive: true })
  }
}

async function getImageFiles(dir) {
  const files = []
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      
      if (entry.isDirectory()) {
        const subFiles = await getImageFiles(fullPath)
        files.push(...subFiles)
      } else if (IMAGE_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
        files.push(fullPath)
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message)
  }
  
  return files
}

async function optimizeImage(inputPath, outputDir) {
  try {
    const fileName = path.basename(inputPath, path.extname(inputPath))
    const relativePath = path.relative(INPUT_DIR, path.dirname(inputPath))
    const outputPath = path.join(outputDir, relativePath)
    
    await ensureDir(outputPath)
    
    const image = sharp(inputPath)
    const metadata = await image.metadata()
    
    console.log(`Processing: ${inputPath}`)
    console.log(`  Original size: ${metadata.width}x${metadata.height}`)
    
    // Generate multiple sizes for responsive images
    const sizes = [
      { suffix: '', width: metadata.width }, // Original size
      { suffix: '-lg', width: 1920 },
      { suffix: '-md', width: 1280 },
      { suffix: '-sm', width: 640 },
    ]
    
    for (const format of FORMATS) {
      for (const size of sizes) {
        if (size.width >= metadata.width && size.suffix !== '') continue
        
        const outputFile = path.join(outputPath, `${fileName}${size.suffix}.${format}`)
        
        await image
          .clone()
          .resize(size.width, null, {
            withoutEnlargement: true,
            fit: 'inside',
          })
          [format]({ quality: QUALITY })
          .toFile(outputFile)
        
        const stats = await fs.stat(outputFile)
        console.log(`  Generated: ${outputFile} (${(stats.size / 1024).toFixed(2)} KB)`)
      }
    }
    
    console.log(`✓ Optimized: ${fileName}`)
  } catch (error) {
    console.error(`✗ Error optimizing ${inputPath}:`, error.message)
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n')
  
  try {
    await ensureDir(OUTPUT_DIR)
    
    const imageFiles = await getImageFiles(INPUT_DIR)
    
    if (imageFiles.length === 0) {
      console.log('No images found to optimize.')
      return
    }
    
    console.log(`Found ${imageFiles.length} images to optimize\n`)
    
    for (const file of imageFiles) {
      await optimizeImage(file, OUTPUT_DIR)
    }
    
    console.log('\n✓ All images optimized successfully!')
    console.log(`\nOptimized images are in: ${OUTPUT_DIR}`)
  } catch (error) {
    console.error('Error during optimization:', error)
    process.exit(1)
  }
}

main()
