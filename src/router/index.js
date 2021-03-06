import {createRouter, createWebHistory} from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import ErrorPage from "../pages/ErrorPage.vue";
import MainLayout from "../layouts/MainLayout.vue";
import {isValidToken} from "../services/localStorageWorker";
import OrganizationsPage from "../pages/OrganizationsPage.vue";

const routes = [
    {
        path: '/', component: MainLayout, children: [
            {path: '/organizations', name: 'organizations', component: OrganizationsPage},]
    },
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
