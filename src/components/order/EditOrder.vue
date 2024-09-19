<template>
    <div class="modal fade" id="editOrderModal" tabindex="-1" aria-labelledby="editOrderModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editOrderModalLabel">Edit Order</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="modifierCommande">
                        <div class="mb-3">
                            <label for="orderNumber" class="form-label">Order Number</label>
                            <input v-model="commandeLocal.order_number" type="text" id="orderNumber"
                                class="form-control" required />
                        </div>

                        <div class="mb-3">
                            <label for="customerName" class="form-label">Customer Name</label>
                            <input v-model="commandeLocal.customer_name" type="text" id="customerName"
                                class="form-control" required />
                        </div>

                        <div class="mb-3">
                            <label for="orderDate" class="form-label">Order Date</label>
                            <input v-model="commandeLocal.order_date" type="date" id="orderDate" class="form-control"
                                required />
                        </div>

                        <div class="mb-3">
                            <label for="totalAmount" class="form-label">Total Amount</label>
                            <input v-model="commandeLocal.total_amount" type="number" id="totalAmount"
                                class="form-control" required />
                        </div>

                        <div class="mb-3">
                            <label for="status" class="form-label">Order Status</label>
                            <select v-model="commandeLocal.status" id="status" class="form-control" required>
                                <option value="Pending">Pending</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>

                        <!-- Notes -->
                        <div class="mb-3">
                            <label for="notes" class="form-label">Notes</label>
                            <textarea v-model="commandeLocal.notes" id="notes" class="form-control" rows="3"></textarea>
                        </div>

                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    order: Object
});
const emit = defineEmits(['order-modified']);

const commandeLocal = ref({ ...props.order });

watch(() => props.order, (nouvelleCommande) => {
    commandeLocal.value = { ...nouvelleCommande };
});

const modifierCommande = () => {
    emit('order-modified', commandeLocal.value);

    const modalElement = document.getElementById('editOrderModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
        modal.hide();
    }
};
</script>

<style scoped>
.modal-body {
    display: flex;
    flex-direction: column;
}
</style>
