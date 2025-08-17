import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9000/api', // Use the /api prefix for your API routes
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest', // A common header for AJAX requests
    }
});

// Add the CSRF token to the instance
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    api.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}

export default api;