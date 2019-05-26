const chai = require('chai');
const sinon = require('sinon');
Object.assign(global, chai);
global.sandbox = sinon.createSandbox();