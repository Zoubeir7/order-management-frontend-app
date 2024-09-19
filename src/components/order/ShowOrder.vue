<template>
    <div class="container mt-5">
        <h2>List of Orders</h2>

        <button class="btn btn-primary float-end mb-3" @click="redirigerVersAddOrder">
            Add New Order
        </button>

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
                        <button class="btn btn-warning btn-sm me-2" @click="ouvrirModal(order)">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" @click="supprimerCommande(order.id)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="modal fade" id="orderDetailsModal" tabindex="-1" aria-labelledby="orderDetailsModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="orderDetailsModalLabel">View order</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p><strong>Date:</strong> {{ commandeSelectionnee?.date }}</p>
                        <p><strong>Customer:</strong> {{ commandeSelectionnee?.customer_name }}</p>
                        <p><strong> Delivery Address:</strong> {{ commandeSelectionnee?.delivery_address }}</p>
                        <p><strong> Track Number:</strong> {{ commandeSelectionnee?.track_number }}</p>
                        <p><strong>Status:</strong> {{ commandeSelectionnee?.status }}</p>
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
    { id: 1, date: '25/07/2024', customer_name: 'John Doe', delivery_address: '123 Main St, New York, NY', track_number: 'TN001', status: 'Shipped' },
    { id: 2, date: '26/07/2024', customer_name: 'Jane Smith', delivery_address: '456 Oak St, Los Angeles, CA', track_number: 'TN002', status: 'Delivered' },
    { id: 3, date: '27/07/2024', customer_name: 'Alice Martin', delivery_address: '789 Pine St, Chicago, IL', track_number: 'TN003', status: 'Processing' },
]);

const commandeSelectionnee = ref(null);

const redirigerVersAddOrder = () => {
    router.push('/AddOrder/create');
};

const showOrder = (order) => {
    commandeSelectionnee.value = order;
    const modalElement = new bootstrap.Modal(document.getElementById('orderDetailsModal'));
    modalElement.show();
};

const mettreAJourCommande = (orderModifie) => {
    const index = orders.value.findIndex(order => order.id === orderModifie.id);
    if (index !== -1) {
        orders.value[index] = orderModifie;
    } else {
        orders.value.push(orderModifie);
    }
};

const supprimerCommande = (id) => {
    orders.value = orders.value.filter(order => order.id !== id);
};
</script>

<style scoped>
.table td {
    vertical-align: middle;
}

.table th {
    font-weight: bold;
}
</style>
