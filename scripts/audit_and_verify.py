import os
import glob
import xml.etree.ElementTree as ET
import csv
import json

BASE_DIR = r"d:\THAT I CAN\senthil"
os.chdir(BASE_DIR)

errors = []
warnings = []

print("=== STARTING FULL SYSTEM AUDIT ===")

# 1. Check CSV Directory
csv_path = "skysynclab_certificate_directory.csv"
if not os.path.exists(csv_path):
    errors.append(f"Missing {csv_path}")
else:
    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        csv_records = list(reader)
        print(f"✓ CSV loaded: {len(csv_records)} records")

# 2. Check each certificate page and QR codes
for r in csv_records:
    cert_no = r["Certificate No."]
    emp_id = r["Employee ID"]
    name = r["Full Name"]
    
    cert_dir = os.path.join("public", "verify", cert_no)
    html_file = os.path.join(cert_dir, "index.html")
    qr_png = os.path.join(cert_dir, "qr.png")
    qr_svg = os.path.join(cert_dir, "qr.svg")
    
    if not os.path.exists(html_file):
        errors.append(f"Missing HTML: {html_file}")
    else:
        with open(html_file, "r", encoding="utf-8") as f:
            content = f.read()
            if cert_no not in content:
                warnings.append(f"Certificate No {cert_no} not found in {html_file}")
            if "Certificate Issued" in content and not r.get("is_intern"):
                warnings.append(f"Old 'Certificate Issued' field found in {html_file}")
            if "/assets/skysync_cloud_emblem.png" not in content and "favicon.svg" not in content:
                warnings.append(f"Brand logo issue in {html_file}")
                
    if not os.path.exists(qr_png):
        errors.append(f"Missing QR PNG: {qr_png}")
    elif os.path.getsize(qr_png) == 0:
        errors.append(f"Empty QR PNG: {qr_png}")
        
    if not os.path.exists(qr_svg):
        errors.append(f"Missing QR SVG: {qr_svg}")
    elif os.path.getsize(qr_svg) == 0:
        errors.append(f"Empty QR SVG: {qr_svg}")

# 3. Check Sitemap XML syntax
sitemap_path = os.path.join("public", "sitemap.xml")
if not os.path.exists(sitemap_path):
    errors.append(f"Missing {sitemap_path}")
else:
    try:
        tree = ET.parse(sitemap_path)
        root = tree.getroot()
        urls = [elem.text for elem in root.findall("{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc")]
        print(f"✓ Sitemap is valid XML with {len(urls)} URLs")
    except Exception as e:
        errors.append(f"Sitemap XML parsing error: {e}")

# 4. Check Robots.txt
robots_path = os.path.join("public", "robots.txt")
if not os.path.exists(robots_path):
    errors.append("Missing robots.txt")
else:
    with open(robots_path, "r", encoding="utf-8") as f:
        rc = f.read()
        if "sitemap.xml" not in rc:
            warnings.append("robots.txt does not mention sitemap.xml")
        else:
            print("✓ robots.txt verified")

# 5. Check lookupMap in public/verify/index.html
verify_index = os.path.join("public", "verify", "index.html")
with open(verify_index, "r", encoding="utf-8") as f:
    v_html = f.read()
    for r in csv_records:
        c = r["Certificate No."]
        if f'"{c}"' not in v_html:
            errors.append(f"Certificate code {c} missing from verify/index.html lookupMap")

# 6. Check QR codes ZIP archive
zip_path = os.path.join("public", "verify", "qrcodes", "skysynclab_qr_codes.zip")
if not os.path.exists(zip_path):
    errors.append("Missing skysynclab_qr_codes.zip")
else:
    print(f"✓ skysynclab_qr_codes.zip exists ({os.path.getsize(zip_path)} bytes)")

print("\n=== AUDIT RESULTS ===")
print(f"Errors found: {len(errors)}")
for e in errors:
    print(f"  ❌ ERROR: {e}")

print(f"Warnings found: {len(warnings)}")
for w in warnings:
    print(f"  ⚠️ WARNING: {w}")

if not errors and not warnings:
    print("✨ ALL AUDITS PASSED PERFECTLY! ZERO BUGS DETECTED!")
