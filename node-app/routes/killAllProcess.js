const express = require('express');

const router = express.Router();

router.post('/', (req, res, next) => {
    // http://localhost:5000/killAllProcess?processName=
    // console.log(req.body);
    const processName = req.query.processName.toString();
    try {
        var spawn = require("child_process").spawn, child;
        child = spawn("powershell.exe", [`taskkill /f /t /im ${processName}`]);
        child.stdout.on("data", function (data) {
            console.log("Powershell Data: " + data);
            next('terminated the process');
        });
        child.stderr.on("data", function (data) {
            var consoleData = `Powershell Errors: ${data}`;
            next(consoleData)
            console.log(consoleData);
        });
        child.on("exit", function () {
            var consoleData = "Powershell Script finished";
            console.log(consoleData);
            next('terminated the process')
        });
        child.stdin.end(); //end input
    }
    catch (error) {
        console.log(error);
        res.status(500);
        res.end(error);
        return;
    }
});


module.exports = router;
