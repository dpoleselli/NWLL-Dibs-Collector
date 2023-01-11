import { DOWNLOAD_PATH } from '../constants';
import { downloadCsv } from './download-csv';
import { login } from './login';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer';

export const downloadDibsData = async () => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });

  console.log('Creating a new page..');
  const page = await browser.newPage();

  console.log('Attempting to login...');
  await login(page);
  console.log('Login successful');

  console.log('Attempting to download data...');
  await downloadCsv(page);
  console.log(`Data download successful. Downloaded in ${DOWNLOAD_PATH}/`);

  await browser.close();
};
