// src/api/authService.js
// This is a mock authentication service. In a real application, this would
// interact with an actual authentication backend (e.g., a Spring Boot service
// that issues JWTs).

export const login = async (username, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (username === 'admin' && password === 'admin123') {
        const token = btoa('admin_token_jwt_mock'); // Simple base64 mock token
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', 'ADMIN');
        return { token, role: 'ADMIN' };
    } else if (username === 'customer' && password === 'customer123') {
        const token = btoa('customer_token_jwt_mock'); // Simple base64 mock token
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', 'CUSTOMER');
        return { token, role: 'CUSTOMER' };
    } else {
        throw new Error('Invalid username or password');
    }
};

export const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
};

export const getToken = () => localStorage.getItem('authToken');
export const getUserRole = () => localStorage.getItem('userRole');