<template>
  <div class="container mt-5">
    <h2>List of Customers</h2>
    <button type="button" class=" btn btn-primary float-end mb-3" @click="ouvrirModalAjout">
      Add New Customer
    </button>
    <table class="table table-striped table-bordered mt-3">
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.email">
          <td>{{ client.customer_name }}</td>
          <td>{{ client.address }}</td>
          <td>{{ client.email }}</td>
          <td>{{ client.phone }}</td>
          <td>
            <button class="btn btn-info btn-sm me-2" @click="voirDetails(client)">
              <i class="fas fa-eye"></i>
            </button>
            <button class="btn btn-warning btn-sm me-2" @click="ouvrirModalEdition(client)">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-danger btn-sm" @click="supprimerClient(client.id)">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal fade" id="detailsModal" tabindex="-1" aria-labelledby="detailsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="detailsModalLabel">View Customer</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p><strong>Customer:</strong> {{ clientSelectionne?.customer_name }}</p>
            <p><strong>Address:</strong> {{ clientSelectionne?.address }}</p>
            <p><strong>Email:</strong> {{ clientSelectionne?.email }}</p>
            <p><strong>Phone:</strong> {{ clientSelectionne?.phone }}</p>
          </div>
          <div class="modal-footer d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <AddCustomer @client-ajoute="ajouterClient" />
    <EditCustomer :client="clientSelectionne" @client-modifie="mettreAJourClient" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AddCustomer from './AddCustomer.vue';
import EditCustomer from './EditCusmoter.vue';

const clients = ref([
  { id: 1, customer_name: 'Alice Johnson', address: '789 Elm St, San Francisco, CA', email: 'alice.johnson@example.com', phone: '555-123-4567' },
  { id: 2, customer_name: 'Bob Brown', address: '101 Pine St, Seattle, WA', email: 'bob.brown@example.com', phone: '555-987-6543' },
  { id: 3, customer_name: 'Carlos Garcia', address: '202 Maple Ave, Austin, TX', email: 'carlos.garcia@example.com', phone: '512-555-6789' },
  { id: 4, customer_name: 'Diana Martinez', address: '303 Birch Rd, Denver, CO', email: 'diana.martinez@example.com', phone: '303-555-1234' },
  { id: 5, customer_name: 'Ethan Wilson', address: '404 Cedar St, Boston, MA', email: 'ethan.wilson@example.com', phone: '617-555-5678' }
]
);

const clientSelectionne = ref(null);

const ouvrirModalAjout = () => {
  const modalElement = new bootstrap.Modal(document.getElementById('addClientModal'));
  modalElement.show();
};

const ouvrirModalEdition = (client) => {
  clientSelectionne.value = { ...client };
  const modalElement = new bootstrap.Modal(document.getElementById('editClientModal'));
  modalElement.show();
};

const ajouterClient = (client) => {
  clients.value.push({ ...client, id: Date.now() });
};

const mettreAJourClient = (client) => {
  const index = clients.value.findIndex(c => c.id === client.id);
  if (index !== -1) {
    clients.value[index] = client;
  }
};

const voirDetails = (client) => {
  clientSelectionne.value = client;
  const modalElement = new bootstrap.Modal(document.getElementById('detailsModal'));
  modalElement.show();
};

const supprimerClient = (id) => {
  const confirmation = window.confirm('Are you sure you want to delete this customer?');
  if (confirmation) {
    clients.value = clients.value.filter(client => client.id !== id);
  }
};

</script>

<style scoped></style>
