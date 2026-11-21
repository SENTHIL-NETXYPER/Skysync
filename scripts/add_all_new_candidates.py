import os
import json
import re
import csv
import zipfile
import subprocess
import random
from datetime import datetime, timedelta
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

BASE_DIR = r"d:\THAT I CAN\senthil"
os.chdir(BASE_DIR)

# CEO Information
ceo_info = {
    "employee_id": "SKY-CEO",
    "name": "SENTHILKUMAR M",
    "email": "kumarsentil41075@gmail.com",
    "role": "Chief Executive Officer (CEO) & Founder",
    "start_date": "2023-01-03",
    "end_date": "Present (Active)",
    "issue_date": "2026-12-05",
    "cert_code": "SK01-CEO1"
}

# 22 Existing Engineers (SKY001 - SKY022)
existing_engineers = [
  {"employee_id": "SKY001", "name": "Jaganathan R", "email": "jaganathanram365@gmail.com", "role": "Cloud Engineer", "start_date": "2023-01-03", "end_date": "2026-01-22", "issue_date": "2026-11-25", "cert_code": "HRH9-Q95C"},
  {"employee_id": "SKY002", "name": "Priya P", "email": "priyacse2556@gmail.com", "role": "Cloud Engineer", "start_date": "2023-01-03", "end_date": "2026-01-22", "issue_date": "2026-11-20", "cert_code": "YS78-9HGM"},
  {"employee_id": "SKY003", "name": "Thatha Rohith", "email": "thatharohith062@gmail.com", "role": "Cloud Engineer", "start_date": "2023-01-03", "end_date": "2026-01-22", "issue_date": "2026-11-24", "cert_code": "2VN4-R69D"},
  {"employee_id": "SKY004", "name": "Kousika B", "email": "kousika2610@gmail.com", "role": "Cloud Engineer", "start_date": "2023-01-03", "end_date": "2026-01-22", "issue_date": "2026-11-21", "cert_code": "FTD8-A8GV"},
  {"employee_id": "SKY005", "name": "Poovarasi D.", "email": "poovarasid00@gmail.com", "role": "Cloud Engineer", "start_date": "2023-01-03", "end_date": "2026-01-22", "issue_date": "2026-11-17", "cert_code": "P6UB-JKJL"},
  {"employee_id": "SKY006", "name": "Rubika D", "email": "rubikadeiveegam05@gmail.com", "role": "Cloud Engineer", "start_date": "2023-01-03", "end_date": "2026-01-22", "issue_date": "2026-11-28", "cert_code": "ZX49-DPK2"},
  {"employee_id": "SKY007", "name": "Selvasuganthi Venkatesan", "email": "swathysuganthi17@gmail.com", "role": "Cloud Engineer", "start_date": "2023-01-03", "end_date": "2026-01-22", "issue_date": "2026-11-26", "cert_code": "MDFC-BFDJ"},
  {"employee_id": "SKY008", "name": "Sandhiya B", "email": "sandhiyababu1524@gmail.com", "role": "Cloud Engineer", "start_date": "2023-01-03", "end_date": "2026-01-22", "issue_date": "2026-11-27", "cert_code": "8TNA-VTQW"},
  {"employee_id": "SKY009", "name": "Priyadharshini R", "email": "priyarajkumar2502@gmail.com", "role": "Cloud Engineer", "start_date": "2023-01-03", "end_date": "2026-01-22", "issue_date": "2026-11-19", "cert_code": "PP2Q-5MR5"},
  {"employee_id": "SKY010", "name": "Devendhiran S", "email": "devendhiran792006@gmail.com", "role": "Cloud Engineer", "start_date": "2023-01-03", "end_date": "2026-01-22", "issue_date": "2026-11-22", "cert_code": "E967-LJTE"},
  {"employee_id": "SKY011", "name": "Manchala Kartheek", "email": "karthikmanchala2020@gmail.com", "role": "Cloud Engineer", "start_date": "2023-01-03", "end_date": "2026-01-22", "issue_date": "2026-11-23", "cert_code": "4LTG-CRJN"},
  {"employee_id": "SKY012", "name": "Madhumitha P", "email": "madhu7010597@gmail.com", "role": "Cloud Engineer", "start_date": "2023-01-03", "end_date": "2026-01-22", "issue_date": "2026-11-18", "cert_code": "Q4PG-YHYZ"},
  {"employee_id": "SKY013", "name": "Harishkanna P", "email": "harishkannap2004@gmail.com", "role": "Cloud Engineer", "start_date": "2023-01-03", "end_date": "2026-01-22", "issue_date": "2026-11-29", "cert_code": "HK79-P2WX"},
  {"employee_id": "SKY014", "name": "Sachin P", "email": "sachinabi67@gmail.com", "role": "Cloud Engineer", "start_date": "2023-01-03", "end_date": "2026-01-22", "issue_date": "2026-11-30", "cert_code": "SC84-P5LM"},
  {"employee_id": "SKY015", "name": "Sanjeev M", "email": "sanjuvmuthusamy@gmail.com", "role": "Cloud Engineer", "start_date": "2023-01-03", "end_date": "2026-01-22", "issue_date": "2026-12-01", "cert_code": "SJ92-M6RT"},
  {"employee_id": "SKY016", "name": "Selva Muthu Meenakchi M", "email": "selvamuthumeenakchi@gmail.com", "role": "Cloud Engineer", "start_date": "2023-01-03", "end_date": "2026-01-22", "issue_date": "2026-12-02", "cert_code": "SM73-M8BQ"},
  {"employee_id": "SKY017", "name": "Soundararajan", "email": "soundararajan916@gmail.com", "role": "Cloud Engineer", "start_date": "2023-01-03", "end_date": "2026-01-22", "issue_date": "2026-12-03", "cert_code": "SR61-J4DF"},
  {"employee_id": "SKY018", "name": "Suryaa M", "email": "suryaacoc2@gmail.com", "role": "Cloud Engineer", "start_date": "2023-01-03", "end_date": "2026-01-22", "issue_date": "2026-12-04", "cert_code": "SY55-M9KP"},
  {"employee_id": "SKY019", "name": "Poovarasan S", "email": "spoovarasan600@gmail.com", "role": "Cloud Engineer", "start_date": "2023-01-03", "end_date": "2026-01-22", "issue_date": "2026-12-05", "cert_code": "PV88-S3TN"},
  {"employee_id": "SKY020", "name": "Santhoshini V J", "email": "santhoshinivj@gmail.com", "role": "Cloud Engineer", "start_date": "2023-01-03", "end_date": "2026-01-22", "issue_date": "2026-12-06", "cert_code": "SV82-J5NR"},
  {"employee_id": "SKY021", "name": "Ajay S", "email": "ajaysakthi48@gmail.com", "role": "Cloud Engineer", "start_date": "2023-01-03", "end_date": "2026-01-22", "issue_date": "2026-12-07", "cert_code": "AJ28-S5PT"},
  {"employee_id": "SKY022", "name": "Dhanush P", "email": "dhanush2018.palanisamy@gmail.com", "role": "Cloud Engineer", "start_date": "2023-01-03", "end_date": "2026-01-22", "issue_date": "2026-12-08", "cert_code": "DP74-H8NW"}
]

# Thatha Rohith Internship Record
intern_record = {
    "employee_id": "SKY003",
    "name": "Thatha Rohith",
    "email": "thatharohith062@gmail.com",
    "role": "Cloud Data Engineer Intern",
    "start_date": "2025-07-03",
    "end_date": "2026-01-03",
    "issue_date": "2026-01-11",
    "cert_code": "TR03-INT1",
    "is_intern": True
}

# 42 New Additions (Ajith S + 41 Candidates from photos)
new_raw_list = [
    {"name": "Ajith S", "email": "ajiths221005@gmail.com", "code": "AS23-K7PJ"},
    {"name": "Saranya Thirunavukarasu", "email": "thiru55saranya@gmail.com", "code": "ST82-M4QP"},
    {"name": "Sarathi R", "email": "sarathi1311k@gmail.com", "code": "SR39-N7VK"},
    {"name": "Dinesh M", "email": "dinesshhmahendran@gmail.com", "code": "DM64-P2XT"},
    {"name": "Karthick D", "email": "karthickdk178@gmail.com", "code": "KD51-T8LR"},
    {"name": "Devadharshini K", "email": "devadharshinikannan23@gmail.com", "code": "DK93-W5MN"},
    {"name": "Elamathi M", "email": "elamathimanikkam09@gmail.com", "code": "EM76-R9BZ"},
    {"name": "Dhanusha K", "email": "dhanushakannan0211@gmail.com", "code": "DH48-K3TG"},
    {"name": "Pannerselvam N", "email": "nallathambipanner@gmail.com", "code": "PN27-Y6CV"},
    {"name": "Deepika S", "email": "deepikasathish2006@gmail.com", "code": "DS85-Q4HJ"},
    {"name": "Sivish K", "email": "sivish45@gmail.com", "code": "SK31-B8ND"},
    {"name": "Harshini K", "email": "harshinikamalnathan@gmail.com", "code": "HK62-L7VP"},
    {"name": "Sinduja D", "email": "sindusibi26@gmail.com", "code": "SD94-X2KW"},
    {"name": "SuryaPraba P", "email": "suryapraba1411@gmail.com", "code": "SP53-M9TR"},
    {"name": "Harini Rajavel", "email": "rharinicse@gmail.com", "code": "HR78-P4LG"},
    {"name": "Pushpa K", "email": "kp939445@gmail.com", "code": "PK26-C8VZ"},
    {"name": "Gokul Padma Kumaar P S", "email": "psgokulpadmakumaar@gmail.com", "code": "GP81-T3NQ"},
    {"name": "Poovizhi Rajasekar", "email": "poovizhirajasekar10@gmail.com", "code": "PR49-W7MB"},
    {"name": "Kabilan B", "email": "kabilankabi0505@gmail.com", "code": "KB63-R2HY"},
    {"name": "Priyadharshini Senthil", "email": "s.priyadharshinicse118@gmail.com", "code": "PS95-Y8KL"},
    {"name": "Shanmugam K", "email": "shanmugam.k8143@gmail.com", "code": "SM38-N4XP"},
    {"name": "Karan D", "email": "karandhandabani05@gmail.com", "code": "KD72-B6VT"},
    {"name": "Vishnu S", "email": "vishnusoundarrajan367@gmail.com", "code": "VS44-M9LR"},
    {"name": "Kishore K", "email": "kishoredhoni500@gmail.com", "code": "KK87-P5NW"},
    {"name": "Kowsalya S", "email": "kowsalyasathya2006@gmail.com", "code": "KS29-T7QG"},
    {"name": "Giri B", "email": "www.giri7010297900@gmail.com", "code": "GB65-X3BZ"},
    {"name": "Oviya P", "email": "mpoviya2005@gmail.com", "code": "OP91-K8VJ"},
    {"name": "Bala Harish", "email": "balaharish1752006@gmail.com", "code": "BH37-W2CP"},
    {"name": "Monisha R", "email": "monisha38338@gmail.com", "code": "MR58-R9TD"},
    {"name": "Bhavaneshwaran Jothikannan", "email": "bhavanjoe@gmail.com", "code": "BJ84-L4MK"},
    {"name": "Janarthanababu D", "email": "janarthanababu690@gmail.com", "code": "JB23-Y7XN"},
    {"name": "Sarathi M", "email": "sarathy072005@gmail.com", "code": "SM79-C3PQ"},
    {"name": "Poojashree V", "email": "poojashree.v886@gmail.com", "code": "PV46-N8TR"},
    {"name": "Santhosh Ramesh", "email": "santhoshrgstn29@gmail.com", "code": "SR92-T5VB"},
    {"name": "Sivasakthivel P", "email": "sivasakthivelpalanisamy11@gmail.com", "code": "SP35-W6KG"},
    {"name": "Shalini Muruganatham", "email": "shallu022006@gmail.com", "code": "SM68-P9LY"},
    {"name": "Srikar Puyal", "email": "srikarsri5566@gmail.com", "code": "SP83-R4MV"},
    {"name": "Sanjay R", "email": "r.sanjay832006@gmail.com", "code": "SR52-K7WZ"},
    {"name": "Akshaya Shree R", "email": "rsakshaya05@gmail.com", "code": "AR74-B3ND"},
    {"name": "Yokesh P", "email": "yokesh200531@gmail.com", "code": "YP39-X8TQ"},
    {"name": "Myvilidevi P", "email": "myvilidevipalanivel@gmail.com", "code": "MP86-L2CP"},
    {"name": "Poovarasan R", "email": "poovarasanff92@gmail.com", "code": "PR61-M7VJ"}
]

new_engineers = []
base_date = datetime(2026, 12, 9)

for i, raw in enumerate(new_raw_list):
    emp_id = f"SKY{23 + i:03d}"
    issue_date = (base_date + timedelta(days=i)).strftime("%Y-%m-%d")
    new_engineers.append({
        "employee_id": emp_id,
        "name": raw["name"],
        "email": raw["email"],
        "role": "Cloud Engineer",
        "start_date": "2023-01-03",
        "end_date": "2026-01-22",
        "issue_date": issue_date,
        "cert_code": raw["code"]
    })

print(f"Generated {len(new_engineers)} new engineers from SKY023 to SKY{22 + len(new_engineers):03d}")

# Full list of all engineers (22 existing + 42 new = 64 engineers)
all_engineers = existing_engineers + new_engineers

# Full list of all people for QR code generator (CEO + 64 Engineers + 1 Intern = 66)
all_qr_records = [ceo_info] + all_engineers + [intern_record]

# Template function for Standard Employee Verification Page
def generate_employee_html(emp):
    name = emp['name']
    role = emp['role']
    emp_id = emp['employee_id']
    cert_no = emp['cert_code']
    emp_type = "Full-time"
    issued_by = "SkySyncLab, Salem, Tamil Nadu, India"

    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <title>Verified: {name} | SkySyncLab</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #ffffff;
      background-image: 
        radial-gradient(circle at 10% 15%, rgba(219, 234, 254, 0.6) 0%, transparent 40%),
        radial-gradient(circle at 90% 10%, rgba(191, 219, 254, 0.45) 0%, transparent 35%);
      color: #0f172a;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }}
    .top-nav {{
      padding: 16px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 900px;
      margin: 0 auto;
      width: 100%;
    }}
    .brand {{
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: #0f2746;
      font-weight: 700;
      font-size: 18px;
    }}
    .brand img {{
      width: 30px;
      height: 30px;
      object-fit: contain;
    }}
    .nav-actions {{
      display: flex;
      align-items: center;
      gap: 16px;
    }}
    .nav-actions a {{
      font-size: 13.5px;
      font-weight: 600;
      color: #2563eb;
      text-decoration: none;
    }}
    .nav-actions a:hover {{
      text-decoration: underline;
    }}
    main {{
      max-width: 900px;
      margin: 16px auto 40px;
      padding: 0 20px;
      width: 100%;
    }}

    /* Verified Green Status Banner */
    .status-banner {{
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      border-radius: 16px;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 24px;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.08);
    }}
    .status-icon {{
      width: 38px;
      height: 38px;
      background: #10b981;
      color: #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }}
    .status-text h2 {{
      font-size: 16px;
      font-weight: 700;
      color: #065f46;
    }}
    .status-text p {{
      font-size: 13.5px;
      color: #047857;
      margin-top: 2px;
    }}

    /* Main Certificate Card */
    .record-card {{
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      padding: 36px 32px;
      box-shadow: 0 10px 30px rgba(15, 39, 70, 0.06);
    }}
    .card-top {{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
      padding-bottom: 24px;
      border-bottom: 1px solid #f1f5f9;
      margin-bottom: 28px;
    }}
    .person-header h1 {{
      font-size: 32px;
      font-weight: 800;
      color: #0b1f3a;
      letter-spacing: -0.02em;
      margin-bottom: 8px;
    }}
    .role-tag {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #f1f5f9;
      color: #334155;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
    }}
    .qr-badge-block {{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }}
    .qr-code-img {{
      width: 100px;
      height: 100px;
      border-radius: 10px;
      border: 1px solid #e2e8f0;
      padding: 4px;
      background: #ffffff;
    }}
    .qr-label {{
      font-size: 11px;
      font-weight: 600;
      color: #64748b;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }}

    /* Balanced 2x2 Data Grid */
    .data-grid {{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }}
    .data-box {{
      background: #f8fafc;
      border: 1px solid #f1f5f9;
      border-radius: 12px;
      padding: 14px 18px;
    }}
    .data-k {{
      font-size: 11.5px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
    }}
    .data-v {{
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
    }}
    .data-v.mono {{
      font-family: 'JetBrains Mono', monospace;
      color: #0284c7;
      font-size: 15px;
    }}

    /* Security Notice */
    .security-box {{
      margin-top: 28px;
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 14px;
      padding: 16px 20px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      font-size: 13.5px;
      color: #166534;
      line-height: 1.55;
    }}
    .security-box svg {{
      color: #16a34a;
      flex-shrink: 0;
      margin-top: 2px;
    }}
    .security-box a {{
      color: #15803d;
      font-weight: 600;
      text-decoration: underline;
    }}

    /* Action Buttons */
    .actions-row {{
      display: flex;
      gap: 12px;
      margin-top: 26px;
      flex-wrap: wrap;
    }}
    .btn-action {{
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 600;
      padding: 11px 20px;
      border-radius: 10px;
      text-decoration: none;
      transition: all 0.15s ease;
    }}
    .btn-action.primary {{
      background: #0f2746;
      color: #ffffff;
    }}
    .btn-action.primary:hover {{
      background: #173b6c;
    }}
    .btn-action.secondary {{
      background: #f1f5f9;
      color: #334155;
      border: 1px solid #cbd5e1;
    }}
    .btn-action.secondary:hover {{
      background: #e2e8f0;
      color: #0f172a;
    }}

    /* Footer & Wave */
    .footer-wrapper {{
      width: 100%;
      margin-top: 40px;
    }}
    .wave-svg {{
      display: block;
      width: 100%;
      height: 60px;
    }}
    footer {{
      background-color: #0b1f3a;
      color: #ffffff;
      padding: 22px 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 32px;
      font-size: 14px;
      font-weight: 500;
      flex-wrap: wrap;
    }}
    footer a {{
      color: #ffffff;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: opacity 0.15s;
    }}
    footer a:hover {{
      opacity: 0.85;
      text-decoration: underline;
    }}
    .footer-sep {{
      color: rgba(255, 255, 255, 0.3);
    }}

    @media (max-width: 650px) {{
      .card-top {{ flex-direction: column; }}
      .data-grid {{ grid-template-columns: 1fr; }}
      .record-card {{ padding: 24px 20px; }}
      .person-header h1 {{ font-size: 26px; }}
      footer {{ flex-direction: column; gap: 12px; text-align: center; }}
      .footer-sep {{ display: none; }}
    }}
  </style>
</head>
<body>

  <!-- Top Simple Brand Nav -->
  <div class="top-nav">
    <a href="https://skysynclab.com" class="brand">
      <img src="/assets/skysync_cloud_emblem.png" alt="SkySyncLab" onerror="this.src='/favicon.svg'">
      <span>SkySyncLab</span>
    </a>
    <div class="nav-actions">
      <a href="/verify/">&larr; Verify Another</a>
      <a href="https://skysynclab.com">Home</a>
    </div>
  </div>

  <main>
    <!-- Verified Green Status Banner -->
    <div class="status-banner">
      <div class="status-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
      </div>
      <div class="status-text">
        <h2>Certificate Verified &amp; Authentic</h2>
        <p>This official experience certificate was issued by SkySyncLab and validated against internal records.</p>
      </div>
    </div>

    <!-- Main Certificate Card -->
    <div class="record-card">
      <div class="card-top">
        <div class="person-header">
          <h1>{name}</h1>
          <div class="role-tag">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>{role}</span>
          </div>
        </div>
        <div class="qr-badge-block">
          <img src="./qr.png" alt="QR Code" class="qr-code-img" onerror="this.style.display='none'">
          <span class="qr-label">Verified QR</span>
        </div>
      </div>

      <div class="data-grid">
        <div class="data-box">
          <div class="data-k">Employee ID</div>
          <div class="data-v mono">{emp_id}</div>
        </div>
        <div class="data-box">
          <div class="data-k">Certificate No.</div>
          <div class="data-v mono">{cert_no}</div>
        </div>
        <div class="data-box">
          <div class="data-k">Employment Type</div>
          <div class="data-v">{emp_type}</div>
        </div>
        <div class="data-box">
          <div class="data-k">Issued By</div>
          <div class="data-v">{issued_by}</div>
        </div>
      </div>

      <div class="security-box">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <div>
          <strong>Official SkySyncLab Record:</strong> Check that the name, role, and dates above match the physical/digital credential you received. For third-party employment background verification inquiries, write to <a href="mailto:hello@skysynclab.com">hello@skysynclab.com</a>.
        </div>
      </div>

      <div class="actions-row">
        <a href="/verify/" class="btn-action primary">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <span>Verify Another Certificate</span>
        </a>
        <a href="https://skysynclab.com" class="btn-action secondary">
          <span>Return to SkySyncLab Home &rarr;</span>
        </a>
      </div>
    </div>
  </main>

  <!-- Footer with Matching Wave -->
  <div class="footer-wrapper">
    <svg class="wave-svg" viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
      <path d="M0,32 C320,60 720,10 1440,40 L1440,60 L0,60 Z" fill="#0b1f3a"></path>
    </svg>
    <footer>
      <a href="https://skysynclab.com">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        <span>skysynclab.com</span>
      </a>
      <span class="footer-sep">|</span>
      <a href="mailto:hello@skysynclab.com">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <span>hello@skysynclab.com</span>
      </a>
      <span class="footer-sep">|</span>
      <a href="tel:8667254699">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        <span>8667254699</span>
      </a>
    </footer>
  </div>
</body>
</html>
"""

# STEP 1: Create HTML verification files for all 42 new engineers
for emp in new_engineers:
    emp_dir = os.path.join("public", "verify", emp["cert_code"])
    os.makedirs(emp_dir, exist_ok=True)
    with open(os.path.join(emp_dir, "index.html"), "w", encoding="utf-8") as f:
        f.write(generate_employee_html(emp))

print(f"Created 42 verification HTML directories.")

# STEP 2: Update scripts/generate_qrs.js with all 66 records
all_js_objs = json.dumps(all_qr_records, indent=2)

gen_qrs_code = f"""import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

const employees = {all_js_objs};

const QR_DIR = path.resolve('public/verify/qrcodes');
if (!fs.existsSync(QR_DIR)) {{
  fs.mkdirSync(QR_DIR, {{ recursive: true }});
}}

async function generateAll() {{
  console.log(`Generating QR codes for ${{employees.length}} records...`);
  
  for (const emp of employees) {{
    const url = emp.is_intern 
      ? `https://skysynclab.com/verify/${{emp.cert_code}}/`
      : `https://skysynclab.com/verify/${{emp.cert_code}}/`;

    const cleanName = emp.name.replace(/\\s+/g, '_').replace(/\\./g, '_');
    const suffix = emp.is_intern ? `Internship_${{emp.cert_code}}` : emp.cert_code;
    const baseFilename = `${{emp.employee_id}}_${{cleanName}}_${{suffix}}`;
    
    // Target paths
    const galleryPngPath = path.join(QR_DIR, `${{baseFilename}}.png`);
    const gallerySvgPath = path.join(QR_DIR, `${{baseFilename}}.svg`);
    
    const pageDir = path.resolve(`public/verify/${{emp.cert_code}}`);
    if (!fs.existsSync(pageDir)) {{
      fs.mkdirSync(pageDir, {{ recursive: true }});
    }}
    const pagePngPath = path.join(pageDir, 'qr.png');
    const pageSvgPath = path.join(pageDir, 'qr.svg');

    // 1. Generate PNG (1000x1000 High-Res)
    await QRCode.toFile(galleryPngPath, url, {{
      width: 1000,
      margin: 2,
      color: {{
        dark: '#0f2746',
        light: '#ffffff'
      }},
      errorCorrectionLevel: 'H'
    }});
    fs.copyFileSync(galleryPngPath, pagePngPath);

    // 2. Generate SVG
    const svgStr = await QRCode.toString(url, {{
      type: 'svg',
      margin: 2,
      color: {{
        dark: '#0f2746',
        light: '#ffffff'
      }},
      errorCorrectionLevel: 'H'
    }});
    fs.writeFileSync(gallerySvgPath, svgStr, 'utf-8');
    fs.writeFileSync(pageSvgPath, svgStr, 'utf-8');
    
    console.log(`✓ [${{emp.employee_id}}] ${{emp.name}} -> ${{emp.cert_code}}`);
  }}
  
  console.log(`Successfully generated all ${{employees.length}} QR codes!`);
}}

generateAll().catch(err => {{
  console.error(err);
  process.exit(1);
}});
"""

with open("scripts/generate_qrs.js", "w", encoding="utf-8") as f:
    f.write(gen_qrs_code)

print("Updated scripts/generate_qrs.js")

# STEP 3: Run Node.js to generate all QR codes
subprocess.run(["node", "scripts/generate_qrs.js"], check=True)
print("QR Code generation finished successfully!")

# STEP 4: Build CSV & Excel directories
# Combine all into rows for CSV and Excel (CEO + 64 Engineers + 1 Intern = 66)
all_directory_rows = []

# 1. CEO
all_directory_rows.append({
    "Employee ID": ceo_info["employee_id"],
    "Full Name": ceo_info["name"],
    "Email Address": ceo_info["email"],
    "Designation / Role": ceo_info["role"],
    "Certificate No.": ceo_info["cert_code"],
    "Verification URL": f"https://skysynclab.com/verify/{ceo_info['cert_code']}/",
    "Start Date": ceo_info["start_date"],
    "End Date": ceo_info["end_date"],
    "Issue Date": ceo_info["issue_date"],
    "QR Code Image": f"{ceo_info['employee_id']}_{ceo_info['name'].replace(' ', '_')}_{ceo_info['cert_code']}.png"
})

# 2. Engineers (SKY001 - SKY064)
for emp in all_engineers:
    clean_name = emp["name"].replace(" ", "_").replace(".", "_")
    all_directory_rows.append({
        "Employee ID": emp["employee_id"],
        "Full Name": emp["name"],
        "Email Address": emp["email"],
        "Designation / Role": emp["role"],
        "Certificate No.": emp["cert_code"],
        "Verification URL": f"https://skysynclab.com/verify/{emp['cert_code']}/",
        "Start Date": emp["start_date"],
        "End Date": emp["end_date"],
        "Issue Date": emp["issue_date"],
        "QR Code Image": f"{emp['employee_id']}_{clean_name}_{emp['cert_code']}.png"
    })

# 3. Intern
all_directory_rows.append({
    "Employee ID": intern_record["employee_id"],
    "Full Name": intern_record["name"],
    "Email Address": intern_record["email"],
    "Designation / Role": intern_record["role"],
    "Certificate No.": intern_record["cert_code"],
    "Verification URL": f"https://skysynclab.com/verify/{intern_record['cert_code']}/",
    "Start Date": intern_record["start_date"],
    "End Date": intern_record["end_date"],
    "Issue Date": intern_record["issue_date"],
    "QR Code Image": f"{intern_record['employee_id']}_{intern_record['name'].replace(' ', '_')}_Internship_{intern_record['cert_code']}.png"
})

fieldnames = [
    "Employee ID", "Full Name", "Email Address", "Designation / Role",
    "Certificate No.", "Verification URL", "Start Date", "End Date", "Issue Date", "QR Code Image"
]

# Write CSV
for csv_path in ["skysynclab_certificate_directory.csv", "public/verify/skysynclab_certificate_directory.csv"]:
    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(all_directory_rows)
    print(f"Wrote {len(all_directory_rows)} rows to {csv_path}")

# Write Excel
wb = openpyxl.Workbook()
ws = wb.active
ws.title = "Certificates"
ws.views.sheetView[0].showGridLines = True
ws.append(fieldnames)

header_fill = PatternFill(start_color="0F2746", end_color="0F2746", fill_type="solid")
header_font = Font(name="Segoe UI", size=11, bold=True, color="FFFFFF")
regular_font = Font(name="Segoe UI", size=10)
bold_font = Font(name="Segoe UI", size=10, bold=True)
mono_font = Font(name="Consolas", size=10, color="0B63C5", bold=True)
link_font = Font(name="Segoe UI", size=10, color="0A66C2", underline="single")
thin_border = Border(
    left=Side(style='thin', color="E2E8F0"),
    right=Side(style='thin', color="E2E8F0"),
    top=Side(style='thin', color="E2E8F0"),
    bottom=Side(style='thin', color="E2E8F0")
)

for col_idx, h in enumerate(fieldnames, start=1):
    c = ws.cell(row=1, column=col_idx)
    c.fill = header_fill
    c.font = header_font
    c.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
ws.row_dimensions[1].height = 28

for row_idx, r in enumerate(all_directory_rows, start=2):
    ws.row_dimensions[row_idx].height = 22
    for col_idx, col_name in enumerate(fieldnames, start=1):
        cell = ws.cell(row=row_idx, column=col_idx, value=r[col_name])
        cell.border = thin_border
        cell.alignment = Alignment(vertical="center")
        
        if col_name == "Employee ID":
            cell.font = bold_font
            cell.alignment = Alignment(horizontal="center", vertical="center")
        elif col_name == "Certificate No.":
            cell.font = mono_font
            cell.alignment = Alignment(horizontal="center", vertical="center")
        elif col_name == "Verification URL":
            cell.font = link_font
            cell.hyperlink = r[col_name]
        elif "Date" in col_name:
            cell.alignment = Alignment(horizontal="center", vertical="center")
            cell.font = regular_font
        else:
            cell.font = regular_font

for col in ws.columns:
    max_len = 0
    col_letter = get_column_letter(col[0].column)
    for cell in col:
        if cell.value:
            max_len = max(max_len, len(str(cell.value)))
    ws.column_dimensions[col_letter].width = max(max_len + 4, 12)

ws.column_dimensions['A'].width = 16
ws.column_dimensions['B'].width = 28
ws.column_dimensions['C'].width = 34
ws.column_dimensions['D'].width = 34
ws.column_dimensions['E'].width = 20
ws.column_dimensions['F'].width = 46
ws.column_dimensions['J'].width = 44

for excel_path in ["skysynclab_certificate_directory.xlsx", "public/verify/skysynclab_certificate_directory.xlsx"]:
    wb.save(excel_path)
    print(f"Saved Excel to {excel_path}")

# STEP 5: Update public/verify/index.html lookupMap
with open("public/verify/index.html", "r", encoding="utf-8") as f:
    verify_html = f.read()

lookup_entries = [
    '  // Executive Leadership Mappings',
    '  "SK01-CEO1": "SK01-CEO1",',
    '  "SKY-CEO": "SK01-CEO1",',
    '  "SKYCEO": "SK01-CEO1",',
    '  "CEO": "SK01-CEO1",',
    '  "SKY000": "SK01-CEO1",',
    '  "SENTHIL": "SK01-CEO1",',
    '  "SENTHILKUMAR": "SK01-CEO1",',
    '  "SENTHILKUMARM": "SK01-CEO1",'
]

for emp in all_engineers:
    code = emp["cert_code"]
    clean_code = code.replace("-", "")
    emp_id = emp["employee_id"]
    lookup_entries.append(f'  "{code}": "{code}",')
    lookup_entries.append(f'  "{clean_code}": "{code}",')
    lookup_entries.append(f'  "{emp_id}": "{code}",')

# Intern aliases
lookup_entries.append('  "TR03-INT1": "TR03-INT1",')
lookup_entries.append('  "TR03INT1": "TR03-INT1",')
lookup_entries.append('  "SKY003-INT": "TR03-INT1",')
lookup_entries.append('  "SKY-INT003": "TR03-INT1",')
lookup_entries.append('  "SKYINT003": "TR03-INT1",')
lookup_entries.append('  "ROHITH-INTERN": "TR03-INT1",')

# Name aliases for key personnel
lookup_entries.append('  "AJITH": "AS23-K7PJ",')
lookup_entries.append('  "AJITHS": "AS23-K7PJ",')
lookup_entries.append('  "AJAY": "AJ28-S5PT",')
lookup_entries.append('  "AJAYS": "AJ28-S5PT",')
lookup_entries.append('  "DHANUSH": "DP74-H8NW",')
lookup_entries.append('  "DHANUSHP": "DP74-H8NW"')

new_map_str = "const lookupMap = {\n" + "\n".join(lookup_entries) + "\n};"
verify_html_updated = re.sub(r'const lookupMap = \{[\s\S]*?\};', new_map_str, verify_html)
with open("public/verify/index.html", "w", encoding="utf-8") as f:
    f.write(verify_html_updated)
print("Updated lookupMap in public/verify/index.html")

# STEP 6: Update public/verify/qrcodes/index.html with all cards
cards_html = []
# CEO card
cards_html.append(f"""
      <div class="qr-card">
        <div>
          <div class="qr-img-wrap">
            <img src="./{ceo_info['employee_id']}_{ceo_info['name'].replace(' ', '_')}_{ceo_info['cert_code']}.png" alt="{ceo_info['name']} QR">
          </div>
          <div class="emp-name">{ceo_info['name']}</div>
          <div class="badges-row">
            <span class="badge-id">{ceo_info['employee_id']}</span>
            <span class="badge-code">{ceo_info['cert_code']}</span>
          </div>
        </div>
        <div>
          <div class="btn-group">
            <a href="./{ceo_info['employee_id']}_{ceo_info['name'].replace(' ', '_')}_{ceo_info['cert_code']}.png" download="{ceo_info['employee_id']}_{ceo_info['name']}_QR.png" class="btn-download">&#11015; PNG</a>
            <a href="./{ceo_info['employee_id']}_{ceo_info['name'].replace(' ', '_')}_{ceo_info['cert_code']}.svg" download="{ceo_info['employee_id']}_{ceo_info['name']}_QR.svg" class="btn-download">&#11015; SVG</a>
          </div>
          <a href="/verify/{ceo_info['cert_code']}/" target="_blank" class="btn-page">View Verification Record &rarr;</a>
        </div>
      </div>
""")

# Engineers cards
for emp in all_engineers:
    clean_name = emp["name"].replace(" ", "_").replace(".", "_")
    base_file = f"{emp['employee_id']}_{clean_name}_{emp['cert_code']}"
    cards_html.append(f"""
      <div class="qr-card">
        <div>
          <div class="qr-img-wrap">
            <img src="./{base_file}.png" alt="{emp['name']} QR">
          </div>
          <div class="emp-name">{emp['name']}</div>
          <div class="badges-row">
            <span class="badge-id">{emp['employee_id']}</span>
            <span class="badge-code">{emp['cert_code']}</span>
          </div>
        </div>
        <div>
          <div class="btn-group">
            <a href="./{base_file}.png" download="{emp['employee_id']}_{clean_name}_QR.png" class="btn-download">&#11015; PNG</a>
            <a href="./{base_file}.svg" download="{emp['employee_id']}_{clean_name}_QR.svg" class="btn-download">&#11015; SVG</a>
          </div>
          <a href="/verify/{emp['cert_code']}/" target="_blank" class="btn-page">View Verification Record &rarr;</a>
        </div>
      </div>
""")

# Intern card
cards_html.append(f"""
      <div class="qr-card">
        <div>
          <div class="qr-img-wrap">
            <img src="./{intern_record['employee_id']}_{intern_record['name'].replace(' ', '_')}_Internship_{intern_record['cert_code']}.png" alt="{intern_record['name']} Intern QR">
          </div>
          <div class="emp-name">{intern_record['name']} (Intern)</div>
          <div class="badges-row">
            <span class="badge-id">{intern_record['employee_id']}</span>
            <span class="badge-code">{intern_record['cert_code']}</span>
          </div>
        </div>
        <div>
          <div class="btn-group">
            <a href="./{intern_record['employee_id']}_{intern_record['name'].replace(' ', '_')}_Internship_{intern_record['cert_code']}.png" download="{intern_record['employee_id']}_Internship_QR.png" class="btn-download">&#11015; PNG</a>
            <a href="./{intern_record['employee_id']}_{intern_record['name'].replace(' ', '_')}_Internship_{intern_record['cert_code']}.svg" download="{intern_record['employee_id']}_Internship_QR.svg" class="btn-download">&#11015; SVG</a>
          </div>
          <a href="/verify/{intern_record['cert_code']}/" target="_blank" class="btn-page">View Verification Record &rarr;</a>
        </div>
      </div>
""")

with open("public/verify/qrcodes/index.html", "r", encoding="utf-8") as f:
    gallery_html = f.read()

new_cards_block = '<div class="grid" id="qr-grid">\n' + "".join(cards_html) + '\n    </div>'
gallery_html_updated = re.sub(r'<div class="grid" id="qr-grid">[\s\S]*?</div>\s*</main>', new_cards_block + '\n  </main>', gallery_html)

# Update count in subtitle
gallery_html_updated = re.sub(r'High-resolution vector \(SVG\) and 1000px transparent PNG QR codes for all \d+ official SkySyncLab credentials\.', f'High-resolution vector (SVG) and 1000px transparent PNG QR codes for all {len(all_qr_records)} official SkySyncLab credentials.', gallery_html_updated)

with open("public/verify/qrcodes/index.html", "w", encoding="utf-8") as f:
    f.write(gallery_html_updated)
print(f"Updated public/verify/qrcodes/index.html with {len(all_qr_records)} cards")

# STEP 7: Re-create zip archive with all QR codes
zip_path = "public/verify/qrcodes/skysynclab_qr_codes.zip"
with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    qr_dir = "public/verify/qrcodes"
    for fname in os.listdir(qr_dir):
        if fname.endswith(".png") or fname.endswith(".svg"):
            zipf.write(os.path.join(qr_dir, fname), fname)
print(f"Rebuilt {zip_path} (size: {os.path.getsize(zip_path)} bytes)")

# STEP 8: Regenerate sitemap.xml
subprocess.run(["python", "scripts/generate_sitemap.py"], check=True)
print("Updated sitemap.xml")

print("\n--- ALL DONE SUCCESSFULLY! ---")
