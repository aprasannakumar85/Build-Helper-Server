const express = require('express');

const router = express.Router();

router.post('/', (req, res, next) => {
    // http://localhost:5000/killAPIprocess?processNumber=
     console.log(req.body);
    const processNumber = req.query.processNumber.toString();
    try {
        var spawn = require("child_process").spawn, child;
        child = spawn("powershell.exe", [`kill -Id (Get-NetTCPConnection -LocalPort ${processNumber}).OwningProcess[0]`]);
        child.stdout.on("data", function (data) {
            //console.log("Powershell Data: " + data);
            next('terminated the process');
        });
        child.stderr.on("data", function (data) {
            var consoleData = `Powershell Errors: ${data}`;
            next(consoleData)
            console.log(consoleData);
        });
        child.on("exit", function () {
            var consoleData = "Powershell Script finished";
            //console.log(consoleData);
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
