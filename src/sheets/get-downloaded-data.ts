import { DOWNLOAD_PATH } from '../constants';
import { DibsData } from '../dibs-data.interface';
import { camelCase } from 'lodash';
import { createReadStream, readdirSync } from 'fs';
import csv from 'csv-parser';

export const getDownloadedData = (): DibsData[] => {
  const results: DibsData[] = [];

  readdirSync(DOWNLOAD_PATH).forEach((fileName) => {
    createReadStream(`${DOWNLOAD_PATH}/${fileName}`)
      .pipe(csv({ mapHeaders: ({ header }) => camelCase(header) }))
      .on('data', (data) => results.push(data));
  });

  return results;
};
