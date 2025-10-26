import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import './index.css';   // <-- important: imports Tailwind


createApp(App).use(router).mount('#app');

