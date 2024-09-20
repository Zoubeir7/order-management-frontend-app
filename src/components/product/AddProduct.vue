<template>
  <div class="modal fade" id="addProductModal" tabindex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addProductModalLabel">Add Product</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="ajouterProduit">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="productName" class="form-label">Product Name</label>
                <input v-model="produitLocal.product_name" type="text" id="productName" class="form-control" required />
              </div>

              <div class="col-md-6 mb-3">
                <label for="category" class="form-label">Category</label>
                <input v-model="produitLocal.category" type="text" id="category" class="form-control" required />
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="price" class="form-label">Price</label>
                <input v-model="produitLocal.price" type="number" id="price" class="form-control" required />
              </div>

              <div class="col-md-6 mb-3">
                <label for="stock" class="form-label">Stock Quantity</label>
                <input v-model="produitLocal.stock" type="number" id="stock" class="form-control" required />
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="barcode" class="form-label">Barcode</label>
                <input v-model="produitLocal.barcode" type="text" id="barcode" class="form-control" required />
              </div>

              <div class="col-md-6 mb-3">
                <label for="status" class="form-label">Status</label>
                <select v-model="produitLocal.status" id="status" class="form-control" required>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea v-model="produitLocal.description" id="description" class="form-control" rows="3"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer d-flex justify-content-end gap-2">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary" @click="ajouterProduit">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const produitLocal = ref({
  product_name: '',
  category: '',
  price: '',
  stock: '',
  barcode: '',
  status: 'Active',
  description: ''
});

const emit = defineEmits(['product-added']);

const ajouterProduit = () => {
  emit('product-added', produitLocal.value);

  const modalElement = document.getElementById('addProductModal');
  const modal = bootstrap.Modal.getInstance(modalElement);
  if (modal) {
    modal.hide();
  }

  // Reset the form after submission
  produitLocal.value = {
    product_name: '',
    category: '',
    price: '',
    stock: '',
    barcode: '',
    status: 'Active',
    description: ''
  };
};
</script>

<style scoped></style>
