import ShowCusmoter from "../components/customer/ShowCusmoter.vue";
import AddOrder from "../components/order/AddOrder.vue";
import ShowOrder from "../components/order/ShowOrder.vue";
import ShowProduct from "../components/product/ShowProduct.vue";


export const routes = [
    {
        path: '/',
        component: ShowCusmoter
    },
    {
        path: '/products',
        component: ShowProduct
    },
    {
        path: '/orders',
        component: ShowOrder
    },
    {
        path: '/AddOrder/create',
        component: AddOrder
    },

];


