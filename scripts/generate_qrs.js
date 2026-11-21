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
  },
  {
    "employee_id": "SKY021",
    "name": "Ajay S",
    "email": "ajaysakthi48@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-07",
    "cert_code": "AJ28-S5PT"
  },
  {
    "employee_id": "SKY022",
    "name": "Dhanush P",
    "email": "dhanush2018.palanisamy@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-08",
    "cert_code": "DP74-H8NW"
  },
  {
    "employee_id": "SKY023",
    "name": "Ajith S",
    "email": "ajiths221005@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-09",
    "cert_code": "AS23-K7PJ"
  },
  {
    "employee_id": "SKY024",
    "name": "Saranya Thirunavukarasu",
    "email": "thiru55saranya@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-10",
    "cert_code": "ST82-M4QP"
  },
  {
    "employee_id": "SKY025",
    "name": "Sarathi R",
    "email": "sarathi1311k@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-11",
    "cert_code": "SR39-N7VK"
  },
  {
    "employee_id": "SKY026",
    "name": "Dinesh M",
    "email": "dinesshhmahendran@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-12",
    "cert_code": "DM64-P2XT"
  },
  {
    "employee_id": "SKY027",
    "name": "Karthick D",
    "email": "karthickdk178@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-13",
    "cert_code": "KD51-T8LR"
  },
  {
    "employee_id": "SKY028",
    "name": "Devadharshini K",
    "email": "devadharshinikannan23@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-14",
    "cert_code": "DK93-W5MN"
  },
  {
    "employee_id": "SKY029",
    "name": "Elamathi M",
    "email": "elamathimanikkam09@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-15",
    "cert_code": "EM76-R9BZ"
  },
  {
    "employee_id": "SKY030",
    "name": "Dhanusha K",
    "email": "dhanushakannan0211@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-16",
    "cert_code": "DH48-K3TG"
  },
  {
    "employee_id": "SKY031",
    "name": "Pannerselvam N",
    "email": "nallathambipanner@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-17",
    "cert_code": "PN27-Y6CV"
  },
  {
    "employee_id": "SKY032",
    "name": "Deepika S",
    "email": "deepikasathish2006@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-18",
    "cert_code": "DS85-Q4HJ"
  },
  {
    "employee_id": "SKY033",
    "name": "Sivish K",
    "email": "sivish45@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-19",
    "cert_code": "SK31-B8ND"
  },
  {
    "employee_id": "SKY034",
    "name": "Harshini K",
    "email": "harshinikamalnathan@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-20",
    "cert_code": "HK62-L7VP"
  },
  {
    "employee_id": "SKY035",
    "name": "Sinduja D",
    "email": "sindusibi26@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-21",
    "cert_code": "SD94-X2KW"
  },
  {
    "employee_id": "SKY036",
    "name": "SuryaPraba P",
    "email": "suryapraba1411@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-22",
    "cert_code": "SP53-M9TR"
  },
  {
    "employee_id": "SKY037",
    "name": "Harini Rajavel",
    "email": "rharinicse@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-23",
    "cert_code": "HR78-P4LG"
  },
  {
    "employee_id": "SKY038",
    "name": "Pushpa K",
    "email": "kp939445@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-24",
    "cert_code": "PK26-C8VZ"
  },
  {
    "employee_id": "SKY039",
    "name": "Gokul Padma Kumaar P S",
    "email": "psgokulpadmakumaar@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-25",
    "cert_code": "GP81-T3NQ"
  },
  {
    "employee_id": "SKY040",
    "name": "Poovizhi Rajasekar",
    "email": "poovizhirajasekar10@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-26",
    "cert_code": "PR49-W7MB"
  },
  {
    "employee_id": "SKY041",
    "name": "Kabilan B",
    "email": "kabilankabi0505@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-27",
    "cert_code": "KB63-R2HY"
  },
  {
    "employee_id": "SKY042",
    "name": "Priyadharshini Senthil",
    "email": "s.priyadharshinicse118@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-28",
    "cert_code": "PS95-Y8KL"
  },
  {
    "employee_id": "SKY043",
    "name": "Shanmugam K",
    "email": "shanmugam.k8143@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-29",
    "cert_code": "SM38-N4XP"
  },
  {
    "employee_id": "SKY044",
    "name": "Karan D",
    "email": "karandhandabani05@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-30",
    "cert_code": "KD72-B6VT"
  },
  {
    "employee_id": "SKY045",
    "name": "Vishnu S",
    "email": "vishnusoundarrajan367@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2026-12-31",
    "cert_code": "VS44-M9LR"
  },
  {
    "employee_id": "SKY046",
    "name": "Kishore K",
    "email": "kishoredhoni500@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2027-01-01",
    "cert_code": "KK87-P5NW"
  },
  {
    "employee_id": "SKY047",
    "name": "Kowsalya S",
    "email": "kowsalyasathya2006@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2027-01-02",
    "cert_code": "KS29-T7QG"
  },
  {
    "employee_id": "SKY048",
    "name": "Giri B",
    "email": "www.giri7010297900@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2027-01-03",
    "cert_code": "GB65-X3BZ"
  },
  {
    "employee_id": "SKY049",
    "name": "Oviya P",
    "email": "mpoviya2005@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2027-01-04",
    "cert_code": "OP91-K8VJ"
  },
  {
    "employee_id": "SKY050",
    "name": "Bala Harish",
    "email": "balaharish1752006@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2027-01-05",
    "cert_code": "BH37-W2CP"
  },
  {
    "employee_id": "SKY051",
    "name": "Monisha R",
    "email": "monisha38338@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2027-01-06",
    "cert_code": "MR58-R9TD"
  },
  {
    "employee_id": "SKY052",
    "name": "Bhavaneshwaran Jothikannan",
    "email": "bhavanjoe@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2027-01-07",
    "cert_code": "BJ84-L4MK"
  },
  {
    "employee_id": "SKY053",
    "name": "Janarthanababu D",
    "email": "janarthanababu690@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2027-01-08",
    "cert_code": "JB23-Y7XN"
  },
  {
    "employee_id": "SKY054",
    "name": "Sarathi M",
    "email": "sarathy072005@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2027-01-09",
    "cert_code": "SM79-C3PQ"
  },
  {
    "employee_id": "SKY055",
    "name": "Poojashree V",
    "email": "poojashree.v886@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2027-01-10",
    "cert_code": "PV46-N8TR"
  },
  {
    "employee_id": "SKY056",
    "name": "Santhosh Ramesh",
    "email": "santhoshrgstn29@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2027-01-11",
    "cert_code": "SR92-T5VB"
  },
  {
    "employee_id": "SKY057",
    "name": "Sivasakthivel P",
    "email": "sivasakthivelpalanisamy11@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2027-01-12",
    "cert_code": "SP35-W6KG"
  },
  {
    "employee_id": "SKY058",
    "name": "Shalini Muruganatham",
    "email": "shallu022006@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2027-01-13",
    "cert_code": "SM68-P9LY"
  },
  {
    "employee_id": "SKY059",
    "name": "Srikar Puyal",
    "email": "srikarsri5566@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2027-01-14",
    "cert_code": "SP83-R4MV"
  },
  {
    "employee_id": "SKY060",
    "name": "Sanjay R",
    "email": "r.sanjay832006@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2027-01-15",
    "cert_code": "SR52-K7WZ"
  },
  {
    "employee_id": "SKY061",
    "name": "Akshaya Shree R",
    "email": "rsakshaya05@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2027-01-16",
    "cert_code": "AR74-B3ND"
  },
  {
    "employee_id": "SKY062",
    "name": "Yokesh P",
    "email": "yokesh200531@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2027-01-17",
    "cert_code": "YP39-X8TQ"
  },
  {
    "employee_id": "SKY063",
    "name": "Myvilidevi P",
    "email": "myvilidevipalanivel@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2027-01-18",
    "cert_code": "MP86-L2CP"
  },
  {
    "employee_id": "SKY064",
    "name": "Poovarasan R",
    "email": "poovarasanff92@gmail.com",
    "role": "Cloud Engineer",
    "start_date": "2023-01-03",
    "end_date": "2026-01-22",
    "issue_date": "2027-01-19",
    "cert_code": "PR61-M7VJ"
  },
  {
    "employee_id": "SKY003",
    "name": "Thatha Rohith",
    "email": "thatharohith062@gmail.com",
    "role": "Cloud Data Engineer Intern",
    "start_date": "2025-07-03",
    "end_date": "2026-01-03",
    "issue_date": "2026-01-11",
    "cert_code": "TR03-INT1",
    "is_intern": true
  }
];

const QR_DIR = path.resolve('public/verify/qrcodes');
if (!fs.existsSync(QR_DIR)) {
  fs.mkdirSync(QR_DIR, { recursive: true });
}

async function generateAll() {
  console.log(`Generating QR codes for ${employees.length} records...`);
  
  for (const emp of employees) {
    const url = emp.is_intern 
      ? `https://skysynclab.com/verify/${emp.cert_code}/`
      : `https://skysynclab.com/verify/${emp.cert_code}/`;

    const cleanName = emp.name.replace(/\s+/g, '_').replace(/\./g, '_');
    const suffix = emp.is_intern ? `Internship_${emp.cert_code}` : emp.cert_code;
    const baseFilename = `${emp.employee_id}_${cleanName}_${suffix}`;
    
    // Target paths
    const galleryPngPath = path.join(QR_DIR, `${baseFilename}.png`);
    const gallerySvgPath = path.join(QR_DIR, `${baseFilename}.svg`);
    
    const pageDir = path.resolve(`public/verify/${emp.cert_code}`);
    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }
    const pagePngPath = path.join(pageDir, 'qr.png');
    const pageSvgPath = path.join(pageDir, 'qr.svg');

    // 1. Generate PNG (1000x1000 High-Res)
    await QRCode.toFile(galleryPngPath, url, {
      width: 1000,
      margin: 2,
      color: {
        dark: '#0f2746',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'H'
    });
    fs.copyFileSync(galleryPngPath, pagePngPath);

    // 2. Generate SVG
    const svgStr = await QRCode.toString(url, {
      type: 'svg',
      margin: 2,
      color: {
        dark: '#0f2746',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'H'
    });
    fs.writeFileSync(gallerySvgPath, svgStr, 'utf-8');
    fs.writeFileSync(pageSvgPath, svgStr, 'utf-8');
    
    console.log(`✓ [${emp.employee_id}] ${emp.name} -> ${emp.cert_code}`);
  }
  
  console.log(`Successfully generated all ${employees.length} QR codes!`);
}

generateAll().catch(err => {
  console.error(err);
  process.exit(1);
});
