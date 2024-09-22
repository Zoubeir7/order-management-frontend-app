<template>
    <div class="container mt-5">
        <h2>Order Details</h2>

        <div class="row mb-3">
            <div class="col-md-6">
                <label for="date" class="form-label">Date</label>
                <input type="text" id="date" class="form-control" v-model="order.date" disabled />
            </div>
            <div class="col-md-6">
                <label for="deliveryAddress" class="form-label">Delivery Address</label>
                <input type="text" id="deliveryAddress" class="form-control" v-model="order.delivery_address"
                    disabled />
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-md-6">
                <label for="customerName" class="form-label">Customer Name</label>
                <input type="text" id="customerName" class="form-control" v-model="order.customer_name" disabled />
            </div>
            <div class="col-md-6">
                <label for="trackNumber" class="form-label">Track Number</label>
                <input type="text" id="trackNumber" class="form-control" v-model="order.track_number" disabled />
            </div>
        </div>

        <div class="row mb-3 d-flex justify-content-end">
            <div class="col-md-6">
                <label for="orderStatus" class="form-label">Order Status</label>
                <input type="text" id="orderStatus" class="form-control" v-model="order.status" disabled />
            </div>
        </div>

        <h5 class="mt-3">Order Details</h5>

        <div v-for="(detail, index) in order.details" :key="index" class="row mb-2">
            <div class="col-md-4">
                <label class="form-label">Product</label>
                <input type="text" class="form-control" v-model="detail.product" disabled />
            </div>
            <div class="col-md-4">
                <label class="form-label">Quantity</label>
                <input type="number" class="form-control" v-model="detail.quantity" disabled />
            </div>
            <div class="col-md-4">
                <label class="form-label">Price</label>
                <input type="text" class="form-control" v-model="detail.price" disabled />
            </div>
        </div>

        <button class="btn btn-secondary mt-3" @click="goBack">Back to Orders</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const order = ref(null);
const route = useRoute();
const router = useRouter();

onMounted(() => {
    const orderId = route.params.id;
    const allOrders = [
        { id: 1, date: '25/07/2024', customer_name: 'Alice Johnson', delivery_address: '789 Elm St, San Francisco, CA', track_number: 'TN001', status: 'Shipped', details: [{ product: 'Product 001', quantity: 2, price: 100 }] },
        { id: 2, date: '26/07/2024', customer_name: 'Bob Williams', delivery_address: '123 Pine St, Los Angeles, CA', track_number: 'TN002', status: 'Delivered', details: [{ product: 'Product 002', quantity: 1, price: 50 }] }
    ];

    order.value = allOrders.find(o => o.id === parseInt(orderId));
});

const goBack = () => {
    router.push('/Orders');
};
</script>

<style scoped>
.container {
    margin-top: 20px;
}
</style>