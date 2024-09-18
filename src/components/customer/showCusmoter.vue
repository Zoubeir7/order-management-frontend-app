<template>
  <div class="container mt-5">
    <h2>Liste des clients</h2>

    <button type="button" class="btn btn-primary" @click="ouvrirModal()">
      Ajouter un client
    </button>

    <!-- Table des clients -->
    <table class="table table-striped table-bordered mt-3">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Adresse</th>
          <th>Email</th>
          <th>Téléphone</th>
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
            <!-- Bouton pour voir les détails du client -->
            <button class="btn btn-info btn-sm me-2" @click="voirDetails(client)">
              <i class="fas fa-eye"></i>
            </button>
            <!-- Bouton pour éditer le client -->
            <button class="btn btn-warning btn-sm me-2" @click="ouvrirModal(client)">
              <i class="fas fa-edit"></i>
            </button>
            <!-- Bouton pour supprimer le client -->
            <button class="btn btn-danger btn-sm" @click="supprimerClient(client.id)">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modale pour afficher les détails du client -->
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

    <!-- Inclure la modale pour ajouter/éditer un client -->
    <EditModal :client="clientSelectionne" @client-modifie="mettreAJourClient" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import EditModal from './EditCusmoter.vue'; // Corriger le nom si besoin (Customer au lieu de Cusmoter)

const clients = ref([
  { id: 1, customer_name: 'John Doe', adress: '123 Main St, New York, NY', email: 'johndoe@example.com', phone: '123-456-7890' },
  { id: 2, customer_name: 'Jane Smith', adress: '456 Oak St, Los Angeles, CA', email: 'janesmith@example.com', phone: '098-765-4321' },
]);

const clientSelectionne = ref(null);

// Fonction pour ouvrir la modale d'édition ou d'ajout
const ouvrirModal = (client = null) => {
  clientSelectionne.value = client ? { ...client } : { id: Date.now(), customer_name: '', adress: '', email: '', phone: '' }; // Nouveau client si null
  const modalElement = new bootstrap.Modal(document.getElementById('editClientModal'));
  modalElement.show();
};

// Fonction pour voir les détails du client
const voirDetails = (client) => {
  clientSelectionne.value = client; // Sélectionner le client à afficher
  const modalElement = new bootstrap.Modal(document.getElementById('detailsModal')); // Ouvrir la modale de détails
  modalElement.show();
};

// Fonction pour mettre à jour le client existant ou en ajouter un nouveau
const mettreAJourClient = (clientModifie) => {
  const index = clients.value.findIndex(client => client.id === clientModifie.id);
  if (index !== -1) {
    clients.value[index] = clientModifie; // Mise à jour du client existant
  } else {
    clients.value.push(clientModifie); // Ajout d'un nouveau client
  }
};

// Fonction pour supprimer un client
const supprimerClient = (id) => {
  clients.value = clients.value.filter(client => client.id !== id); // Suppression du client
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
