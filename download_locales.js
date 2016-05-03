var http = require('http');
var path = require('path');
var fs = require('fs');

var projectName = 'webapp-customer-registration';
var locales = ['en-GB', 'sv-SE', 'da-DK', 'no-NB', 'fi-FI'];

locales.forEach(function(locale){

  var fileName = path.join('src', 'l10n', 'phrase.' + locale + '.json');
  var file = fs.createWriteStream(fileName);
  var url = 'http://nodejs.dev.nordnet.se:4000/api/translations/' + projectName + '/' + locale;

  console.log('Save translation from', url, 'to', fileName);
  var request = http.get(url, function(response) {
    if (response.statusCode !== 200) {
      console.log("HTTP ERROR:", response.statusCode)
    }

    response.pipe(file);
  });
});