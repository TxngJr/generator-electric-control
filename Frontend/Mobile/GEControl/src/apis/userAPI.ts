import axios, { AxiosResponse } from 'axios';
import { registerFormData, loginFormData, logoutFormData, getCodeResetPasswordFormData, checkCodeResetPasswordFormData, resetPasswordFormData } from '../interfaces/userInterface';

const API_URL = "http://swapsjobs.3bbddns.com:36889/";

export const register = async (formData: registerFormData) => {
    try {
        const response: AxiosResponse = await axios.post(`${API_URL}user/register`, formData);
        if (response.status === 201) {
            return response.data;
        } else {
            throw new Error('Unexpected status code');
        }
    } catch (error) {
        return error;
    }
};
export const login = async (formData: loginFormData) => {
    try {
        const response: AxiosResponse = await axios.post(`${API_URL}user/login`, formData);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Unexpected status code');
        }
    } catch (error) {
        return error;
    }
};
export const logout = async (formData: logoutFormData) => {
    try {
        const response: AxiosResponse = await axios.post(`${API_URL}user/logout`, {
            headers: {
                Authorization: `Bearer ${formData.token}`,
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
export const getCodeResetPassword = async (formData: getCodeResetPasswordFormData) => {
    try {
        const response: AxiosResponse = await axios.post(`${API_URL}user/get_code_reset_password`, formData);
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            throw new Error('Unexpected status code');
        }
    } catch (error) {
        return error;
    }
};
export const checkCodeResetPassword = async (formData: checkCodeResetPasswordFormData) => {
    try {
        const response: AxiosResponse = await axios.post(`${API_URL}user/check_code_reset_password`, formData);
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            throw new Error('Unexpected status code');
        }
    } catch (error) {
        return error;
    }
};
export const resetPassword = async (formData: resetPasswordFormData) => {
    try {
        const response: AxiosResponse = await axios.post(`${API_URL}user/reset_password`, formData);
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            throw new Error('Unexpected status code');
        }
    } catch (error) {
        return error;
    }
};