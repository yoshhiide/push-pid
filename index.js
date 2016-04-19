'use strict';

const fs = require('fs');


const pushPid = (appName, path, options) => {
  if (!appName || !path) {
    try {
      throw new Error();
    } catch(err) {
      console.log('[Error] push-pid not enough arguments:\n' + err.stack);
      return;
    }
  }

  const savePath = `${path}/${appName}.json`;

  Promise.all([
    statMkdir(path),
    createData(appName, options)
  ])
    .then((data) => toJSON(data[1]))
    .then((json) => writeJSON(savePath, json))
    .catch((err) => console.log(err));
};

const statMkdir = (path) => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err) => {
      if (err) {
        return mkdir(path)
          .then(()     => resolve(true))
          .catch((err) => reject(false));
      }

      resolve(true);
    })
  });
};

const mkdir = (path) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, (err) => {
      if (err) {
        return reject(err);
      }

      resolve(true);
    });
  });
};

const createData = (appName, options) => {
  return new Promise((resolve, reject) => {
    const defaults = {
      pid    : process.pid,
      date   : new Date(),
      appName
    };

    const creates = Object.assign({}, defaults, options);
    resolve(creates);
  });
};

const toJSON = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const json = JSON.stringify(data);
      resolve(json);
    } catch(err) {
      reject(err);
    }
  });
};

const writeJSON = (savePath, json) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(savePath, json, (err) => {
      if (err) {
        return reject(err);
      }

      resolve(true);
    })
  });
};


module.exports = pushPid;
