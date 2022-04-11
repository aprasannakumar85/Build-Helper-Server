const express = require('express');
const uuid = require('short-uuid');
var fs = require('fs');

const router = express.Router();

router.post('/', (req, res, next) => {
    // http://localhost:5000/executeApi
    // console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    if (!checkFileExist(res, req.body.msBuildPath)) {
        return;
    }
    if (!checkFileExist(res, req.body.slnPath)) {
        return;
    }
    try {
        //console.log(req.body);
        fs.access(req.body.projDir, function (error) {
            if (error) {
                const err = `'Unable to find directory: ${error}`;
                //console.log(err);
                res.status(400);
                res.end(err);
                return;
            } else {
                var fileName = readWriteSync(req.body.msBuildPath, req.body.slnPath, req.body.projDir);
                var spawn = require("child_process").spawn, child;
                child = spawn("powershell.exe", [`${process.cwd()}\\${fileName}`]);
                child.stdout.on("data", function (data) {
                    var consoleData = `${data}`;
                    console.log(consoleData);
                    //var outputData = `Build was Successful and API is running`;
                    next(consoleData)
                });
                child.stderr.on("data", function (data) {
                    var consoleData = `Powershell Errors: ${data}`;
                    next(consoleData)
                    console.log(consoleData);
                });
                child.on("exit", function () {
                    var consoleData = "Powershell Script finished";
                    console.log(consoleData);
                    next(consoleData)
                });
                child.stdin.end(); //end input
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500);
        res.end(error);
    }
});

function checkFileExist(res, path) {
    if (fs.existsSync(path)) {
        //file exists
    }
    else {
        const error = `'Unable to find file: ${path}`;
        res.status(400);
        res.send(error);
        //console.log(path);
        return false;
    }
    return true;
}

function readWriteSync(msBuildPath, slnPath, projDir) {
    var data = fs.readFileSync('dotNetBuild.ps1', 'utf-8');

    var newValue = data.replace(/tempMsBuildPath/gim, msBuildPath);
    newValue = newValue.replace(/tempSlnPath/gim, slnPath);
    newValue = newValue.replace(/tempProjDir/gim, projDir);

    var fileName = `temp${uuid.generate()}.ps1`;
    fs.writeFileSync(fileName, newValue, 'utf-8');

    //console.log('dotNetBuild update complete');
    return fileName;
}

module.exports = router;