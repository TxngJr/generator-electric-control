import axios, { AxiosResponse } from 'axios';

const API_URL = "http://swapsjobs.3bbddns.com:36889/";

export const getsList = async (token: string,page:number) => {
    try {
        const response: AxiosResponse = await axios.get(`${API_URL}micro_controller/gets_list?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Unexpected status code');
        }
    } catch (error) {
        return error;
    }
};
export const getData = async (token: string,microControllerId: string) => {
    try {
        const response: AxiosResponse = await axios.get(`${API_URL}micro_controller/get_data/${microControllerId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Unexpected status code');
        }
    } catch (error) {
        return error;
    }
};