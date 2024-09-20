<template>
  <div class="modal fade" id="addClientModal" tabindex="-1" aria-labelledby="addClientModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addClientModalLabel">Add New Customer</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="ajouterClient">
            <div class="mb-3">
              <label for="customerName" class="form-label">Customer Name</label>
              <input v-model="nouveauClient.customer_name" type="text" id="customerName" class="form-control"
                required />
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">Address</label>
              <input v-model="nouveauClient.address" type="text" id="address" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input v-model="nouveauClient.email" type="email" id="email" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label">Phone</label>
              <input v-model="nouveauClient.phone" type="text" id="phone" class="form-control" required />
            </div>
          </form>
        </div>
        <div class="modal-footer d-flex justify-content-end gap-2">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits(['client-ajoute']);

const nouveauClient = ref({
  id: Date.now(),
  customer_name: '',
  address: '',
  email: '',
  phone: ''
});

const ajouterClient = () => {
  emit('client-ajoute', { ...nouveauClient.value });
  const modalElement = document.getElementById('addClientModal');
  const modal = bootstrap.Modal.getInstance(modalElement);
  if (modal) {
    modal.hide();
  }
};
</script>

<style scoped></style>
