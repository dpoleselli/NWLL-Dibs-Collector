/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DIBS_PASSWORD, DIBS_USERNAME, DOWNLOAD_PATH, LOGIN_URL } from './constants'
import { DibsData } from './dibs-data.interface'
import { camelCase } from 'lodash'
import { createReadStream, readdirSync } from 'fs'
import chromium from '@sparticuz/chromium'
import csv from 'csv-parser'
import puppeteer, { Page } from 'puppeteer'


const login = async (page: Page) => {
    await page.goto(LOGIN_URL);

    await page.type('#user_login', DIBS_USERNAME)

    await page.click('input[type=submit]')

    // @ts-ignore
    await page.waitForSelector('#user_password')

    await page.type('#user_password', DIBS_PASSWORD)

    await page.click('input[type=submit]')
}

const downloadData = async (page: Page) => {
    // @ts-ignore
    await page.waitForSelector('#adminNav')

    await page.click('#adminNav a')

    // @ts-ignore
    await page.waitForSelector('#tab_active_edit_mode_content')

    // TODO: figure out which Session(s) to click
    await page.click('a[href="/dib_sessions/show/48535"]')

    // @ts-ignore
    await page.waitForSelector('#start_date_day')

    await page.click('#start_date_day', {clickCount: 3});

    await page.type('#start_date_day', '08/01/2022')

    await page.click('.filter-button a')

    // wait for the filtering
    await new Promise(r => setTimeout(r, 1000))

    // @ts-ignore -- this is not publically stable but it works for now
    await page._client().send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: DOWNLOAD_PATH
    });

    await page.click('#export_dibs')

    // wait for the download
    await new Promise(r => setTimeout(r, 2500))
}

export const handler = async () => {
    // console.log('Starting execution...')
    // const browser = await puppeteer.launch({
    //     args: chromium.args,
    //     defaultViewport: chromium.defaultViewport,
    //     executablePath: await chromium.executablePath(),
    //     headless: chromium.headless,
    //     ignoreHTTPSErrors: true,
    // });

    // console.log('Creating a new page..')
    // const page = await browser.newPage();

    // console.log('Attempting to login...')
    // await login(page)
    // console.log('Login successful')

    // console.log('Attempting to download data...')
    // await downloadData(page)
    // console.log(`Data download successful. Downloaded in ${DOWNLOAD_PATH}/`)
  
    // await browser.close();

    const results: DibsData[] = []

    readdirSync(DOWNLOAD_PATH).forEach(fileName => {
        console.log(fileName);
      

        createReadStream(`${DOWNLOAD_PATH}/${fileName}`)
        .pipe(csv({mapHeaders: ({ header }) => camelCase(header)}))
        .on('data', (data) => results.push(data))
        .on('end', () => {
            console.log(results);
        });
    });
}