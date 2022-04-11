const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
  // http://localhost:5000/loadFiles?sourcePath=Source&extension=*.ps1
  //console.log(req.query.extension)
  const filter = req.query.extension.toString();
  const path = req.query.sourcePath.toString();
  fs.access(path, function (error) {
    if (error) {
      const err = `'Unable to find directory: ${error}`;
      //console.log(err);
      res.status(400);
      res.end(err);
      return;
    } else {
      var files = [];
      getAllFiles(path, filter)
        .then(data => {
          //console.log(data)
          for (var i = 0; i < data.length; i++) {
            if (data[i].indexOf(filter) >= 0) {
              files[i] = {
                "key": i + 1,
                "path": data[i],
                "selected": false
              }
            }
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(files.filter(n => n)));
        })
        .catch(err => console.log(err))
    }
  });
});

const getAllFiles = (path, filter) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, data) => {
      if (err) {
        reject(err)  // calling `reject` will cause the promise to fail with or without the error passed as an argument
        return        // and we don't want to go any further
      }
      resolve(data)
    })
  })
}

module.exports = router;