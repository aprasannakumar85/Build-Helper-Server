const path = require('path');
const fs = require('fs');

class LoadDirectories {    

    loadDirectories(repoDir) {
        const directoryPath = path.join(repoDir);
        return fs.readdir(directoryPath, function (err, files)  {
            //handling error
            if (err) {
                return console.log('Unable to find directory: ' + err);
            }
            //return all files 
            return files;
        });
    }    
}

module.exports = LoadDirectories;