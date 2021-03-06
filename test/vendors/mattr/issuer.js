'use strict';

const constants = require('./constants');

const FLOW_URLS = constants.urls;

/*************************** Public API ******************************/

exports.getUrl = async ({key}) => {
  const urls = FLOW_URLS.get(key);
  if(!(urls && urls.issuer)) {
    throw new Error(`No URL found for ${key}`);
  }
  return urls.issuer;
};

exports.authenticate = async () => {
  const authenticateBtn = await $('button=Authenticate');
  await authenticateBtn.waitForClickable();
  await authenticateBtn.click();
};

exports.issue = async ({key}) => {
  if(key === '2021-03-15-svip-vaxcert') {
    const issueCredentialBtn = await $('button=Issue Credential');
    await issueCredentialBtn.waitForClickable();
    await issueCredentialBtn.click();
  }
};

exports.finish = async () => {
  const successMessage = await $('h1*=Vaccination Credential Issued');
  await successMessage.waitForExist();
};

/*************************** Helper functions ******************************/
