'use strict';

const pushPid = require('push-pid');

const pidPath = '../jsons';
const appName = 'test';
const options = {
  log: '/home/develop/push-pid-project/example.log'
};

pushPid(appName, pidPath, options);
