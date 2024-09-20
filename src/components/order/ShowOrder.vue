<template>
    <div class="container mt-5">
        <h2>List of Orders</h2>

        <button class="btn btn-primary float-end mb-3" @click="redirigerVersAddOrder">Add New Order</button>

        <table class="table table-striped table-bordered mt-3">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Delivery Address</th>
                    <th>Track Number</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.id">
                    <td>{{ order.date }}</td>
                    <td>{{ order.customer_name }}</td>
                    <td>{{ order.delivery_address }}</td>
                    <td>{{ order.track_number }}</td>
                    <td>{{ order.status }}</td>
                    <td>
                        <button class="btn btn-info btn-sm me-2" @click="showOrder(order)">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-warning btn-sm me-2" @click="redirigerVersEditOrder(order.id)">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" @click="supprimerCommande(order.id)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modal d'affichage de l'ordre -->
        <div class="modal fade" id="orderDetailsModal" tabindex="-1" aria-labelledby="orderDetailsModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="orderDetailsModalLabel">View Order</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p><strong>Date:</strong> {{ commandeSelectionnee?.date }}</p>
                        <p><strong>Customer:</strong> {{ commandeSelectionnee?.customer_name }}</p>
                        <p><strong>Delivery Address:</strong> {{ commandeSelectionnee?.delivery_address }}</p>
                        <p><strong>Track Number:</strong> {{ commandeSelectionnee?.track_number }}</p>
                        <p><strong>Status:</strong> {{ commandeSelectionnee?.status }}</p>

                        <h5 class="mt-3">Order Details</h5>
                        <ul>
                            <li v-for="detail in commandeSelectionnee?.details" :key="detail.product">
                                {{ detail.quantity }} x {{ detail.product }} at {{ detail.price }} USD
                            </li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const orders = ref([
    { id: 1, date: '25/07/2024', customer_name: 'Alice Johnson', delivery_address: '789 Elm St, San Francisco, CA', track_number: 'TN001', status: 'Shipped', details: [{ product: 'Product 001', quantity: 2, price: 100 }] },
    { id: 2, date: '26/07/2024', customer_name: 'Bob Williams', delivery_address: '123 Pine St, Los Angeles, CA', track_number: 'TN002', status: 'Delivered', details: [{ product: 'Product 002', quantity: 1, price: 50 }] }
]);

const commandeSelectionnee = ref(null);

const showOrder = (order) => {
    commandeSelectionnee.value = order;
    const modal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));
    modal.show();
};

const redirigerVersEditOrder = (orderId) => {
    router.push(`/orders/edit/${orderId}`);
};

const redirigerVersAddOrder = () => {
    router.push('/orders/create');
};
const supprimerCommande = (orderId) => {
    const confirmation = window.confirm('Are you sure you want to delete this order?');
    if (confirmation) {
        orders.value = orders.value.filter(order => order.id !== orderId);
    }
};

</script>

<style scoped>
.table {
    margin-top: 20px;
}
</style>