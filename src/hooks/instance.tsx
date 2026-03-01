import axios from "axios"

const baseURL = import.meta.env.VITE_API
const instance = (token?:string) => {
    return axios.create({
        baseURL,headers:token ? {"Authorization":`Bearer ${token}`} : {}})
}
export default instance