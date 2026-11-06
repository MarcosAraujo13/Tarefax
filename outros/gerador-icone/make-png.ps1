Add-Type -AssemblyName System.Drawing

function New-FaviconPng {
    param(
        [string]$OutFile,
        [int]$Size = 64
    )

    $bmp = New-Object System.Drawing.Bitmap $Size, $Size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)

    $scale = $Size / 64.0

    # Squircle
    $bgPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $x = 2.0 * $scale
    $y = 2.0 * $scale
    $w = 60.0 * $scale
    $h = 60.0 * $scale
    $r = 16.0 * $scale
    $d = $r * 2.0
    $bgPath.AddArc([single]$x, [single]$y, [single]$d, [single]$d, [single]180, [single]90)
    $bgPath.AddArc([single]($x + $w - $d), [single]$y, [single]$d, [single]$d, [single]270, [single]90)
    $bgPath.AddArc([single]($x + $w - $d), [single]($y + $h - $d), [single]$d, [single]$d, [single]0, [single]90)
    $bgPath.AddArc([single]$x, [single]($y + $h - $d), [single]$d, [single]$d, [single]90, [single]90)
    $bgPath.CloseFigure()

    $p1 = New-Object System.Drawing.PointF 0, 0
    $p2 = New-Object System.Drawing.PointF $Size, $Size
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush ($p1, $p2, [System.Drawing.Color]::FromArgb(255, 20, 184, 166), [System.Drawing.Color]::FromArgb(255, 15, 118, 110))
    $g.FillPath($brush, $bgPath)

    # Sheet
    $sheetPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $sx = 12.0 * $scale
    $sy = 11.0 * $scale
    $sw = 40.0 * $scale
    $sh = 43.0 * $scale
    $sr = 7.0 * $scale
    $sd = $sr * 2.0
    $sheetPath.AddArc([single]$sx, [single]$sy, [single]$sd, [single]$sd, [single]180, [single]90)
    $sheetPath.AddArc([single]($sx + $sw - $sd), [single]$sy, [single]$sd, [single]$sd, [single]270, [single]90)
    $sheetPath.AddArc([single]($sx + $sw - $sd), [single]($sy + $sh - $sd), [single]$sd, [single]$sd, [single]0, [single]90)
    $sheetPath.AddArc([single]$sx, [single]($sy + $sh - $sd), [single]$sd, [single]$sd, [single]90, [single]90)
    $sheetPath.CloseFigure()
    $g.FillPath([System.Drawing.Brushes]::White, $sheetPath)

    # Clip base
    $clipBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 11, 59, 54))
    $clipPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $cx = 23.0 * $scale
    $cy = 6.0 * $scale
    $cw = 18.0 * $scale
    $ch = 9.0 * $scale
    $cr = 4.5 * $scale
    $cd = $cr * 2.0
    $clipPath.AddArc([single]$cx, [single]$cy, [single]$cd, [single]$cd, [single]180, [single]90)
    $clipPath.AddArc([single]($cx + $cw - $cd), [single]$cy, [single]$cd, [single]$cd, [single]270, [single]90)
    $clipPath.AddArc([single]($cx + $cw - $cd), [single]($cy + $ch - $cd), [single]$cd, [single]$cd, [single]0, [single]90)
    $clipPath.AddArc([single]$cx, [single]($cy + $ch - $cd), [single]$cd, [single]$cd, [single]90, [single]90)
    $clipPath.CloseFigure()
    $g.FillPath($clipBrush, $clipPath)

    # Clip highlight
    $accBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 94, 234, 212))
    $accPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $ax = 27.0 * $scale
    $ay = 8.0 * $scale
    $aw = 10.0 * $scale
    $ah = 3.0 * $scale
    $ar = 1.5 * $scale
    $ad = $ar * 2.0
    $accPath.AddArc([single]$ax, [single]$ay, [single]$ad, [single]$ad, [single]180, [single]90)
    $accPath.AddArc([single]($ax + $aw - $ad), [single]$ay, [single]$ad, [single]$ad, [single]270, [single]90)
    $accPath.AddArc([single]($ax + $aw - $ad), [single]($ay + $ah - $ad), [single]$ad, [single]$ad, [single]0, [single]90)
    $accPath.AddArc([single]$ax, [single]($ay + $ah - $ad), [single]$ad, [single]$ad, [single]90, [single]90)
    $accPath.CloseFigure()
    $g.FillPath($accBrush, $accPath)

    # Checkmarks
    $pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 15, 118, 110)), ([single](3.8 * $scale))
    $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

    # Task 1 check
    $pt1 = [System.Drawing.PointF[]]@(
        (New-Object System.Drawing.PointF ([single](18 * $scale)), ([single](24 * $scale))),
        (New-Object System.Drawing.PointF ([single](22.5 * $scale)), ([single](28.5 * $scale))),
        (New-Object System.Drawing.PointF ([single](31 * $scale)), ([single](19.5 * $scale)))
    )
    $g.DrawLines($pen, $pt1)

    # Task 1 bar
    $barBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 100, 116, 139))
    $bar1 = New-Object System.Drawing.Drawing2D.GraphicsPath
    $bx1 = 35.0 * $scale
    $by1 = 22.0 * $scale
    $bw1 = 11.0 * $scale
    $bh1 = 4.0 * $scale
    $br1 = 2.0 * $scale
    $bd1 = $br1 * 2.0
    $bar1.AddArc([single]$bx1, [single]$by1, [single]$bd1, [single]$bd1, [single]180, [single]90)
    $bar1.AddArc([single]($bx1 + $bw1 - $bd1), [single]$by1, [single]$bd1, [single]$bd1, [single]270, [single]90)
    $bar1.AddArc([single]($bx1 + $bw1 - $bd1), [single]($by1 + $bh1 - $bd1), [single]$bd1, [single]$bd1, [single]0, [single]90)
    $bar1.AddArc([single]$bx1, [single]($by1 + $bh1 - $bd1), [single]$bd1, [single]$bd1, [single]90, [single]90)
    $bar1.CloseFigure()
    $g.FillPath($barBrush, $bar1)

    # Task 2 check
    $pt2 = [System.Drawing.PointF[]]@(
        (New-Object System.Drawing.PointF ([single](18 * $scale)), ([single](39 * $scale))),
        (New-Object System.Drawing.PointF ([single](22.5 * $scale)), ([single](43.5 * $scale))),
        (New-Object System.Drawing.PointF ([single](31 * $scale)), ([single](34.5 * $scale)))
    )
    $g.DrawLines($pen, $pt2)

    # Task 2 bar
    $bar2 = New-Object System.Drawing.Drawing2D.GraphicsPath
    $bx2 = 35.0 * $scale
    $by2 = 37.0 * $scale
    $bw2 = 11.0 * $scale
    $bh2 = 4.0 * $scale
    $br2 = 2.0 * $scale
    $bd2 = $br2 * 2.0
    $bar2.AddArc([single]$bx2, [single]$by2, [single]$bd2, [single]$bd2, [single]180, [single]90)
    $bar2.AddArc([single]($bx2 + $bw2 - $bd2), [single]$by2, [single]$bd2, [single]$bd2, [single]270, [single]90)
    $bar2.AddArc([single]($bx2 + $bw2 - $bd2), [single]($by2 + $bh2 - $bd2), [single]$bd2, [single]$bd2, [single]0, [single]90)
    $bar2.AddArc([single]$bx2, [single]($by2 + $bh2 - $bd2), [single]$bd2, [single]$bd2, [single]90, [single]90)
    $bar2.CloseFigure()
    $g.FillPath($barBrush, $bar2)

    $bmp.Save($OutFile, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Saved $OutFile ($Size x $Size)"
}

Generate-FaviconPng -OutFile "Tarefax\favicon.png" -Size 64
Generate-FaviconPng -OutFile "Tarefax\favicon-32.png" -Size 32
Generate-FaviconPng -OutFile "favicon.png" -Size 64
