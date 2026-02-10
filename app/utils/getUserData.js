import { constructApiUrl } from './constructApiUrl'

export const getUserData = async (tokenLocalStorage) => {
    // const urlParams = new URLSearchParams(location.search);
    // const params = Object.fromEntries(urlParams.entries());
    const token = tokenLocalStorage
    const STATUS_UNAUTHORIZED = 401
    const STATUS_OK = 200

    if (!token) return STATUS_UNAUTHORIZED
    const PATH = '/profile/v1/auth/me'
    const param = { include: 'organizations' }
    const api = constructApiUrl(PATH, param)
    
    try {
        const response = await $fetch(
            api, 
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        if (response.status === STATUS_OK) {
            return response.data
        }
        return
    } catch (error) {
        console.error('Error fetching data:', error)
        return STATUS_UNAUTHORIZED
    }
};