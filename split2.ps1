try {
    $lines = Get-Content -Path "index.html" -Encoding UTF8
    $css = $lines[24..330]
    $js = $lines[431..886]
    
    $css | Set-Content -Path "styles.css" -Encoding UTF8
    $js | Set-Content -Path "script.js" -Encoding UTF8
    
    $newHtml = @()
    $newHtml += $lines[0..22]
    $newHtml += "    <link rel=`"stylesheet`" href=`"styles.css`">"
    $newHtml += $lines[331..429]
    $newHtml += "    <script src=`"script.js`"></script>"
    $newHtml += $lines[887..($lines.Count - 1)]
    
    $newHtml | Set-Content -Path "index.html" -Encoding UTF8
    Write-Output "Success"
}
catch {
    Write-Output "Error: $_"
}
