<template>
  <div class="container mt-5">
    <h2>List of Products</h2>

    <button type="button" class="btn btn-primary float-end mb-3" @click="ouvrirModal()">
      Add new Product
    </button>
    <table class="table table-striped table-bordered mt-3">
      <thead>
        <tr>
          <th>Nom du produit</th>
          <th>Description</th>
          <th>Price</th>
          <th>Stock</th>
          <th>category</th>
          <th>Barecode</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.barcode">
          <td>{{ product.product_name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.barcode }}</td>
          <td>{{ product.status }}</td>
          <td>
            <!-- Bouton pour voir les détails du produit -->
            <button class="btn btn-info btn-sm me-2" @click="voirDetails(product)">
              <i class="fas fa-eye"></i>
            </button>
            <!-- Bouton pour éditer le produit -->
            <button class="btn btn-warning btn-sm me-2" @click="ouvrirModal(product)">
              <i class="fas fa-edit"></i>
            </button>
            <!-- Bouton pour supprimer le produit -->
            <button class="btn btn-danger btn-sm" @click="supprimerProduit(product.id)">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modale pour afficher les détails du produit -->
    <div class="modal fade" id="detailsModal" tabindex="-1" aria-labelledby="detailsModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="detailsModalLabel">Détails du produit</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p><strong>Nom:</strong> {{ produitSelectionne?.product_name }}</p>
            <p><strong>Description:</strong> {{ produitSelectionne?.description }}</p>
            <p><strong>Price:</strong> {{ produitSelectionne?.price }}</p>
            <p><strong>Stock:</strong> {{ produitSelectionne?.stock }}</p>
            <p><strong>category:</strong> {{ produitSelectionne?.category }}</p>
            <p><strong>Barecode:</strong> {{ produitSelectionne?.barcode }}</p>
            <p><strong>status:</strong> {{ produitSelectionne?.status }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Inclure la modale pour ajouter/éditer un produit -->
    <EditProductModal :product="produitSelectionne" @product-modifie="mettreAJourProduit" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import EditProductModal from './EditProduct.vue';

const products = ref([
  { id: 1, product_name: 'Product 001', description: 'High-quality product.', price: 100, stock: 50, category: 'Electronics', barcode: '123456789012', status: 'Active' },
  { id: 2, product_name: 'Product 002', description: 'Affordable product.', price: 50, stock: 100, category: 'Home Appliances', barcode: '987654321098', status: 'Inactive' },
  { id: 3, product_name: 'Product 003', description: 'Durable product.', price: 75, stock: 75, category: 'Sports', barcode: '234567890123', status: 'Active' }
]);

const produitSelectionne = ref(null);

// Fonction pour ouvrir la modale d'édition ou d'ajout
const ouvrirModal = (product = null) => {
  produitSelectionne.value = product ? { ...product } : { id: Date.now(), product_name: '', description: '', price: '', stock: '', category: '', barcode: '', status: '' }; // Nouveau produit si null
  const modalElement = new bootstrap.Modal(document.getElementById('editProductModal'));
  modalElement.show();
};

// Fonction pour voir les détails du produit
const voirDetails = (product) => {
  produitSelectionne.value = product; // Sélectionner le produit à afficher
  const modalElement = new bootstrap.Modal(document.getElementById('detailsModal')); // Ouvrir la modale de détails
  modalElement.show();
};

// Fonction pour mettre à jour le produit existant ou en ajouter un nouveau
const mettreAJourProduit = (productModifie) => {
  const index = products.value.findIndex(product => product.id === productModifie.id);
  if (index !== -1) {
    products.value[index] = productModifie; // Mise à jour du produit existant
  } else {
    products.value.push(productModifie); // Ajout d'un nouveau produit
  }
};

// Fonction pour supprimer un produit
const supprimerProduit = (id) => {
  products.value = products.value.filter(product => product.id !== id); // Suppression du produit
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