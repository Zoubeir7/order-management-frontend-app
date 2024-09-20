<template>
    <div class="modal fade" id="editOrderModal" tabindex="-1" aria-labelledby="editOrderModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editOrderModalLabel">Edit Order</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitOrder">
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="edit-date" class="form-label">Date</label>
                                <input type="text" id="edit-date" v-model="localOrder.date" class="form-control"
                                    placeholder="jj/mm/aaaa" />
                            </div>
                            <div class="col-md-6">
                                <label for="edit-delivery-address" class="form-label">Delivery Address</label>
                                <input type="text" id="edit-delivery-address" v-model="localOrder.delivery_address"
                                    class="form-control" />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="edit-customer-name" class="form-label">Customer Name</label>
                                <input type="text" id="edit-customer-name" v-model="localOrder.customer_name"
                                    class="form-control" />
                            </div>
                            <div class="col-md-6">
                                <label for="edit-track-number" class="form-label">Track Number</label>
                                <input type="text" id="edit-track-number" v-model="localOrder.track_number"
                                    class="form-control" />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="edit-order-status" class="form-label">Order Status</label>
                                <select id="edit-order-status" v-model="localOrder.status" class="form-select">
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
                                <tr v-for="(detail, index) in localOrder.details" :key="index">
                                    <td>
                                        <select v-model="detail.product" class="form-select">
                                            <option value="">Select Product</option>
                                            <option v-for="product in products" :value="product.product_name"
                                                :key="product.id">
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
                                        <button type="button" class="btn btn-danger"
                                            @click="removeDetail(index)">Remove</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" class="btn btn-success" @click="addDetail">Add New Detail</button>
                        <div class="modal-footer mt-4">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    order: Object
});

const emit = defineEmits(['order-modified']);

const localOrder = ref({ ...props.order });
const products = ref([
    { id: 1, product_name: 'Product 001', description: 'High-quality product.', price: 100, stock: 50, category: 'Electronics', barcode: '123456789012', status: 'Active' },
    { id: 2, product_name: 'Product 002', description: 'Affordable product.', price: 50, stock: 100, category: 'Home Appliances', barcode: '987654321098', status: 'Inactive' },
    { id: 3, product_name: 'Product 003', description: 'Durable product.', price: 75, stock: 75, category: 'Sports', barcode: '234567890123', status: 'Active' }
]);

watch(() => props.order, (newOrder) => {
    localOrder.value = { ...newOrder };
});

const addDetail = () => {
    localOrder.value.details.push({
        product: '',
        quantity: 1,
        price: 0
    });
};

const removeDetail = (index) => {
    if (index !== 0) {
        localOrder.value.details.splice(index, 1);
    }
};

const submitOrder = () => {
    emit('order-modified', localOrder.value);
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
</style>