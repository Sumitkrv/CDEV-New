import os
from PIL import Image
import glob

def compress_images(input_dir, max_size_mb=1, quality=85):
    """
    Compress all images in a directory to be under max_size_mb while maintaining quality
    """
    # Get all jpg files
    image_files = glob.glob(os.path.join(input_dir, "*.jpg"))
    
    total_images = len(image_files)
    compressed_count = 0
    
    print(f"Found {total_images} images to process...")
    print(f"Target: Under {max_size_mb}MB per image, Quality: {quality}\n")
    
    for img_path in image_files:
        try:
            # Get original size
            original_size = os.path.getsize(img_path) / (1024 * 1024)  # Size in MB
            
            # If already under 1MB, skip
            if original_size < max_size_mb:
                print(f"✓ {os.path.basename(img_path)} - Already optimized ({original_size:.2f}MB)")
                continue
            
            # Open image
            img = Image.open(img_path)
            
            # Convert RGBA to RGB if necessary
            if img.mode in ('RGBA', 'LA', 'P'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            
            # Get original dimensions
            width, height = img.size
            
            # Try different quality settings to get under max_size_mb
            current_quality = quality
            temp_path = img_path + ".temp"
            
            while current_quality > 50:
                # Resize if image is very large (optimize dimensions)
                if width > 1920 or height > 1920:
                    # Maintain aspect ratio, max dimension 1920px
                    ratio = min(1920/width, 1920/height)
                    new_width = int(width * ratio)
                    new_height = int(height * ratio)
                    resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                else:
                    resized_img = img
                
                # Save with current quality
                resized_img.save(temp_path, 'JPEG', quality=current_quality, optimize=True)
                
                # Check size
                new_size = os.path.getsize(temp_path) / (1024 * 1024)
                
                if new_size < max_size_mb:
                    # Replace original file
                    os.replace(temp_path, img_path)
                    compressed_count += 1
                    print(f"✓ {os.path.basename(img_path)} - {original_size:.2f}MB → {new_size:.2f}MB (Quality: {current_quality})")
                    break
                else:
                    current_quality -= 5
            
            # Clean up temp file if it exists
            if os.path.exists(temp_path):
                os.remove(temp_path)
            
            img.close()
            
        except Exception as e:
            print(f"✗ Error processing {os.path.basename(img_path)}: {str(e)}")
    
    print(f"\n{'='*60}")
    print(f"Compression complete!")
    print(f"Compressed: {compressed_count}/{total_images} images")
    print(f"{'='*60}")

if __name__ == "__main__":
    # Set the images directory path
    images_dir = os.path.join(os.path.dirname(__file__), "images")
    
    if not os.path.exists(images_dir):
        print(f"Error: Images directory not found at {images_dir}")
    else:
        compress_images(images_dir, max_size_mb=1, quality=85)
