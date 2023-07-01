import axios from "axios";
import { BASE_URL } from "../constants";

const appointmentsApi = axios.create({
    baseURL: `${BASE_URL}/cars`,
})

appointmentsApi.interceptors.response.use(
    (response) => response.data, 
    (error) => Promise.reject(error)
);


export const getCarsAxios = () => appointmentsApi.get(``);
