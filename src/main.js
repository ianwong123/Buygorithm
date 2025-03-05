// This file is the entry point of the app. It creates a Vue instance
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';
createApp(App)
    .use(router)
    .mount('#app');
