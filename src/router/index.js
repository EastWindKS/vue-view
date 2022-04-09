import {createRouter, createWebHistory} from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import ErrorPage from "../pages/ErrorPage.vue";
import MainLayout from "../components/MainLayout.vue";
import {isValidToken} from "../services/jwtWorker";

const routes = [
    {path: '/', component: MainLayout},
    {path: '/login', name: 'login', component: LoginPage},
    {path: '/:catchAll(.*)', component: ErrorPage}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to) => {
    const isValid = isValidToken();
    if (!isValid && to.name !== 'login') {
        return {name: 'login'}
    }
})

export default router;
