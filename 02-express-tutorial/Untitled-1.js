const fs = require('fs');
const path = require('path');

fs.writeFileSync(path.join(__dirname, '/name.txt'), 'This is a new test file for today', function(err){if(err){console.log(err);return}});

fs.appendFileSync(path.join(__dirname, '/name.txt'), 'My name is Noah Santos', function(err){if(err){console.log(err);return}});

fs.unlinkSync(path.join(__dirname, '/name.txt'), function(err){if(err){console.log(err);return}});

fs.mkdirSync(path.join(__dirname, '/Santos'));
