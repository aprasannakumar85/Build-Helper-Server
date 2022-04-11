

const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
require('dotenv').config();


const app = express();
app.use(bodyParser.json());
app.use(cors())
  
// import routes
const loadDirectoriesRoute = require('./routes/loadDirectories');
const executeDotNetApiRoute = require('./routes/executeNetAPI');
const clearTempFilesRoute = require('./routes/deleteTempFiles');
const loadSettingsRoute = require('./routes/loadSettingsJSON');
const updateSettingsRoute = require('./routes/updateSettings');
const killAPIprocessRoute = require('./routes/killAPIprocess');
const killAllProcessRoute = require('./routes/killAllProcess');
const executePowerShellRoute = require('./routes/executePowerShell');
const loadFilesRoute = require('./routes/loadFiles');

app.use('/loadDirectories', loadDirectoriesRoute);
app.use('/executeApi', executeDotNetApiRoute);
app.use('/clearTempFiles', clearTempFilesRoute);
app.use('/loadSettings', loadSettingsRoute);
app.use('/updateSettings', updateSettingsRoute);
app.use('/killAPIprocess', killAPIprocessRoute);
app.use('/killAllProcess', killAllProcessRoute);
app.use('/executePowerShell', executePowerShellRoute);
app.use('/loadFiles', loadFilesRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`file server running on port ${PORT}`));
