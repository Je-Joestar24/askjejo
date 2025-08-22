// frontend/src/config/api.js
import axios from 'axios'

const api = axios.create({
    // point to the backend root (no /api prefix so /sanctum/csrf-cookie is reachable)
    baseURL: 'http://localhost:9000',
    withCredentials: true, // <--- REQUIRED for cookie-based auth (send cookies)
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
})

// call this before any POST/PUT/DELETE that needs CSRF (signup/login/logout)
export async function csrf() {
    try {
        //console.log('Requesting CSRF cookie...')
        
        // First, get the CSRF cookie
        const response = await api.get('/sanctum/csrf-cookie')
        //console.log('CSRF cookie response:', response)
        
        // Wait a bit for the cookie to be set
        await new Promise(resolve => setTimeout(resolve, 100))
        
        // Extract the CSRF token from the cookie
        const token = getCookie('XSRF-TOKEN')
        //console.log('Raw CSRF token from cookie:', token)
        
        if (token) {
            // Decode the token (Laravel encodes it in the cookie)
            const decodedToken = decodeURIComponent(token)
            //console.log('Decoded CSRF token:', decodedToken)
            
            // Set the CSRF token in the default headers for all future requests
            // Laravel expects X-CSRF-TOKEN header
            api.defaults.headers.common['X-CSRF-TOKEN'] = decodedToken
            //console.log('CSRF token set in headers:', api.defaults.headers.common['X-CSRF-TOKEN'])
        } else {
            console.warn('No CSRF token found in cookies')
            //console.log('Available cookies:', document.cookie)
        }
        
        return true
    } catch (error) {
        //console.error('Failed to get CSRF token:', error)
        return false
    }
}

// Helper function to get cookie value by name
function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
    return null
}

export default api
