import axios from "axios";

axios.defaults.baseURL = 'https://snapitapi.netlify.app/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true

export const axiosRequest = axios.create()
export const axiosResponse = axios.create()