const express = require('express');

const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
    // http://localhost:5000/loadSettings?settingsFilePath=settingsFilePath
    //console.log(req.query.settingsFilePath);
    const settingsFilePath = req.query.settingsFilePath
    try {

        if (settingsFilePath.endsWith('.ps1')) {           
            //console.log(1) 
            const settings = fs.readFileSync(settingsFilePath, 'utf8');
            //console.log(settings)
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(settings);
        } else {
            var data = fs.readFileSync(settingsFilePath);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        }
    }
    catch (error) {
        // console.log(error);
        res.status(500);
        res.send(`Error while reading file: ${error}`);
        return;
    }
});

module.exports = router;
