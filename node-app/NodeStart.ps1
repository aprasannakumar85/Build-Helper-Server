$scriptPath = split-path -parent $MyInvocation.MyCommand.Definition

Write-Host "Changing to source directory"
Set-Location -Path $scriptPath 

if (Test-Path -Path "$($scriptPath)\node_modules") {
    Write-Host 'node_modules exists'
    npm start dev
} else {
    Write-Host 'node_modules does not exists'
    npm install
    npm start dev
}