import axios from 'axios'

const URL = import.meta.env.VITE_APP_API_ENDPOINT

async function register({
  email,
  firstName,
  lastName,
  password,
  timezone
}: {
  email: string
  password: string
  firstName: string
  lastName: string
  timezone: string
}): Promise<any> {
  return await axios.post(
    `${URL}/auth/register`,
    {
      firstName,
      lastName,
      email,
      password,
      timezone
    },
    { headers: { 'Content-Type': 'application/json' }, timeout: 5000 }
  )
}

async function login(email: string, password: string): Promise<any> {
  return await axios.post(
    `${URL}/auth/login`,
    {
      email,
      password
    },
    {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 5000
    }
  )
}

export { register, login }
