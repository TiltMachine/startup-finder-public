import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/register', {email, password, role: 'BASIC'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)

}
export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)

}

export const loginGoogle = async (id_token) => {
    const {data} = await $host.post('api/user/login-google', {id_token})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const getUserById = async (id) => {
    const {data} = await $host.get('api/user/' + id)
    return data
}
export const checkForAuthentication = async () => {
    const {data} = await $authHost.get('api/user/auth')
    // console.log("CHECK")
    // console.log(localStorage.getItem('token'))
    // console.log("PRIKOL, ", data)
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)

}
export const saveProfileSettingsChanges = async (user, newData) => {
    const {data} = await $authHost.post('api/user/savesettingschanges', {user, newData})
    localStorage.setItem('token', data.token)
    return data
}

export const uploadImg = async (fileData) => {
    const {data} = await $authHost.post('api/user/fileupload', fileData, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
    return data
}

export const uploadPdf = async (fileData) => {
    const {data} = await $authHost.post('api/user/cvupload', fileData, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
    return data
}

export const getUserInfo = async () => {
    const {data} = await $authHost.get('api/user/getUserInfo')
    return data
}

export const getAllTalents = async () => {
    const {data} = await $host.get('api/user/talents')
    return data
}
