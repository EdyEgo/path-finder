import { defineStore } from 'pinia'
import { getUsers, updateUser } from '../services/users'
import type { User } from '@/types'

interface Stats {
  pending: number
  registered: number
  paying: number
}

export const useUsersStore = defineStore({
  id: 'users',

  state: () => {
    return <
      {
        users: Array<User>
        stats: Stats
        errorMsg: string | null
      }
    >{
      users: [],
      stats: {
        pending: 0,
        registered: 0,
        paying: 0
      },
      errorMsg: null
    }
  },

  persist: true,

  getters: {},

  actions: {
    async getUsers(search: string) {
      try {
        this.users = await getUsers(search)
      } catch (e) {
        this.errorMsg = 'Something occurred. Please try later.'
      }
    },
    async updateUser(payload: User, id: string) {
      try {
        const updatedUser = await updateUser(payload, id)
        const index = this.users.findIndex((p) => p.id === updatedUser.id)
        if (index !== -1) {
          this.users[index] = updatedUser
        }
      } catch (e) {
        this.errorMsg = 'Something occurred. Please try later.'
      }
    }
  }
})
