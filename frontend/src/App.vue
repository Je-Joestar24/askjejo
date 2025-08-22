<script setup>
import { RouterView } from 'vue-router'
import {onMounted} from 'vue'
import { useStore } from 'vuex';
import api from '@/config/api'
import Navigation from './components/header/Navigation.vue';
import FooterV from './components/footer/Footer.vue';
import Modals from './components/modals/Modals.vue';
import Loading from './composables/loading/Loading.vue';

const store = useStore()
const state = store.state

const callApi =  async () => {
  try {
        // Use await to wait for the API call to complete
        const response = await api.post('/test');

        // Access the response data from the server
        console.log('Success! Data from server:', response.data);

        // You can now update your application's state or display a success message
    } catch (error) {
        // Handle any errors that occurred during the request
        console.error('There was an error with the API call:', error.response.data);

        // You can display an error message to the user here
    }
}
onMounted(callApi)
</script>

<template>
  <Navigation/>
  <RouterView />
  <FooterV />
  <Modals/>
  <Loading :show="state.loading"/>
</template>
