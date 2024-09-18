import ShowCusmoter from "../components/customer/ShowCusmoter.vue";
import AddCustomer from "../components/customer/AddCustomer.vue";
import EditCusmoter from "../components/customer/EditCusmoter.vue";


export const routes = [
    {
        path: '/',
        component: ShowCusmoter
    },
    {
        path: '/Addcustomer',
        component: AddCustomer
    },
    {
        path: '/Editcustomer/:index',
        component: EditCusmoter
    },
];


