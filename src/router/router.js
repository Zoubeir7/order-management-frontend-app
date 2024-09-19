import ShowCusmoter from "../components/customer/ShowCusmoter.vue";
import AddCustomer from "../components/customer/AddCustomer.vue";
import EditCusmoter from "../components/customer/EditCusmoter.vue";
import ShowProduct from "../components/product/ShowProduct.vue";
import AddProduct from "../components/product/AddProduct.vue";


export const routes = [
    {
        path: '/',
        component: ShowCusmoter
    },
    {
        path: '/products',
        component: ShowProduct
    },
    // {
    //     path: '/o',
    //     component: AddProduct
    // },
 
];


