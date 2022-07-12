import {$authHost, $host} from "./index";


export const createCompany = async (company) => {
    return await $authHost.post('api/company/create', company)
}

export const getMyCompanies = async () => {
    const {data} = await $authHost.get('api/company/mycompanies')
    return data
}

export const getAllCompanies = async () => {
    const {data} = await $host.get('api/company/all')
    return data
}

export const getCompany = async (url) => {
    const {data} = await $host.get('api/company/id/'+url)
    // console.log("DATA i:", data)
    return data
}

export const deleteCompany = async (company) => {
    const {data} = await $authHost.delete('api/company/deleteCompany', {data: company})
    // console.log("DATA i:", data)
    return data
}
export const getAllCompanyResponses = async (url) => {
    const {data} = await $authHost.get('api/company/company-responses/'+url)
    return data
}
export const uploadLogo = async (fileData) => {
    const {data} = await $authHost.post('api/company/fileupload', fileData, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
    return data
}