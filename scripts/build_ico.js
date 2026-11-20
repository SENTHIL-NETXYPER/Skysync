import fs from 'fs';
import path from 'path';

function createIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  const dirSize = images.length * 16;
  let offset = 6 + dirSize;

  const entries = [];
  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(img.data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += img.data.length;
  }

  return Buffer.concat([header, ...entries, ...images.map(img => img.data)]);
}

const p48 = path.resolve('public', 'favicon-48x48.png');
const p32 = path.resolve('public', 'favicon-32x32.png');
const p16 = path.resolve('public', 'favicon-16x16.png');

const b48 = fs.readFileSync(p48);
const b32 = fs.readFileSync(p32);
const b16 = fs.readFileSync(p16);

const icoBuffer = createIco([
  { width: 48, height: 48, data: b48 },
  { width: 32, height: 32, data: b32 },
  { width: 16, height: 16, data: b16 }
]);

const outIco = path.resolve('public', 'favicon.ico');
fs.writeFileSync(outIco, icoBuffer);
console.log(`✓ Generated ${outIco} (${icoBuffer.length} bytes)`);

// Clean up temporary 32 and 16
if (fs.existsSync(p32)) fs.unlinkSync(p32);
if (fs.existsSync(p16)) fs.unlinkSync(p16);
