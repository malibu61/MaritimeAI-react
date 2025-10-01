import axios from "axios"

export const API_URL ="https://localhost:7170/api/"
const backendApi = axios.create({
    baseURL: API_URL
})




export async function get(url, config = {}) {
    try {
        const response = await backendApi.get(url, { ...config, timeout: 0 })
        return response.data
    } catch (e) {
        return {
            status: false,
            message: e.message,
            data: []
        }
    }
}

export async function post(url, data = {}, config = {}) {
    try {
        const response = await backendApi.post(url, data, { ...config, timeout: 0 })
        return response.data
    } catch (e) {
        return {
            status: false,
            message: e.message,
            data: []
        }
    }
}

export async function put(url, data = {}, config = {}) {
    try {
        const response = await backendApi.put(url, data, { ...config, timeout: 0 })
        return response.data
    } catch (e) {
        return {
            status: false,
            message: e.message,
            data: []
        }
    }
}

export async function del(url, config = {}) {
    try {
        const response = await backendApi.delete(url, { ...config, timeout: 0 })
        return response.data
    } catch (e) {
        return {
            status: false,
            message: e.message,
            data: []
        }
    }
}