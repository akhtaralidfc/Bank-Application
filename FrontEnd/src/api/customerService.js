// src/api/customerService.js
import axios from 'axios';

const CUSTOMER_API_BASE_URL = 'http://localhost:8083/CustomerService/'; //Api gateway Customer Microservice

const customerApiClient = axios.create({
    baseURL: CUSTOMER_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add an interceptor to include the auth token in every request
customerApiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Add an interceptor to handle 401 Unauthorized responses
customerApiClient.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        console.error("Unauthorized access to Customer Service. Redirecting to login...");
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});

export const depositFunds = async (acNo, amount) => {
    // Express.js endpoint for deposit
    const response = await customerApiClient.post('/deposit', { acNo, amount });
    return response.data;
};

export const withdrawFunds = async (acNo, amount) => {
    // Express.js endpoint for withdraw
    const response = await customerApiClient.post('/withdraw', { acNo, amount });
    return response.data;
};

export const checkBalance = async (acNo) => {
    // Express.js endpoint for check balance
    console.log("Iside frontend")
    const response = await customerApiClient.get(`/balance/${acNo}`);
    return response.data;
};

// Add other customer-specific API calls here if needed