import os
import json
import csv
import random
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

BASE_DIR = r"d:\THAT I CAN\senthil"
os.chdir(BASE_DIR)

# 1. Load existing records
existing_records = []
existing_codes = set()
existing_ids = set()

with open('skysynclab_certificate_directory.csv', mode='r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        existing_records.append(row)
        existing_codes.add(row['Certificate No.'])
        existing_ids.add(row['Employee ID'])

print(f"Loaded {len(existing_records)} existing records.")

# Helper to generate unique 4-4 alphanumeric code
chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789" # omit O, 0, I, 1 for clarity
def gen_code(prefix=None):
    while True:
        if prefix and len(prefix) <= 4:
            part1 = prefix + "".join(random.choices(chars, k=4 - len(prefix)))
        else:
            part1 = "".join(random.choices(chars, k=4))
        part2 = "".join(random.choices(chars, k=4))
        code = f"{part1}-{part2}"
        if code not in existing_codes:
            existing_codes.add(code)
            return code

# Deterministic codes for repeatability
random.seed(42)

new_entries = [
    # 1. AJITH S (specifically requested)
    {
        "name": "Ajith S",
        "email": "ajiths221005@gmail.com",
        "role": "Cloud Engineer",
        "code": "AS23-K7PJ"
    },
    # 41 from pictures
    {"name": "Saranya Thirunavukarasu", "email": "thiru55saranya@gmail.com", "role": "Cloud Engineer", "code": gen_code("ST")},
    {"name": "Sarathi R", "email": "sarathi1311k@gmail.com", "role": "Cloud Engineer", "code": gen_code("SR")},
    {"name": "Dinesh M", "email": "dinesshhmahendran@gmail.com", "role": "Cloud Engineer", "code": gen_code("DM")},
    {"name": "Karthick D", "email": "karthickdk178@gmail.com", "role": "Cloud Engineer", "code": gen_code("KD")},
    {"name": "Devadharshini K", "email": "devadharshinikannan23@gmail.com", "role": "Cloud Engineer", "code": gen_code("DK")},
    {"name": "Elamathi M", "email": "elamathimanikkam09@gmail.com", "role": "Cloud Engineer", "code": gen_code("EM")},
    {"name": "Dhanusha K", "email": "dhanushakannan0211@gmail.com", "role": "Cloud Engineer", "code": gen_code("DH")},
    {"name": "Pannerselvam N", "email": "nallathambipanner@gmail.com", "role": "Cloud Engineer", "code": gen_code("PN")},
    {"name": "Deepika S", "email": "deepikasathish2006@gmail.com", "role": "Cloud Engineer", "code": gen_code("DS")},
    {"name": "Sivish K", "email": "sivish45@gmail.com", "role": "Cloud Engineer", "code": gen_code("SK")},
    {"name": "Harshini K", "email": "harshinikamalnathan@gmail.com", "role": "Cloud Engineer", "code": gen_code("HK")},
    {"name": "Sinduja D", "email": "sindusibi26@gmail.com", "role": "Cloud Engineer", "code": gen_code("SD")},
    {"name": "SuryaPraba P", "email": "suryapraba1411@gmail.com", "role": "Cloud Engineer", "code": gen_code("SP")},
    {"name": "Harini Rajavel", "email": "rharinicse@gmail.com", "role": "Cloud Engineer", "code": gen_code("HR")},
    {"name": "Pushpa K", "email": "kp939445@gmail.com", "role": "Cloud Engineer", "code": gen_code("PK")},
    {"name": "Gokul Padma Kumaar P S", "email": "psgokulpadmakumaar@gmail.com", "role": "Cloud Engineer", "code": gen_code("GP")},
    {"name": "Poovizhi Rajasekar", "email": "poovizhirajasekar10@gmail.com", "role": "Cloud Engineer", "code": gen_code("PR")},
    {"name": "Kabilan B", "email": "kabilankabi0505@gmail.com", "role": "Cloud Engineer", "code": gen_code("KB")},
    {"name": "Priyadharshini Senthil", "email": "s.priyadharshinicse118@gmail.com", "role": "Cloud Engineer", "code": gen_code("PS")},
    {"name": "Shanmugam K", "email": "shanmugam.k8143@gmail.com", "role": "Cloud Engineer", "code": gen_code("SM")},
    {"name": "Karan D", "email": "karandhandabani05@gmail.com", "role": "Cloud Engineer", "code": gen_code("KD")},
    {"name": "Vishnu S", "email": "vishnusoundarrajan367@gmail.com", "role": "Cloud Engineer", "code": gen_code("VS")},
    {"name": "Kishore K", "email": "kishoredhoni500@gmail.com", "role": "Cloud Engineer", "code": gen_code("KK")},
    {"name": "Kowsalya S", "email": "kowsalyasathya2006@gmail.com", "role": "Cloud Engineer", "code": gen_code("KS")},
    {"name": "Giri B", "email": "www.giri7010297900@gmail.com", "role": "Cloud Engineer", "code": gen_code("GB")},
    {"name": "Oviya P", "email": "mpoviya2005@gmail.com", "role": "Cloud Engineer", "code": gen_code("OP")},
    {"name": "Bala Harish", "email": "balaharish1752006@gmail.com", "role": "Cloud Engineer", "code": gen_code("BH")},
    {"name": "Monisha R", "email": "monisha38338@gmail.com", "role": "Cloud Engineer", "code": gen_code("MR")},
    {"name": "Bhavaneshwaran Jothikannan", "email": "bhavanjoe@gmail.com", "role": "Cloud Engineer", "code": gen_code("BJ")},
    {"name": "Janarthanababu D", "email": "janarthanababu690@gmail.com", "role": "Cloud Engineer", "code": gen_code("JB")},
    {"name": "Sarathi M", "email": "sarathy072005@gmail.com", "role": "Cloud Engineer", "code": gen_code("SM")},
    {"name": "Poojashree V", "email": "poojashree.v886@gmail.com", "role": "Cloud Engineer", "code": gen_code("PV")},
    {"name": "Santhosh Ramesh", "email": "santhoshrgstn29@gmail.com", "role": "Cloud Engineer", "code": gen_code("SR")},
    {"name": "Sivasakthivel P", "email": "sivasakthivelpalanisamy11@gmail.com", "role": "Cloud Engineer", "code": gen_code("SP")},
    {"name": "Shalini Muruganatham", "email": "shallu022006@gmail.com", "role": "Cloud Engineer", "code": gen_code("SM")},
    {"name": "Srikar Puyal", "email": "srikarsri5566@gmail.com", "role": "Cloud Engineer", "code": gen_code("SP")},
    {"name": "Sanjay R", "email": "r.sanjay832006@gmail.com", "role": "Cloud Engineer", "code": gen_code("SR")},
    {"name": "Akshaya Shree R", "email": "rsakshaya05@gmail.com", "role": "Cloud Engineer", "code": gen_code("AR")},
    {"name": "Yokesh P", "email": "yokesh200531@gmail.com", "role": "Cloud Engineer", "code": gen_code("YP")},
    {"name": "Myvilidevi P", "email": "myvilidevipalanivel@gmail.com", "role": "Cloud Engineer", "code": gen_code("MP")},
    {"name": "Poovarasan R", "email": "poovarasanff92@gmail.com", "role": "Cloud Engineer", "code": gen_code("PR")}
]

print(f"Total new entries to add: {len(new_entries)}")

# Assign Employee IDs SKY023 .. SKY064 and dates
start_idx = 23
from datetime import datetime, timedelta
base_issue = datetime(2026, 12, 9)

formatted_new_records = []
for i, entry in enumerate(new_entries):
    emp_num = start_idx + i
    emp_id = f"SKY{emp_num:03d}"
    issue_dt = base_issue + timedelta(days=i)
    issue_str = issue_dt.strftime("%Y-%m-%d")
    
    # Safe name for QR code filename
    clean_name = entry["name"].replace(" ", "_").replace(".", "_")
    qr_filename = f"{emp_id}_{clean_name}_{entry['code']}.png"
    
    rec = {
        "Employee ID": emp_id,
        "Full Name": entry["name"],
        "Email Address": entry["email"],
        "Designation / Role": entry["role"],
        "Certificate No.": entry["code"],
        "Verification URL": f"https://skysynclab.com/verify/{entry['code']}/",
        "Start Date": "2023-01-03",
        "End Date": "2026-01-22",
        "Issue Date": issue_str,
        "QR Code Image": qr_filename
    }
    formatted_new_records.append(rec)

print(f"Sample first new: {formatted_new_records[0]}")
print(f"Sample last new: {formatted_new_records[-1]}")
