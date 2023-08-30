import { createApp } from 'vue'
import '@/style.scss'
import router from './router.js'
import App from './App.vue';
import store from '@/store.js';

// import Header from './components/Header.vue';

const app = createApp(App)

const components = [
    // { name: 'Header', component: Header },
];

components.forEach(({ name, component }) => {
    app.component(name, component);
});

app.use(store)
app.use(router)
app.mount('#app').$nextTick(() => postMessage({ payload: 'removeLoading' }, '*'))