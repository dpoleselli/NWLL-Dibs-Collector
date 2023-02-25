// TODO: use Parameter Store for all of these

export const LOGIN_URL =
  'https://user.sportngin.com/users/sign_in?user_return_to=https%3A%2F%2Flogin.sportngin.com%2Fcheck_login%3Fnext_url%3Dhttps%3A%2F%2Fwww.nwllbaseball.com%2Fdib_sessions';

export const DIBS_USERNAME = process.env.DIBS_USERNAME as string;
export const DIBS_PASSWORD = process.env.DIBS_PASSWORD as string;

const inAwsLambda =
  process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.AWS_EXECUTION_ENV;
export const DOWNLOAD_PATH = inAwsLambda ? '/tmp/nwllDownloads' : 'tmp';

if (!DIBS_USERNAME || !DIBS_PASSWORD) {
  throw new Error(
    'Please set DIBS_USERNAME and DIBS_PASSWORD environment variables'
  );
}

export const GOOGLE_SPREADSHEET_ID =
  '1PZ6McK-Xc_RwyIgZZezyERSoBVppZAuaNae6HFBpGfE';

export const GOOGLE_SA_EMAIL = process.env.GOOGLE_SA_EMAIL as string;
export const GOOGLE_PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY as string)
  .split(String.raw`\n`)
  .join('\n');

if (!GOOGLE_SA_EMAIL || !GOOGLE_PRIVATE_KEY) {
  throw new Error(
    'Please set GOOGLE_SA_EMAIL and GOOGLE_PRIVATE_KEY environment variables'
  );
}
