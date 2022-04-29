import { defineStore } from 'pinia'
import type { Provider } from '@/types'
import {
  addProvider,
  getProviders,
  getProviderLocations,
  getAllLocations,
  addProviderLocation,
  updateProvider,
  deleteProvider,
  deleteProviderLocation
} from '@/services/providers'

interface Location {
  continent?: Array<string>
  country?: Array<string>
  city?: Array<string>
  dataCenter?: Array<string>
}

export const useProvidersStore = defineStore({
  id: 'providers',

  state: () => {
    return <
      {
        providers: Provider[]
        user: any
        locations: Location
        errorMsg: any
      }
    >{
      providers: [],
      user: null,
      locations: {
        continent: [],
        country: [],
        city: [],
        dataCenter: []
      },
      errorMsg: null
    }
  },

  persist: true,

  getters: {},

  actions: {
    resetErrorMsg() {
      this.errorMsg = null
    },
    async addProvider(payload: Provider) {
      try {
        const newProvider = await addProvider(payload)
        this.providers.push(newProvider)

        return newProvider
      } catch (e) {
        this.errorMsg = 'Something occurred. Please try later.'
      }
    },

    async deleteProvider(id: string) {
      try {
        await deleteProvider(id)
        const index = this.providers.findIndex((p) => p.id === id)
        this.providers.splice(index, 1)
      } catch (e) {
        this.errorMsg = 'Something occurred. Please try later.'
      }
    },

    async updateProvider(payload: Provider, id: string) {
      try {
        const updatedProvider = await updateProvider(payload, id)
        const index = this.providers.findIndex(
          (p) => p.id === updatedProvider.id
        )
        if (index !== -1) {
          this.providers[index] = updatedProvider
        }
      } catch (e) {
        this.errorMsg = 'Something occurred. Please try later.'
      }
    },

    async getProviders(search: string) {
      try {
        this.providers = await getProviders(search)
      } catch (e) {
        this.errorMsg = 'Something occurred. Please try later.'
      }
    },

    async getAllLocations(options: Location) {
      try {
        this.locations = await getAllLocations(options)
      } catch (e) {
        this.errorMsg = 'Something occurred. Please try later.'
      }
    },

    async getProviderLocationsById(id: number) {
      try {
        return await getProviderLocations(id)
      } catch (e) {
        this.errorMsg = 'Something occurred. Please try later.'
      }
    },

    async addProviderLocation(
      providerId: number,
      data: {
        continent: string
        country: string
        city: string
        dataCenter: string
      }
    ) {
      try {
        const newProviderLocation = await addProviderLocation(providerId, data)

        return newProviderLocation
      } catch (e) {
        this.errorMsg = 'Something occurred. Please try later.'
      }
    },

    async deleteProviderLocation(providerId: string, locationId: number) {
      try {
        await deleteProviderLocation(providerId, locationId)
      } catch (e) {
        this.errorMsg = e.message
      }
    }
  }
})
