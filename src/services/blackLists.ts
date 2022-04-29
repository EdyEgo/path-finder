import type { BlackList } from '@/types/blackLists'

import { apiInstance } from '@/config/api'

async function getBlackLists(searchText: string = '') {
  const response = await apiInstance.getBlackLists(searchText)
  return response
}

async function addBlackList(data: any) {
  const response = await apiInstance.addBlackList(data)

  return blackListConverter.fromApi(response)
}

async function updateBlackList(data: any, id: string) {
  const response = await apiInstance.updateBlackList(data, id)
  return blackListConverter.fromApi(response)
}

async function deleteBlackList(id: string) {
  await apiInstance.deleteBlackList(id)
}

const blackListConverter = {
  toApi: (blackList: BlackList) => {
    return {
      id: blackList.id,
      domain: blackList.domain,
      name: blackList.name
    }
  },
  fromApi: (item: any) => {
    return {
      id: item.id,
      domain: item.domain,
      name: item.name
    }
  }
}

export { getBlackLists, addBlackList, updateBlackList, deleteBlackList }
