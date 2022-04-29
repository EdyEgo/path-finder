export const requestsCallbackMonitor = (response: any) => {
  import('@/stores/auth').then((importResponse) => {
    const storeAuth = importResponse.useAuth()
    if (response.status === 401) {
      storeAuth.signOut()

      return
    }
  })
}
