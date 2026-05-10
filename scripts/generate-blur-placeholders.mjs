import { readFileSync, writeFileSync } from 'fs';
import { getPlaiceholder } from 'plaiceholder';
import { join } from 'path';

const placeholderImagesPath = join(process.cwd(), 'src/lib/placeholder-images.json');
const data = JSON.parse(readFileSync(placeholderImagesPath, 'utf8'));

async function generateBlurPlaceholders() {
  const updatedImages = [];

  for (const image of data.placeholderImages) {
    try {
      const imagePath = join(process.cwd(), 'public', image.imageUrl);
      const file = readFileSync(imagePath);

      const { base64 } = await getPlaiceholder(file, { size: 10 });

      updatedImages.push({
        ...image,
        blurDataURL: base64
      });

      console.log(`✓ Generated blur for: ${image.id}`);
    } catch (error) {
      console.error(`✗ Failed for ${image.id}:`, error.message);
      updatedImages.push(image);
    }
  }

  writeFileSync(
    placeholderImagesPath,
    JSON.stringify({ placeholderImages: updatedImages }, null, 2)
  );

  console.log('\n✓ All blur placeholders generated!');
}

generateBlurPlaceholders();
