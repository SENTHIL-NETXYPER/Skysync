import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

const employees = [
  {
    "employee_id": "SKY-CEO",
    "name": "SENTHILKUMAR M",
    "email": "kumarsentil41075@gmail.com",
    "role": "Chief Executive Officer (CEO) & Founder",
    "start_date": "2023-01-03",
    "end_date": "Present (Active)",
    "issue_date": "2026-12-05",
    "cert_code": "SK01-CEO1"
  },
  {
    "employee_id": "SKY001",
    "name": "Jaganathan R",
    "email": "jaganathanram365@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-11-25",
    "cert_code": "HRH9-Q95C"
  },
  {
    "employee_id": "SKY002",
    "name": "Priya P",
    "email": "priyacse2556@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-11-20",
    "cert_code": "YS78-9HGM"
  },
  {
    "employee_id": "SKY003",
    "name": "Thatha Rohith",
    "email": "thatharohith062@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-11-24",
    "cert_code": "2VN4-R69D"
  },
  {
    "employee_id": "SKY004",
    "name": "Kousika B",
    "email": "kousika2610@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-11-21",
    "cert_code": "FTD8-A8GV"
  },
  {
    "employee_id": "SKY005",
    "name": "Poovarasi D.",
    "email": "poovarasid00@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-11-17",
    "cert_code": "P6UB-JKJL"
  },
  {
    "employee_id": "SKY006",
    "name": "Rubika D",
    "email": "rubikadeiveegam05@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-11-28",
    "cert_code": "ZX49-DPK2"
  },
  {
    "employee_id": "SKY007",
    "name": "Selvasuganthi Venkatesan",
    "email": "swathysuganthi17@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-11-26",
    "cert_code": "MDFC-BFDJ"
  },
  {
    "employee_id": "SKY008",
    "name": "Sandhiya B",
    "email": "sandhiyababu1524@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-11-27",
    "cert_code": "8TNA-VTQW"
  },
  {
    "employee_id": "SKY009",
    "name": "Priyadharshini R",
    "email": "priyarajkumar2502@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-11-19",
    "cert_code": "PP2Q-5MR5"
  },
  {
    "employee_id": "SKY010",
    "name": "Devendhiran S",
    "email": "devendhiran792006@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-11-22",
    "cert_code": "E967-LJTE"
  },
  {
    "employee_id": "SKY011",
    "name": "Manchala Kartheek",
    "email": "karthikmanchala2020@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-11-23",
    "cert_code": "4LTG-CRJN"
  },
  {
    "employee_id": "SKY012",
    "name": "Madhumitha P",
    "email": "madhu7010597@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-11-18",
    "cert_code": "Q4PG-YHYZ"
  },
  {
    "employee_id": "SKY013",
    "name": "Harishkanna P",
    "email": "harishkannap2004@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-11-29",
    "cert_code": "HK79-P2WX"
  },
  {
    "employee_id": "SKY014",
    "name": "Sachin P",
    "email": "sachinabi67@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-11-30",
    "cert_code": "SC84-P5LM"
  },
  {
    "employee_id": "SKY015",
    "name": "Sanjeev M",
    "email": "sanjuvmuthusamy@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-01",
    "cert_code": "SJ92-M6RT"
  },
  {
    "employee_id": "SKY016",
    "name": "Selva Muthu Meenakchi M",
    "email": "selvamuthumeenakchi@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-02",
    "cert_code": "SM73-M8BQ"
  },
  {
    "employee_id": "SKY017",
    "name": "Soundararajan",
    "email": "soundararajan916@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-03",
    "cert_code": "SR61-J4DF"
  },
  {
    "employee_id": "SKY018",
    "name": "Suryaa M",
    "email": "suryaacoc2@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-04",
    "cert_code": "SY55-M9KP"
  },
  {
    "employee_id": "SKY019",
    "name": "Poovarasan S",
    "email": "spoovarasan600@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-05",
    "cert_code": "PV88-S3TN"
  },
  {
    "employee_id": "SKY020",
    "name": "Santhoshini V J",
    "email": "santhoshinivj@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-06",
    "cert_code": "SV82-J5NR"
  }
];

const qrcodeDir = path.resolve('public', 'verify', 'qrcodes');
if (!fs.existsSync(qrcodeDir)) {
  fs.mkdirSync(qrcodeDir, { recursive: true });
}

async function run() {
  console.log(`Generating QR codes for ${employees.length} employees...`);

  for (const emp of employees) {
    const url = `https://skysynclab.com/verify/${emp.cert_code}/`;
    const safeName = emp.name.replace(/[^a-zA-Z0-9]/g, '_');
    const filenamePng = `${emp.employee_id}_${safeName}_${emp.cert_code}.png`;
    const filenameSvg = `${emp.employee_id}_${safeName}_${emp.cert_code}.svg`;

    const outPng = path.join(qrcodeDir, filenamePng);
    const outSvg = path.join(qrcodeDir, filenameSvg);

    // Save high-resolution PNG (width: 1000px, high quality margin)
    await QRCode.toFile(outPng, url, {
      width: 1000,
      margin: 2,
      color: {
        dark: '#2B1A14',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'H'
    });

    // Save vector SVG
    await QRCode.toFile(outSvg, url, {
      type: 'svg',
      margin: 2,
      color: {
        dark: '#2B1A14',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'H'
    });

    // Also place a copy inside public/verify/<cert_code>/qr.png
    const personDir = path.resolve('public', 'verify', emp.cert_code);
    if (fs.existsSync(personDir)) {
      fs.copyFileSync(outPng, path.join(personDir, 'qr.png'));
      fs.copyFileSync(outSvg, path.join(personDir, 'qr.svg'));
    }

    console.log(`✓ [${emp.employee_id}] ${emp.name} -> ${url}`);
  }

  console.log('\nAll QR codes generated successfully!');
}

run().catch(err => {
  console.error('Error generating QR codes:', err);
  process.exit(1);
});
