<script setup>
import { RouterView } from 'vue-router'
import {onMounted} from 'vue'
import api from '@/config/api'
import Navigation from './components/header/Navigation.vue';

const callApi =  async () => {
  try {
        const response = await api.post('/test');
        console.log('Success! Data from server:', response.data);
    } catch (error) {
        console.error('There was an error with the API call:', error.response.data);
    }
}
onMounted(callApi)
</script>

<template>
  <Navigation/>
  <RouterView />
</template>
