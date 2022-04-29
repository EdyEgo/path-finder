import type { Worker } from '@/types'

import { apiInstance } from '@/config/api'

async function getWorkers(searchText: string) {
  const response = await apiInstance.getWorkers(searchText)
  return response
}

async function getMaxMindData(ip: string) {
  const response = await apiInstance.getMaxMindData(ip)
  return response
}
async function getBigData(ip: string) {
  const response = await apiInstance.getBigData(ip)
  return response
}

async function addWorker(data: Worker) {
  const response: any = await apiInstance.addWorker(data)
  if (response?.statusCode === 400) throw new Error('Ip address already exists')

  const result = workerConverter.fromApi(response)
  return result // created object
}

async function updateWorker(data: Worker, id: string) {
  const response = await apiInstance.updateWorker(data, id)

  const result = workerConverter.fromApi(response)
  return result
}

async function deleteWorker(id: string) {
  await apiInstance.deleteWorker(id)
}

const workerConverter = {
  toApi: (worker: Worker) => {
    return {
      id: worker.id,
      ipAddress: worker.ipAddress,
      port: worker.port,
      password: worker.password,
      providerLocation: worker.providerLocation,
      latitude: worker.latitude,
      longitude: worker.longitude
    }
  },
  fromApi: (item: any) => {
    return {
      id: item.id,
      ipAddress: item.ipAddress,
      port: item.port,
      password: item.password,
      currency: item.currency,
      providerLocation: item.providerLocation,
      paymentRecurrency: item.paymentRecurrency,
      ipInsight: item.ipInsight,
      bigCloud: item.bigCloud,
      status: item.status,
      price: item.price,
      lastSeenAt: item.lastSeenAt,
      latitude: item.latitude,
      longitude: item.longitude
    }
  }
}

export {
  getWorkers,
  addWorker,
  updateWorker,
  deleteWorker,
  getBigData,
  getMaxMindData
}
