import { apiInstance } from '@/config/api'

const importsEnvs = import.meta.env
const clientID = importsEnvs.VITE_APP_CLIENT_ID

const initGoogleAuth = async () => {
  const { gapi } = window
  const config = {
    client_id: clientID,
    scope: 'profile email', //email profile openid
    fetch_basic_profile: true,
    response_type: 'id_token permission'
  }

  // init gapi
  await new Promise((resolve, reject) => {
    gapi.load('auth2', resolve)
  })

  // authenticate
  const response: any = await new Promise((resolve, reject) => {
    gapi.auth2.authorize(config, resolve)
  })

  return response
}

async function signIn(idToken: string, access_token: string) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const response: any = await apiInstance.signInWithGoogle(
    idToken,
    access_token,
    timezone
  )
  return response
}

export { signIn, initGoogleAuth }
