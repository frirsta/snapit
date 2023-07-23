import axios from "axios";

axios.defaults.baseURL = 'https://snapitapi-a9c9b5ffecd8.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true

export const axiosRequest = axios.create()
export const axiosResponse = axios.create()