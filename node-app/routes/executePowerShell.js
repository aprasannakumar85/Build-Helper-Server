const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.text());

router.post('/', (req, res, next) => {
    // http://localhost:5000/executePowerShell
    //console.log(req.body);
    try {
        var spawn = require("child_process").spawn, child;
        child = spawn("powershell.exe", [`${req.body}`]);
        child.stdout.on("data", function (data) {
            //console.log("Powershell Data: " + data);
            next("Wait, do you smell something burning? It is just the powershell script that is still running in the background.");
            //next(data);
        });
        child.stderr.on("data", function (data) {
            var consoleData = `Powershell Errors: ${data}`;
            next(consoleData)
            //console.log(consoleData);
        });
        child.on("exit", function () {
            var consoleData = "Powershell Script ran";
            //console.log(consoleData);
            next(consoleData)
        });
        child.stdin.end(); //end input
    } catch (error) {
        console.log(error);
        res.status(500);
        res.end(error);
        return;
    }
});

module.exports = router;
