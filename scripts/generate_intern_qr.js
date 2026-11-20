import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

const certCode = 'TR03-INT1';
const url = `https://skysynclab.com/verify/${certCode}/`;
const targetDir = path.resolve('public', 'verify', certCode);
const qrcodeDir = path.resolve('public', 'verify', 'qrcodes');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}
if (!fs.existsSync(qrcodeDir)) {
  fs.mkdirSync(qrcodeDir, { recursive: true });
}

const galleryPng = path.join(qrcodeDir, `SKY003_Thatha_Rohith_Internship_${certCode}.png`);
const gallerySvg = path.join(qrcodeDir, `SKY003_Thatha_Rohith_Internship_${certCode}.svg`);
const localPng = path.join(targetDir, 'qr.png');
const localSvg = path.join(targetDir, 'qr.svg');

async function main() {
  console.log(`Generating QR code for ${url}...`);

  // High-res PNG with transparent background
  await QRCode.toFile(galleryPng, url, {
    width: 1000,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#00000000'
    },
    errorCorrectionLevel: 'H'
  });

  // Vector SVG with transparent background
  await QRCode.toFile(gallerySvg, url, {
    type: 'svg',
    margin: 2,
    color: {
      dark: '#000000',
      light: '#00000000'
    },
    errorCorrectionLevel: 'H'
  });

  fs.copyFileSync(galleryPng, localPng);
  fs.copyFileSync(gallerySvg, localSvg);

  console.log('✓ Successfully generated QR codes in:');
  console.log(`  - ${galleryPng}`);
  console.log(`  - ${gallerySvg}`);
  console.log(`  - ${localPng}`);
  console.log(`  - ${localSvg}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

