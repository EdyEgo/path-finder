import { defineStore } from 'pinia'
import {
  addWorker,
  getWorkers,
  updateWorker,
  deleteWorker,
  getBigData,
  getMaxMindData
} from '../services/workers'
import type { Worker } from '@/types'

export const useWorkersStore = defineStore({
  id: 'workers',

  state: () => {
    return <
      {
        workers: Worker[]
        user: any
        errorMsg: any
      }
    >{
      workers: [],
      user: null,
      errorMsg: null
    }
  },

  persist: true,

  getters: {},

  actions: {
    async addWorker(data: Worker) {
      try {
        const newWorker = await addWorker(data)

        this.workers.push(newWorker)

        return newWorker
      } catch (e) {
        this.errorMsg = e || 'Something occurred. Please try later.'
      }
    },

    async deleteWorker(id: string) {
      try {
        await deleteWorker(id)
        const index = this.workers.findIndex((p) => p.id === id)
        this.workers.splice(index, 1)
      } catch (e) {
        this.errorMsg = 'Something occurred. Please try later.'
      }
    },

    async getMaxMindData(ip: string) {
      try {
        return await getMaxMindData(ip)
      } catch (e) {
        console.log(e)
        this.errorMsg = 'Something occurred. Please try later.'
      }
    },

    async getBigData(ip: string) {
      try {
        return await getBigData(ip)
      } catch (e) {
        console.log(e)
        this.errorMsg = 'Something occurred. Please try later.'
      }
    },

    async getWorkers(search: string) {
      try {
        this.workers = await getWorkers(search)
      } catch (e) {
        this.errorMsg = 'Something occurred. Please try later.'
      }
    },
    async updateWorker(payload: Worker, id: string) {
      try {
        const updatedWorker = await updateWorker(payload, id)

        const index = this.workers.findIndex((p) => p.id === updatedWorker.id)
        if (index !== -1) {
          this.workers[index] = updatedWorker
        }

        return updatedWorker
      } catch (e) {
        this.errorMsg = 'Something occurred. Please try later.'
      }
    },
    resetErrorMesssage() {
      this.errorMsg = null
    }
  }
})
