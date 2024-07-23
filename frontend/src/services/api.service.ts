import axios, { AxiosInstance } from "axios";
import { apiUrl } from "../config/app.config";

const api: AxiosInstance = axios.create({
    baseURL: apiUrl,
});


export default api;


