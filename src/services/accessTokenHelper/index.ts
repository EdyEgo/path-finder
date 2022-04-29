export const getAccessToken = () => {
  const token = sessionStorage.getItem('access_token')
  return token
}
