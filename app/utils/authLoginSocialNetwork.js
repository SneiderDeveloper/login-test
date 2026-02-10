import { constructApiUrl } from './constructApiUrl'
import { detectDevice } from './detectDevice'

export const authLoginSocialNetwork = async ({ token, socialData, type }) => {
    const PATH = `/profile/v1/auth/social/${type}`	
    const api = constructApiUrl(PATH, { setting: `"authProvider":"${type}"` })
    // const device = detectDevice()

    console.log('Detected device:', detectDevice())

    const params = {
        attributes: { 
            token, 
            socialData, 
            // device,
            device: 'Windows 10.0',
        }, 
        type
    }
    
    try {
        console.log('Sending params:', params)
        const response = await $fetch(api, {
            body: { ...params },
            method: 'POST', 
            headers: { 
                'Authorization': 'null',
                'Access-Control-Allow-Origin': 'http://localhost:8080',

                
            }
        })
        return response?.data
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}