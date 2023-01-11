/* eslint-disable @typescript-eslint/ban-ts-comment */

import { DIBS_PASSWORD, DIBS_USERNAME, LOGIN_URL } from '../constants';
import { Page } from 'puppeteer';

export const login = async (page: Page) => {
  await page.goto(LOGIN_URL);

  await page.type('#user_login', DIBS_USERNAME);

  await page.click('input[type=submit]');

  // @ts-ignore
  await page.waitForSelector('#user_password');

  await page.type('#user_password', DIBS_PASSWORD);

  await page.click('input[type=submit]');
};
