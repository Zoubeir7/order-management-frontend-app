import { createRouter, createWebHistory } from "vue-router";



const routes = [
    { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;