<template>
    <div class="modal fade" id="editClientModal" tabindex="-1" aria-labelledby="editClientModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editClientModalLabel">Edit Customer</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="modifierClient">
                        <div class="mb-3">
                            <label for="customerName" class="form-label">Customer Name</label>
                            <input v-model="clientLocal.customer_name" type="text" id="customerName"
                                class="form-control" required />
                        </div>
                        <div class="mb-3">
                            <label for="address" class="form-label">Address</label>
                            <input v-model="clientLocal.address" type="text" id="address" class="form-control"
                                required />
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input v-model="clientLocal.email" type="email" id="email" class="form-control" required />
                        </div>
                        <div class="mb-3">
                            <label for="phone" class="form-label">Phone</label>
                            <input v-model="clientLocal.phone" type="text" id="phone" class="form-control" required />
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
    client: Object
});
const emit = defineEmits(['client-modifie']);

const clientLocal = ref({ ...props.client });

watch(() => props.client, (nouveauClient) => {
    clientLocal.value = { ...nouveauClient };
});

const modifierClient = () => {
    emit('client-modifie', clientLocal.value);
    const modalElement = document.getElementById('editClientModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
        modal.hide();
    }
};
</script>

<style scoped></style>
