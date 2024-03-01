import axios from "axios";

axios.defaults.baseURL = 'https://snapitapi-9dc654608b7f.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true

export const axiosRequest = axios.create()
export const axiosResponse = axios.create()