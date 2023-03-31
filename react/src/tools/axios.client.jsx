import axios from 'axios'
import { config } from 'localforage';

const axiosClient= axios.create({
    baseURL: 'https://portalcoba.nasihosting.com/api'
})

axiosClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`

    return config
})

axiosClient.interceptors.response.use((res)=>{

    return res;
}, (error)=>{
    try{
    const {response}= error;
    if(response.status === 401){
        localStorage.removeItem('ACCESS_TOKEN')
    }
}catch(e){
    console.error(e)
}

    throw error;

})

export default axiosClient;
