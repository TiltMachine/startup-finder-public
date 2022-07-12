import axios from "axios"

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})
//TODO: создать для дебага  что-то вроде: const DEBUG = process.env.NODE_ENV === "development"; и потом  if (DEBUG) { console.info("! ", config); }

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')} `
    return config
}

$authHost.interceptors.request.use(authInterceptor,error => {
    console.error("!!!authInterceptorERROR: ", error)
    return Promise.reject(error)
})

export {
    $host,
    $authHost
}