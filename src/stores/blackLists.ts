import { defineStore } from 'pinia'
import type { BlackList } from '@/types/blackLists'
import {
  addBlackList,
  getBlackLists,
  updateBlackList,
  deleteBlackList
} from '@/services/blackLists'

export const useBlackListsStore = defineStore({
  id: 'blackLists',

  state: () => {
    return <
      {
        blackLists: Array<BlackList>
        user: any
        errorMsg: any
      }
    >{
      blackLists: [],
      user: null,
      errorMsg: null
    }
  },

  persist: true,

  getters: {},

  actions: {
    async addBlackList(payload: BlackList) {
      try {
        const newBlackList = await addBlackList(payload)
        this.blackLists.push(newBlackList)
        return
      } catch (e) {
        this.errorMsg = 'Something occurred. Please try later.'
      }
    },
    async deleteBlackList(id: string) {
      try {
        await deleteBlackList(id)
        const index = this.blackLists.findIndex((p) => p.id === id)
        this.blackLists.splice(index, 1)
        return
      } catch (e) {
        this.errorMsg = 'Something occurred. Please try later.'
      }
    },
    async updateBlackList(payload: BlackList, id: string) {
      try {
        const updatedBlackList = await updateBlackList(payload, id)
        const index = this.blackLists.findIndex(
          (p) => p.id === updatedBlackList.id
        )
        if (index !== -1) {
          this.blackLists[index] = updatedBlackList
        }
      } catch (e) {
        this.errorMsg = 'Something occurred. Please try later.'
      }
    },
    async getBlackLists(search: string) {
      try {
        this.blackLists = await getBlackLists(search)
      } catch (e) {
        this.errorMsg = 'Something occurred. Please try later.'
      }
    }
  }
})
