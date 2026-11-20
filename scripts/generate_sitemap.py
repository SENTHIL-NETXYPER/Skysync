import os

base_url = 'https://skysynclab.com'
today = '2026-11-20'

verify_dirs = sorted([
    d for d in os.listdir('public/verify') 
    if os.path.isdir(os.path.join('public/verify', d)) and d != 'qrcodes'
])

xml_lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <url>',
    f'    <loc>{base_url}/</loc>',
    f'    <lastmod>{today}</lastmod>',
    '    <changefreq>weekly</changefreq>',
    '    <priority>1.0</priority>',
    '  </url>',
    '  <url>',
    f'    <loc>{base_url}/verify/</loc>',
    f'    <lastmod>{today}</lastmod>',
    '    <changefreq>monthly</changefreq>',
    '    <priority>0.8</priority>',
    '  </url>'
]

for code in verify_dirs:
    xml_lines.extend([
        '  <url>',
        f'    <loc>{base_url}/verify/{code}/</loc>',
        f'    <lastmod>{today}</lastmod>',
        '    <changefreq>never</changefreq>',
        '    <priority>0.6</priority>',
        '  </url>'
    ])

xml_lines.append('</urlset>')
content = '\n'.join(xml_lines) + '\n'

with open('public/sitemap.xml', 'w', encoding='utf-8') as f:
    f.write(content)

print(f'Wrote public/sitemap.xml with {len(verify_dirs) + 2} URLs')
