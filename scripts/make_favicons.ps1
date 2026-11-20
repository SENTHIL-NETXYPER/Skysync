Add-Type -AssemblyName System.Drawing

$sourcePath = "d:\THAT I CAN\senthil\src\assets\skysync_cloud_white.png"
$sourceImg = [System.Drawing.Bitmap]::FromFile($sourcePath)

function Generate-Favicon([int]$size, [string]$outputPath, [int]$radius) {
    $bmp = [System.Drawing.Bitmap]::new($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)

    # Create dark rounded background path
    $rect = [System.Drawing.Rectangle]::new(0, 0, $size, $size)
    $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
    $d = $radius * 2
    $path.AddArc(0, 0, $d, $d, 180, 90)
    $path.AddArc($size - $d, 0, $d, $d, 270, 90)
    $path.AddArc($size - $d, $size - $d, $d, $d, 0, 90)
    $path.AddArc(0, $size - $d, $d, $d, 90, 90)
    $path.CloseFigure()

    # Fill dark background (#0B1F3A)
    $brush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 11, 31, 58))
    $g.FillPath($brush, $path)

    # Border stroke subtle white
    $pen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(40, 255, 255, 255), 1.0)
    $g.DrawPath($pen, $path)

    # Draw white cloud emblem centered
    # Aspect ratio: 180 x 119 => 1.51
    $targetW = [int]($size * 0.72)
    $targetH = [int]($targetW / 1.51)
    $targetX = [int](($size - $targetW) / 2)
    $targetY = [int](($size - $targetH) / 2)

    $destRect = [System.Drawing.Rectangle]::new($targetX, $targetY, $targetW, $targetH)
    $g.DrawImage($sourceImg, $destRect)

    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

    $brush.Dispose()
    $pen.Dispose()
    $path.Dispose()
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "✓ Generated $outputPath ($size x $size)"
}

Generate-Favicon 512 "d:\THAT I CAN\senthil\public\icon-512.png" 110
Generate-Favicon 180 "d:\THAT I CAN\senthil\public\apple-touch-icon.png" 40
Generate-Favicon 96  "d:\THAT I CAN\senthil\public\favicon-96x96.png" 22
Generate-Favicon 48  "d:\THAT I CAN\senthil\public\favicon-48x48.png" 11
Generate-Favicon 48  "d:\THAT I CAN\senthil\public\favicon.png" 11
Generate-Favicon 32  "d:\THAT I CAN\senthil\public\favicon-32x32.png" 8
Generate-Favicon 16  "d:\THAT I CAN\senthil\public\favicon-16x16.png" 4

$sourceImg.Dispose()

