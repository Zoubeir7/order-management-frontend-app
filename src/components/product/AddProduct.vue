<template>
    <div class="modal fade" id="addProductModal" tabindex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addProductModalLabel">Create New Product</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Product Name -->
            <div class="form-group mb-3">
              <label for="product_name" class="form-label">Product Name</label>
              <input type="text" name="product_name" class="form-control" v-model="newProduct.product_name" required />
            </div>
  
            <!-- Category -->
            <div class="form-group mb-3">
              <label for="category" class="form-label">Category</label>
              <input type="text" name="category" class="form-control" v-model="newProduct.category" required />
            </div>
  
            <!-- Price -->
            <div class="form-group mb-3">
              <label for="price" class="form-label">Price</label>
              <input type="number" name="price" class="form-control" v-model="newProduct.price" required />
            </div>
  
            <!-- Stock Quantity -->
            <div class="form-group mb-3">
              <label for="stock" class="form-label">Stock Quantity</label>
              <input type="number" name="stock" class="form-control" v-model="newProduct.stock" required />
            </div>
  
            <!-- Barcode -->
            <div class="form-group mb-3">
              <label for="barcode" class="form-label">Barcode</label>
              <input type="text" name="barcode" class="form-control" v-model="newProduct.barcode" required />
            </div>
  
            <!-- Status -->
            <div class="form-group mb-3">
              <label for="status" class="form-label">Status</label>
              <select name="status" class="form-control" v-model="newProduct.status">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
  
            <!-- Description -->
            <div class="form-group mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea name="description" class="form-control" v-model="newProduct.description" rows="3"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="addProduct">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits, onMounted } from 'vue';
  
  const newProduct = ref({
    product_name: '',
    category: '',
    price: 0,
    stock: 0,
    barcode: '',
    status: 'Active',
    description: ''
  });
  
  const emit = defineEmits();
  let modalInstance = null;
  
  // Initialize the modal when the component is mounted
  onMounted(() => {
    modalInstance = new bootstrap.Modal(document.getElementById('addProductModal'));
  });
  
  const addProduct = () => {
    if (!newProduct.value.product_name || !newProduct.value.category || !newProduct.value.price || !newProduct.value.stock || !newProduct.value.barcode) {
      alert('Please fill out all fields');
      return;
    }
  
    // Emit the event with the new product data
    emit('product-added', { ...newProduct.value });
  
    // Reset the form fields
    newProduct.value = {
      product_name: '',
      category: '',
      price: 0,
      stock: 0,
      barcode: '',
      status: 'Active',
      description: ''
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
  