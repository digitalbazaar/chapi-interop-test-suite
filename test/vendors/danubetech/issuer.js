'use strict';

const constants = require('./constants');
const helpers = require('./helpers');

const FLOW_URLS = constants.urls;

/*************************** Public API ******************************/

exports.getUrl = async ({key}) => {
  const urls = FLOW_URLS.get(key);
  if(!(urls && urls.issuer)) {
    throw new Error(`No URL found for ${key}`);
  }
  return urls.issuer;
};

exports.setup = async ctx => {
  await helpers.pickupVaxCert(ctx);
};

exports.authenticate = async ctx => {
  await helpers.loginToMyUSCIS(ctx);
  await helpers.clickPresentVaxCert(ctx);
  await helpers.presentVaxCert(ctx);
  const authenticateBtn = await $('button*=Select Wallet');
  await authenticateBtn.waitForClickable();
  await authenticateBtn.click();
};

exports.issue = async () => {
  const receiveCredentialBtn = await $('button*=Receive Credential');
  await receiveCredentialBtn.waitForClickable();
  await receiveCredentialBtn.click();
};

exports.finish = async () => {
  const message = 'Permanent Resident Card successfully issued to your wallet.';
  const successMessage = await $(`div*=${message}`);
  await successMessage.waitForExist();
};

/*************************** Helper functions ******************************/
