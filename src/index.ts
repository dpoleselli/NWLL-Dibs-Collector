/* eslint-disable @typescript-eslint/ban-ts-comment */

import { downloadDibsData } from './download-data';
import { saveDataToGoogle } from './sheets';

export const handler = async () => {
  console.log('Downloading data from nwllbaseball.com...');
  await downloadDibsData();

  console.log('Saving data to Google...');
  await saveDataToGoogle();
};
