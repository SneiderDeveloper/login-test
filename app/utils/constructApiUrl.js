// import moment from 'moment-timezone'

export const constructApiUrl = (path, params={}) => {
    const url = 'https://agionedev.azurewebsites.net'
    // const timezone = moment.tz.guess()
      
    const api = new URL(`${url}/api${path}`)

    const setting = params?.setting 
        ? params?.setting
        : null

    delete params?.setting
        
    const queryParams = new URLSearchParams({
        setting: `{"fromAdmin":true,"appMode":"iadmin"${setting ? `,${setting}` : ''}}`,
        ...(Object.keys(params).length > 0 && ({...params}))
    })
    
    api.search = queryParams.toString()

    return api.href
}
