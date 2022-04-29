import { defineStore } from 'pinia'
import router from '@/router'
import { register, login } from '@/services/auth'
import { initGoogleAuth, signIn } from '@/services/authWithProviders/google'

export const useAuth = defineStore({
  id: 'auth',

  state: () => {
    return <
      {
        user: any
        token: null | string
        error: null | string
        pendding: boolean
      }
    >{
      user: null,
      token: null,
      error: null,
      pendding: false
    }
  },

  persist: true,

  getters: {
    isLoggedIn: (state) => state.user !== null,
    userRole: (state) => (state.user?.role ? state.user.role : null),
    getAuthToken: (state) => (state.token ? state.token : null)
  },

  actions: {
    async signIn(email: string, password: string) {
      try {
        this.pendding = true
        const response = await login(email, password)

        this.user = response.data.user
        this.token = response.data.access_token
        this.error = null
        sessionStorage.setItem('access_token', response.data.access_token)
        this.pendding = false
        router.push('/app')
      } catch (err: any) {
        this.pendding = false
        if (
          err.response?.data?.message &&
          err.response?.data?.statusCode === 401
        ) {
          this.error = 'Invalid email or password'

          return
        }
        if (err.response?.data?.statusCode === 500) {
          this.error = 'A error has occured , please try again later'
        } else if (err.message) {
          this.error = err.message

          return
        } else {
          this.error = 'An error has occured , please try again later'
        }
      }
    },

    async signInGoogle() {
      let googleResponse
      try {
        this.pendding = true
        googleResponse = await initGoogleAuth()
      } catch (e: any) {
        // handle error
        this.pendding = false
        this.error = e.message
        return
      }

      try {
        const response: any = await signIn(
          googleResponse.id_token,
          googleResponse.access_token
        )
        sessionStorage.setItem('access_token', response.data.access_token)
        this.user = response.data.user
        this.token = response.data.access_token
        this.error = null
        sessionStorage.setItem('access_token', response.data.access_token)

        if (this.user) router.push('/app')
        this.pendding = false
      } catch (e) {
        this.pendding = false
        // handle API error
        this.error = ' Could not sign in please try again later'
      }
    },

    async signUp({
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
    }) {
      try {
        this.pendding = true
        const response = await register({
          email,
          password,
          firstName,
          lastName,
          timezone
        })

        this.user = response.data.user
        this.token = response.data.access_token
        this.error = null
        sessionStorage.setItem('access_token', response.data.access_token)
        this.pendding = false
        router.push('/app')
      } catch (err: any) {
        this.pendding = false
        if (err.response.data.statusCode === 500) {
          this.error = 'A error has occured , please try again later'
          return
        } else if (err.message) {
          this.error = err.message
          return
        } else if (err.request) {
          this.error = err.request.statusText
          return
        } else {
          this.error = 'An error has occured , please try again later'
        }
      }
    },
    async signOut() {
      this.user = null
      this.token = null
      this.error = null
      sessionStorage.removeItem('access_token')
      router.push('/login')
    }
  }
})
