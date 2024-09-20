<template>
  <div class="container mt-5">
    <h2>List of Products</h2>

    <button type="button" class="btn btn-primary float-end mb-3" @click="ouvrirModal()">
      Add new Product
    </button>

    <table class="table table-striped table-bordered mt-3">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Category</th>
          <th>Barcode</th>
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
            <button class="btn btn-info btn-sm me-2" @click="voirDetails(product)">
              <i class="fas fa-eye"></i>
            </button>

            <button class="btn btn-warning btn-sm me-2" @click="ouvrirModal(product)">
              <i class="fas fa-edit"></i>
            </button>

            <button class="btn btn-danger btn-sm" @click="supprimerProduit(product.id)">
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
            <h5 class="modal-title" id="detailsModalLabel">View Product</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p><strong>Product Name:</strong> {{ produitSelectionne?.product_name }}</p>
            <p><strong>Description:</strong> {{ produitSelectionne?.description }}</p>
            <p><strong>Price:</strong> {{ produitSelectionne?.price }}</p>
            <p><strong>Stock:</strong> {{ produitSelectionne?.stock }}</p>
            <p><strong>Category:</strong> {{ produitSelectionne?.category }}</p>
            <p><strong>Barcode:</strong> {{ produitSelectionne?.barcode }}</p>
            <p><strong>Status:</strong> {{ produitSelectionne?.status }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>


    <AddProductModal @product-added="ajouterProduit" />
    <EditProductModal :product="produitSelectionne" @product-modifie="mettreAJourProduit" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AddProductModal from './AddProduct.vue';
import EditProductModal from './EditProduct.vue';
import { Modal } from 'bootstrap';

const products = ref([
  { id: 1, product_name: 'Product 001', description: 'High-quality product.', price: 100, stock: 50, category: 'Electronics', barcode: '123456789012', status: 'Active' },
  { id: 2, product_name: 'Product 002', description: 'Affordable product.', price: 50, stock: 100, category: 'Home Appliances', barcode: '987654321098', status: 'Inactive' },
  { id: 3, product_name: 'Product 003', description: 'Durable product.', price: 75, stock: 75, category: 'Sports', barcode: '234567890123', status: 'Active' }
]);

const produitSelectionne = ref(null);

const ouvrirModal = (product = null) => {
  produitSelectionne.value = product
    ? { ...product }
    : { id: Date.now(), product_name: '', description: '', price: '', stock: '', category: '', barcode: '', status: '' };

  const modalId = product ? 'editProductModal' : 'addProductModal';
  const modalElement = document.getElementById(modalId);
  const modal = new Modal(modalElement);
  modal.show();
};

const ajouterProduit = (nouveauProduit) => {
  products.value.push({ ...nouveauProduit, id: Date.now() });
};

const voirDetails = (product) => {
  produitSelectionne.value = product;
  const modalElement = document.getElementById('detailsModal');
  const modal = new Modal(modalElement);
  modal.show();
};


const mettreAJourProduit = (productModifie) => {
  const index = products.value.findIndex(product => product.id === productModifie.id);
  if (index !== -1) {
    products.value[index] = productModifie;
  }
};
const supprimerProduit = (id) => {
  const confirmation = confirm("Are you sure you want to delete this product?");
  if (confirmation) {
    products.value = products.value.filter(product => product.id !== id);
  }
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
