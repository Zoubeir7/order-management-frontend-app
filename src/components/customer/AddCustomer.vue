<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Create new customer</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="form-group mb-3">
            <label for="customer_name" class="form-label">Customer Name</label>
            <input type="text" name="customer_name" class="form-control" v-model="nouveauClient.customer_name"
              required />
          </div>

          <div class="form-group mb-3">
            <label for="address" class="form-label">Address</label>
            <textarea name="address" class="form-control" v-model="nouveauClient.address" required></textarea>
          </div>

          <div class="form-group mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" name="email" class="form-control" v-model="nouveauClient.email" required />
          </div>

          <div class="form-group mb-3">
            <label for="phone" class="form-label">Phone</label>
            <input type="text" name="phone" class="form-control" v-model="nouveauClient.phone" required />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="ajouterClient">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits, onMounted } from 'vue';

const nouveauClient = ref({
  customer_name: '',
  address: '',
  email: '',
  phone: ''
});

const emit = defineEmits();
let modalInstance = null;

// Initialize the modal when the component is mounted
onMounted(() => {
  modalInstance = new bootstrap.Modal(document.getElementById('exampleModal'));
});

const ajouterClient = () => {
  if (!nouveauClient.value.customer_name || !nouveauClient.value.address || !nouveauClient.value.email || !nouveauClient.value.phone) {
    alert('Please fill out all fields');
    return;
  }

  // Emit the event with the new customer data
  emit('client-added', { ...nouveauClient.value });

  // Reset the form fields
  nouveauClient.value = {
    customer_name: '',
    address: '',
    email: '',
    phone: ''
  };

  // Close the modal
  modalInstance.hide();
};
</script>
<style scoped>
.modal-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.modal-footer {
  background-color: #f8f9fa;
  border-top: 1px solid #dee2e6;
}

.btn-close {
  background-color: transparent;
}

.btn-secondary,
.btn-primary {
  padding: 0.5rem 1rem;
}
</style>
