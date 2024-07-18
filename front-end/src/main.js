import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import './global.css';
import router from './router.js';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD6F9nB_pDQHJg7I-0eOm1zmkmpGF89X_0",
    authDomain: "shop-cc577.firebaseapp.com",
    projectId: "shop-cc577",
    storageBucket: "shop-cc577.appspot.com",
    messagingSenderId: "703513047493",
    appId: "1:703513047493:web:1c350e13726a6b4fd31bac"
};

initializeApp(firebaseConfig);

const pinia = createPinia();
pinia.use(piniaPersist);

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app');
