import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Redirect from './Redirect.vue';

const routes = [
    {
        path: '/',
        component: App
    },
    {
        path: '/:verb/:noun/:encoded/:extension',
        component: Redirect
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router