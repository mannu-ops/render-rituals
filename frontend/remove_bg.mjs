import sharp from 'sharp';
import fs from 'fs';

async function makeTransparent() {
  const inputPath = 'C:/Users/Mannu/.gemini/antigravity-ide/brain/38f0aee7-1020-4ffe-bc6d-9ffdae01772e/nikita_waving_white_bg_1788009090054.jpg';
  const outputPath = 'public/images/nikita-waving-cutout.png';

  const image = sharp(inputPath);
  const { data, info } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`Processing image ${width}x${height} with ${channels} channels`);

  // Flood fill or distance from pure white (255, 255, 255)
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Check how close the pixel is to white
    // If r, g, b are all high (> 245)
    const minVal = Math.min(r, g, b);
    const maxVal = Math.max(r, g, b);
    const colorDiff = maxVal - minVal;

    if (minVal > 240 && colorDiff < 15) {
      // It's white background
      data[i + 3] = 0; // completely transparent
    } else if (minVal > 220 && colorDiff < 20) {
      // Smooth edge antialiasing
      const alphaFactor = (245 - minVal) / 25;
      data[i + 3] = Math.max(0, Math.min(255, Math.round(alphaFactor * 255)));
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .png()
    .toFile(outputPath);

  console.log(`Successfully created transparent cutout at: ${outputPath}`);
}

makeTransparent().catch(console.error);
