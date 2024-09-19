<template>
  <div class="container mt-5">
    <h2>List of Customers</h2>

    <button type="button" class=" btn btn-primary" @click="ouvrirModal()">
      Add New Cusmoter
    </button>
    <table class="table table-striped table-bordered mt-3">
      <thead>
        <tr>
          <th>Name</th>
          <th>Adress</th>
          <th>Email</th>
          <th>phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.email">
          <td>{{ client.customer_name }}</td>
          <td>{{ client.adress }}</td>
          <td>{{ client.email }}</td>
          <td>{{ client.phone }}</td>
          <td>
            <button class="btn btn-info btn-sm me-2" @click="voirDetails(client)">
              <i class="fas fa-eye"></i>
            </button>
            <button class="btn btn-warning btn-sm me-2" @click="ouvrirModal(client)">
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
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="detailsModalLabel">Détails du client</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p><strong>Nom:</strong> {{ clientSelectionne?.customer_name }}</p>
            <p><strong>Adresse:</strong> {{ clientSelectionne?.adress }}</p>
            <p><strong>Email:</strong> {{ clientSelectionne?.email }}</p>
            <p><strong>Téléphone:</strong> {{ clientSelectionne?.phone }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          </div>
        </div>
      </div>
    </div>

    <EditModal :client="clientSelectionne" @client-modifie="mettreAJourClient" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import EditModal from './EditCusmoter.vue';
const clients = ref([
  { id: 1, customer_name: 'John Doe', adress: '123 Main St, New York, NY', email: 'johndoe@example.com', phone: '123-456-7890' },
  { id: 2, customer_name: 'Jane Smith', adress: '456 Oak St, Los Angeles, CA', email: 'janesmith@example.com', phone: '098-765-4321' },
]);

const clientSelectionne = ref(null);

const ouvrirModal = (client = null) => {
  clientSelectionne.value = client ? { ...client } : { id: Date.now(), customer_name: '', adress: '', email: '', phone: '' };
  const modalElement = new bootstrap.Modal(document.getElementById('editClientModal'));
  modalElement.show();
};

const voirDetails = (client) => {
  clientSelectionne.value = client;
  const modalElement = new bootstrap.Modal(document.getElementById('detailsModal'));
  modalElement.show();
};

const mettreAJourClient = (clientModifie) => {
  const index = clients.value.findIndex(client => client.id === clientModifie.id);
  if (index !== -1) {
    clients.value[index] = clientModifie;
  } else {
    clients.value.push(clientModifie);
  }
};

const supprimerClient = (id) => {
  clients.value = clients.value.filter(client => client.id !== id);
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
