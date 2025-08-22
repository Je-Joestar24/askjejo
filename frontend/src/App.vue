<script setup>
import { RouterView } from 'vue-router'
import {onMounted} from 'vue'
import { useStore } from 'vuex';
import api, { csrf } from '@/config/api'
import Navigation from './components/header/Navigation.vue';
import FooterV from './components/footer/Footer.vue';
import Modals from './components/modals/Modals.vue';
import Loading from './composables/loading/Loading.vue';

const store = useStore()
const state = store.state

const callApi = async () => {
  try {
        console.log('Getting CSRF cookie...')
        const csrfResult = await csrf()
        console.log('CSRF result:', csrfResult)
        
        // Debug: Check all cookies
        console.log('All cookies:', document.cookie)
        
        // Use await to wait for the API call to complete
        console.log('Making API call to /api/test...')
        
        // First test the debug route to see what's happening
        try {
            const debugResponse = await api.post('api/debug');
            console.log('Debug route response:', debugResponse.data);
        } catch (debugError) {
            console.error('Debug route failed:', debugError);
        }
        
        // Now test the main route
        const response = await api.post('api/test');

        // Access the response data from the server
        console.log('Success! Data from server:', response.data);

        // You can now update your application's state or display a success message
    } catch (error) {
        // Handle any errors that occurred during the request
        console.error('There was an error with the API call:', error);
        
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up request:', error.message);
        }

        // You can display an error message to the user here
    }
}

//onMounted(callApi)
</script>

<template>
  <Navigation/>
  <RouterView />
  <FooterV />
  <Modals/>
  <Loading :show="state.loading"/>
</template>
