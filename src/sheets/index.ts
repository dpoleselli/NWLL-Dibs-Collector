import { getDownloadedData } from './get-downloaded-data';
import { uploadDataToGoogleSheets } from './upload-data-to-google-sheets';

export const saveDataToGoogle = async () => {
  console.log('Parsing downloaded data...');
  const results = getDownloadedData();

  console.log('Uploading data to Google Sheet...');
  await uploadDataToGoogleSheets(results);
};
