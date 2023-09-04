/* eslint-disable @typescript-eslint/ban-ts-comment */

import { DOWNLOAD_PATH } from '../constants';
import { Page } from 'puppeteer';

export const downloadCsv = async (page: Page) => {
  // @ts-ignore
  await page.waitForSelector('#adminNav');

  await page.click('#adminNav a');

  // @ts-ignore
  await page.waitForSelector('#tab_active_edit_mode_content');

  // TODO: figure out which Session(s) to click
  await page.click('a[href="/dib_sessions/show/52405"]');

  // @ts-ignore
  await page.waitForSelector('#start_date_day');

  await page.click('#end_date_day', { clickCount: 3 });

  await page.type('#end_date_day', '12/01/2023');

  // NOTE: end_date needs to be first so the calendar dropdown isn't in the way of clicking end_date after start_date
  await page.click('#start_date_day', { clickCount: 3 });

  await page.type('#start_date_day', '08/01/2023');

  await page.click('.filter-button a');

  // wait for the filtering
  await new Promise((r) => setTimeout(r, 1000));

  // @ts-ignore -- this is not publically stable but it works for now
  await page._client().send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: DOWNLOAD_PATH,
  });

  await page.click('#export_dibs');

  // wait for the download
  await new Promise((r) => setTimeout(r, 2500));
};
