import { constructApiUrl } from './constructApiUrl'

export const api = {
    get: async (url) => {
        return await $fetch(constructApiUrl(url), { method: 'GET' })
    }
}