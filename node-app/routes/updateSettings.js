const express = require('express');

const fs = require('fs');
const { stringify } = require('querystring');

const router = express.Router();

router.post('/', (req, res) => {
    //console.log('1');
    // http://localhost:5000/updateSettings?filePath=Source  
    //console.log(req.body);
    var filePath = req.query.filePath.toString();
    var fileContents = req.body;
    //console.log(fileContents);
    res.setHeader('Content-Type', 'application/json');
    if (!checkFileExist(res, filePath)) {
        return;
    }
    try {
        fs.writeFileSync(filePath, JSON.stringify(fileContents), 'utf-8');
        res.end(JSON.stringify('success'));
    }
    catch (error) {        
        console.log(error);
        res.status(500);
        res.send(`Error while updating file: ${error}`);
        return;
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

module.exports = router;