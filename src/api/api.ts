import { type ApisauceInstance, create, type ApiResponse } from 'apisauce'
import { getGeneralApiProblem } from './api-problem'
import { type ApiConfig, DEFAULT_API_CONFIG } from './api-config'

import type { User } from '@/types'
import { getAccessToken } from '../services/accessTokenHelper'

import { requestsCallbackMonitor } from './monitorAxiosReq'
import type { Worker } from '@/types'
import type { Provider } from '@/types'
/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    })
    this.apisauce.addMonitor(requestsCallbackMonitor)
  }

  /**
   * Gets a list of repos.
   */

  // auth with providers

  async login(email: string, password: string) {
    const response = await this.apisauce.post(
      '/auth/login',
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
    return response
  }
  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    const response: any = await this.apisauce.post(
      '/auth/register',
      {
        firstName,
        lastName,
        email,
        password
      },
      { headers: { 'Content-Type': 'application/json' }, timeout: 5000 }
    )

    if (response?.data?.status >= 400) throw new Error(response?.data.message)
    return response
  }

  async signInWithGoogle(
    idToken: string,
    access_token: string,
    timezone: string
  ) {
    const response = await this.apisauce.post(
      '/auth/google',
      {
        idToken,
        access_token,
        timezone
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return response
  }

  // workers
  async addWorker(data: any) {
    const accessToken = getAccessToken()

    const response = await this.apisauce.post('/workers', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response.data
  }

  async getMaxMindData(ip: string) {
    const accessToken = getAccessToken()

    const response = await this.apisauce.get(
      `/workers/maxmind/${ip}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    return response.data
  }

  async getBigData(ip: string) {
    const accessToken = getAccessToken()

    const response = await this.apisauce.get(
      `/workers/bigdata/${ip}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    return response.data
  }

  async getWorkers(searchText: string) {
    const accessToken = getAccessToken()
    const response = await this.apisauce.get(
      '/workers',
      { search: searchText },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    return response.ok ? response.data : []
  }

  async updateWorker(data: Worker, id: string) {
    const accessToken = getAccessToken()

    const response = await this.apisauce.patch(`/workers/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.data
  }

  async deleteWorker(id: string) {
    const accessToken = getAccessToken()
    await this.apisauce.delete(
      `/workers/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
  }

  //////

  // providers

  async getProviders(searchText: string = '') {
    const accessToken = getAccessToken()

    const response = await this.apisauce.get(
      '/providers',
      { search: searchText },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)

      if (problem) throw problem
    }

    return response.data
  }

  async getAllLocations(data: object) {
    const accessToken = getAccessToken()

    const response = await this.apisauce.get(`/locations`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)

      if (problem) throw problem
    }

    try {
      return response.data
    } catch {
      return { kind: 'bad-data' }
    }
  }

  async getProviderLocations(id: number) {
    const accessToken = getAccessToken()

    const response = await this.apisauce.get(
      `/providers/${id}/locations`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    return response.data
  }
  async deleteProviderLocation(providerId: string, locationId: number) {
    const accessToken = getAccessToken()

    const response = await this.apisauce.delete(
      `/providers/${providerId}/locations/${locationId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)

      if (problem) throw problem
    }
  }

  async addProviderLocation(
    providerId: number,
    data: {
      continent: string
      country: string
      city: string

      dataCenter: string
    }
  ) {
    const accessToken = getAccessToken()

    const response = await this.apisauce.post(
      `/providers/${providerId}/locations`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return response.data
  }

  async addProvider(data: Provider) {
    // test
    const accessToken = getAccessToken()

    const response = await this.apisauce.post('/providers', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return response.data
  }

  async updateProvider(data: Provider, id: string) {
    const accessToken = getAccessToken()
    const response = await this.apisauce.patch(`/providers/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    return response.data
  }

  async deleteProvider(id: string) {
    const accessToken = getAccessToken()

    const response = await this.apisauce.delete(
      `/providers/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    return response.data
  }

  ////

  // blackLists

  async getBlackLists(searchText: string = '') {
    const accessToken = getAccessToken()

    const response = await this.apisauce.get(
      '/blacklists',
      { search: searchText },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    return response.data
  }

  async addBlackList(data: Provider) {
    // test
    const accessToken = getAccessToken()

    const response = await this.apisauce.post('/blacklists', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return response.data
  }

  async updateBlackList(data: Provider, id: string) {
    const accessToken = getAccessToken()
    const response = await this.apisauce.patch(`/blacklists/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    return response.data
  }

  async deleteBlackList(id: string) {
    const accessToken = getAccessToken()

    const response = await this.apisauce.delete(`/blacklists/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    return response.data
  }

  ////

  // users

  async getUsers(searchText: string) {
    const accessToken = getAccessToken()

    const response = await this.apisauce.get(
      '/users',
      { search: searchText },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    return response.data
  }
  async updateUser(data: User, id: string) {
    const accessToken = getAccessToken()

    const response = await this.apisauce.patch(`/users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return response.data
  }
}
