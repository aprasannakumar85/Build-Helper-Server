const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
    //console.log(req.query.sourcePath);
    // http://localhost:5000/loadDirectories?sourcePath=Source
    //const drive = req.query.drive;
    const path = req.query.sourcePath.toString();
    //console.log(path);
    fs.access(path, function (error) {
        if (error) {
            const err = `'Unable to find directory: ${error}`;
            //console.log(err);
            res.status(400);
            res.end(err);
            return;
        } else {
            getDirectories(`${path}`, function (err, result) {
                if (err) {
                    const error = `'Unable to find directory: ${err}`;
                    //console.log(err);
                    res.status(400);
                    res.end(error);
                    return;
                }
                //console.log(result);
                try {
                    jsonResult = getJson(result, `${path}`);
                }
                catch (error) {
                    //console.log(error);
                    res.status(500);
                    res.end(error);
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(jsonResult));
            });
        }
    })
});

function getDirectories(path, callback) {
    fs.readdir(path, function (err, content) {
        if (err) return callback(err);
        callback(null, content)
    })
}

function getJson(inputObj) {
    var title = [];
    for (var i = 0; i < inputObj.length; i++) {
        title[i] = {
            "key": i + 1,
            "path": `${inputObj[i]}`,
            "selected": false
        };
    }
    // console.log(title);
    return title;
}

module.exports = router;