// src/api/adminService.js
import axios from 'axios';

const ADMIN_API_BASE_URL = 'http://localhost:8083/AdminService/'; // Spring Boot Admin Microservice

const adminApiClient = axios.create({
    baseURL: ADMIN_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add an interceptor to include the auth token in every request
adminApiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Add an interceptor to handle 401 Unauthorized responses
adminApiClient.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        // Clear token and redirect to login if unauthorized
        console.error("Unauthorized access to Admin Service. Redirecting to login...");
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        window.location.href = '/login'; // Or use React Router's navigate programmatically
    }
    return Promise.reject(error);
});

export const addCustomer = async (customerData) => {
    // Spring Boot expects a JSON body matching a Pojo
    console.log("aoooooooooooooooooooooooooooo");
    const response = await adminApiClient.post('/customers', customerData);
    return response.data;
};

export const listCustomers = async () => {
    // Spring Boot endpoint to list all customers
     console.log("loooooooooooooooooooooooooooo");
    const response = await adminApiClient.get('/customers');
    return response.data;
};

export const searchCustomer = async (acNo) => {
    // Spring Boot endpoint to search customer by account number
    const response = await adminApiClient.get(`/customers/${acNo}`);
    return response.data;
};

// Add other admin-specific API calls here if needed