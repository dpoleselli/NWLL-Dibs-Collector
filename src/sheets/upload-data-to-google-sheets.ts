import { DibsData } from '../dibs-data.interface';
import {
  GOOGLE_PRIVATE_KEY,
  GOOGLE_SA_EMAIL,
  GOOGLE_SPREADSHEET_ID,
} from '../constants';
import { GoogleSpreadsheet } from 'google-spreadsheet';

export const uploadDataToGoogleSheets = async (results: DibsData[]) => {
  if (!results?.length) {
    console.log('No data to save');
    return;
  }

  const doc = new GoogleSpreadsheet(GOOGLE_SPREADSHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: GOOGLE_SA_EMAIL,
    private_key: GOOGLE_PRIVATE_KEY,
  });

  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];

  const dataHeaders = Object.keys(results[0]);

  await sheet.loadCells();

  if (sheet.cellStats.nonEmpty === 0) {
    console.log('Setting new headers on blank sheet');
    await sheet.setHeaderRow(dataHeaders);
  } else {
    await sheet.loadHeaderRow();
  }

  await sheet.clear(`A2:${String.fromCharCode(dataHeaders.length + 64)}9999`);

  await sheet.addRows(results as unknown as Record<string, string>[]);
};
