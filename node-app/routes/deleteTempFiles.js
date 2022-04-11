const glob = require("glob");
const express = require('express');

var fs = require('fs');

const router = express.Router();

glob("temp*.ps1", null, function (er, files) {
    for (const file of files) {
        //console.log(file);
         // remove file
         fs.unlink(file, (err) => {
            if (err) {
              console.error(err)
              return
            }          
            //file removed
          })
    }
})

module.exports = router;
