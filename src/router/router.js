// import EditCusmoter from '../components/customer/EditCusmoter.vue';
import ShowCusmoter from '../components/customer/showCusmoter.vue';
import AddOrder from '../components/order/AddOrder.vue';
import ShowOrder from '../components/order/ShowOrder.vue';
import ShowProduct from '../components/product/ShowProduct.vue';


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
        path: '/Orders',
        component: ShowOrder
    },
    {
        path: '/orders/create',
        component: AddOrder
    },
    // {
    //     path: '/orders/edit',
    //     component: EditCusmoter
    // },
];


