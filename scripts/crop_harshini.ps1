Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('C:\Users\Senthilmoni\.gemini\antigravity\brain\d00d184c-8d4c-4517-b6f5-a4a77314478f\.user_uploaded\media_1795269404821_fad02c66.jpg')
Write-Host "Dimensions: $($img.Width) x $($img.Height)"
$cropY = [int]($img.Height * 0.44)
$cropH = [int]($img.Height * 0.12)
$cropX = [int]($img.Width * 0.25)
$cropW = [int]($img.Width * 0.6)
$bmp = New-Object System.Drawing.Bitmap $cropW, $cropH
$g = [System.Drawing.Graphics]::FromImage($bmp)
$rect = New-Object System.Drawing.Rectangle 0, 0, $cropW, $cropH
$srcRect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropW, $cropH
$g.DrawImage($img, $rect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$bmp.Save('scratch\row16_harshini.png', [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
$bmp.Dispose()
$g.Dispose()
Write-Host "Saved scratch\row16_harshini.png"

