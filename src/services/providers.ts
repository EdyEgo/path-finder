import type { Provider } from '@/types'

import { apiInstance } from '@/config/api'

async function getProviders(searchText: string = '') {
  const response = await apiInstance.getProviders(searchText)
  return response
}
async function getProviderLocations(id: number) {
  const response = await apiInstance.getProviderLocations(id)
  return response
}

async function getAllLocations(data: object) {
  const response = await apiInstance.getAllLocations(data)
  return response
}

async function addProvider(data: any) {
  const response = await apiInstance.addProvider(data)

  return providerConverter.fromApi(response)
}

async function updateProvider(data: any, id: string) {
  const response = await apiInstance.updateProvider(data, id)
  return providerConverter.fromApi(response)
}

async function deleteProvider(id: string) {
  await apiInstance.deleteProvider(id)
}

async function deleteProviderLocation(providerId: string, locationId: number) {
  await apiInstance.deleteProviderLocation(providerId, locationId)
}
async function addProviderLocation(
  providerId: number,
  data: {
    continent: string
    country: string
    city: string
    dataCenter: string
  }
) {
  return await apiInstance.addProviderLocation(providerId, data)
}

const providerConverter = {
  toApi: (provider: Provider) => {
    return {
      id: provider.id,
      name: provider.name,
      site: provider.site
    }
  },
  fromApi: (item: any) => {
    return {
      id: item.id,
      name: item.name,
      site: item.site
    }
  }
}

export {
  getProviders,
  getProviderLocations,
  getAllLocations,
  addProvider,
  addProviderLocation,
  updateProvider,
  deleteProvider,
  deleteProviderLocation
}
