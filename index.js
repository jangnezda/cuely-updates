'use strict';
const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const request = require('request');
const isDevelopment = process.env.NODE_ENV === 'development';
const s3BucketUrl = 'https://s3-eu-west-1.amazonaws.com/updates.cuely.co';

var version;
// Fetch manifest info every 5 minutes
const FETCH_INTERVAL = 300000;

app.use(require('morgan')('dev'));

if (isDevelopment) {
  app.use('/releases', express.static(path.join(__dirname, 'releases')));
}

app.get('/updates/latest', (req, res) => {
  if (version) {
    const clientVersion = req.query.v;

    if (clientVersion === version) {
      res.status(204).end();
    } else {
      res.json({
        url: `${getBaseUrl()}/releases/osx/cuely-${version}-osx.zip`
      });
    }
  } else {
    res.status(204).end();
  }
});

let getBaseUrl = () => {
  if (isDevelopment) {
    return 'http://localhost:5123';
  } else {
    return s3BucketUrl;
  }
}

let getLatestRelease = () => {
  const dir = `${__dirname}/releases/osx`;

  const versionsDesc = fs.readdirSync(dir).filter(file => file.endsWith('.zip')).map(file => file.split('-')[1]).reverse();
  return versionsDesc[0];
}

let getVersion = () => {
  if (isDevelopment) {
    version = getLatestRelease();
  } else {
    console.log(`Fetching latest version from ${versionUrl}`);
    request.get(versionUrl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        version = body;
      }
      else if (error) {
        console.error(error);
      }
    });
  }

  console.log("Latest version is:", version);
  setTimeout(getVersion, FETCH_INTERVAL);
}

const versionUrl = `${getBaseUrl()}/releases/osx/VERSION`;
getVersion();

app.listen(process.env.PORT, () => {
    console.log(`Express server listening on port ${process.env.PORT}`);
});
