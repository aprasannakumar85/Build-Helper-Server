$msBuildPath = "tempMsBuildPath" # we can't use the command "dotnet build" as it supports only .NET Core

$slnPath = "tempSlnPath"

$appDir = "tempProjDir"

# Cleaning the VLD solution
$timing = Measure-Command { cmd.exe /c $msBuildPath /target:Clean $slnPath /m /nr:false } | Select-Object -Property TotalSeconds

[string] $fullBuildOutput = (cmd.exe /c $msBuildPath /target:Build $slnPath /m /nr:false) | Out-String

# Check if no error
if($LastExitCode -eq 0){
    Write-Host "`nBuild was Successful! API will start momentarily, please start working.."
}
else {
    Write-Host "`nBuild Failed! Please check from Visual Studio..."
    return
}

Set-Location -Path $appDir 

dotnet run
