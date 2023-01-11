export const LOGIN_URL = 'https://user.sportngin.com/users/sign_in?user_return_to=https%3A%2F%2Flogin.sportngin.com%2Fcheck_login%3Fnext_url%3Dhttps%3A%2F%2Fwww.nwllbaseball.com%2Fdib_sessions'

export const USERNAME = process.env.DIBS_USERNAME as string
export const PASSWORD = process.env.DIBS_PASSWORD as string

export const DOWNLOAD_PATH = 'tmp'

if(!USERNAME || !PASSWORD){
    throw new Error("Please set DIBS_USERNAME and DIBS_PASSWORD environment variables")
}