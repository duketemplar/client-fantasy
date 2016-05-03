var http = require('http');
var fs = require('fs');
var path = require('path');
http.post = require('http-post');

var projectName = 'webapp-customer-registration';

var files = fs.readdirSync(path.join('src', 'l10n'));
console.log(files);

files.forEach(function(fileName) {
  var fileContent = fs.readFileSync(path.join('src', 'l10n', fileName), 'utf8');

  var url = 'http://nodejs.dev.nordnet.se:4000/api/translations/' + projectName + '/status/dev/' + fileName;
  var request = http.post(url, {translations: fileContent}, function(response) {
    console.log(fileName, response.statusCode);
    if (response.statusCode !== 200) {
      response.on("data", function(chunk) {
        console.log(chunk.toString());
      });
    }
  });
});
