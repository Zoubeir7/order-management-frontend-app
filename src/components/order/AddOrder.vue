<template>
    <div class="container mt-5">
        <form @submit.prevent="submitOrder">

            <h2>Create New Order</h2>
            <div class="mes-btn">
                <button type="button" class="btn btn-secondary me-3 float-end mb-2" @click="goHome">Return to order
                    list</button>
                <button type="button" class="btn btn-primary float-end mb-2">Submit</button>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="date" class="form-label">Date</label>
                    <input type="text" id="date" v-model="order.date" class="form-control" placeholder="jj/mm/aaaa" />
                </div>

                <div class="col-md-6">
                    <label for="delivery_address" class="form-label">Delivery Address</label>
                    <input type="text" id="delivery_address" v-model="order.delivery_address" class="form-control" />
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="customer_name" class="form-label">Customer Name</label>
                    <input type="text" id="customer_name" v-model="order.customer_name" class="form-control" />
                </div>

                <div class="col-md-6">
                    <label for="track_number" class="form-label">Track Number</label>
                    <input type="text" id="track_number" v-model="order.track_number" class="form-control" />
                </div>
            </div>

            <div class="row mb-3 d-flex justify-content-end">
                <div class="col-md-6 ">
                    <label for="order_status" class="form-label">Order Status</label>
                    <select id="order_status" v-model="order.status" class="form-select">
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </div>
            </div>

            <h4 class="mt-4">Order Details</h4>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(detail, index) in order.details" :key="index">
                        <td>
                            <select v-model="detail.product" class="form-select">
                                <option value="">Select Product</option>
                                <option v-for="product in products" :value="product.product_name" :key="product.id">
                                    {{ product.product_name }}
                                </option>
                            </select>
                        </td>
                        <td>
                            <input type="number" v-model="detail.quantity" class="form-control" min="1" />
                        </td>
                        <td>
                            <input type="number" v-model="detail.price" class="form-control" min="0" />
                        </td>
                        <td>
                            <button type="button" class="btn btn-danger" @click="removeDetail(index)">Remove</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <button type="button" class="btn btn-success" @click="addDetail">Add New Detail</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const products = ref([
    { id: 1, product_name: 'Product 001', description: 'High-quality product.', price: 100, stock: 50, category: 'Electronics', barcode: '123456789012', status: 'Active' },
    { id: 2, product_name: 'Product 002', description: 'Affordable product.', price: 50, stock: 100, category: 'Home Appliances', barcode: '987654321098', status: 'Inactive' },
    { id: 3, product_name: 'Product 003', description: 'Durable product.', price: 75, stock: 75, category: 'Sports', barcode: '234567890123', status: 'Active' }
]);

const router = useRouter();

const order = ref({
    date: '',
    delivery_address: '',
    customer_name: '',
    track_number: '',
    status: 'Processing',
    details: [
        {
            product: '',
            quantity: 1,
            price: 0
        }
    ]
});

const addDetail = () => {
    order.value.details.push({
        product: '',
        quantity: 1,
        price: 0
    });
};

const removeDetail = (index) => {
    const confirmation = window.confirm('Are you sure you want to remove this detail?');
    if (confirmation) {
        if (index !== 0) {
            order.value.details.splice(index, 1);
        } else {
            alert('You cannot remove the first detail.');
        }
    }
};

const submitOrder = () => {
    console.log('Order submitted:', order.value);

    router.push('/AddOrder');
};

const goHome = () => {
    router.push('/orders');
};
</script>

<style scoped>
.table th,
.table td {
    vertical-align: middle;
}

.btn-danger {
    color: white;
}

.mes-btn {
    display: flex;
    justify-content: flex-end;

}
</style>
