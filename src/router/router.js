import ShowCusmoter from '../components/customer/showCusmoter.vue';
import AddOrder from '../components/order/AddOrder.vue';
import EditOrder from '../components/order/EditOrder.vue';
import ShowOrder from '../components/order/ShowOrder.vue';
import ShowProduct from '../components/product/ShowProduct.vue';
import OrderDetail from '../components/order/OrderDetail.vue'; 

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
        path: '/orders/create',
        component: AddOrder
    },
    {
        path: '/orders/edit/:id',
        component: EditOrder
    },
    {
        path: '/orders/:id',
        component: OrderDetail
    }
];
