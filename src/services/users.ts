import type { User } from '@/types'

import { apiInstance } from '@/config/api'

async function getUsers(searchText: string = '') {
  const response = await apiInstance.getUsers(searchText)
  return response
}

async function updateUser(data: User, id: string) {
  const response = await apiInstance.updateUser(data, id)
  return usersConverter.fromApi(response)
}

const usersConverter: any = {
  toApi: (user: User) => {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      timezone: user.timezone
    }
  },
  fromApi: (item: any) => {
    return {
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      role: item.role,
      timezone: item.timezone
    }
  }
}

export { getUsers, updateUser }
