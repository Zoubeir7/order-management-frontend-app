<template>
    <div class="modal fade" id="editProductModal" tabindex="-1" aria-labelledby="editProductModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editProductModalLabel">Edit Product</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="modifierProduit">
                        <!-- Product Name -->
                        <div class="mb-3">
                            <label for="productName" class="form-label">Product Name</label>
                            <input v-model="produitLocal.product_name" type="text" id="productName" class="form-control"
                                required />
                        </div>

                        <!-- Category -->
                        <div class="mb-3">
                            <label for="category" class="form-label">Category</label>
                            <input v-model="produitLocal.category" type="text" id="category" class="form-control"
                                required />
                        </div>

                        <!-- Price -->
                        <div class="mb-3">
                            <label for="price" class="form-label">Price</label>
                            <input v-model="produitLocal.price" type="number" id="price" class="form-control"
                                required />
                        </div>

                        <!-- Stock Quantity -->
                        <div class="mb-3">
                            <label for="stock" class="form-label">Stock Quantity</label>
                            <input v-model="produitLocal.stock" type="number" id="stock" class="form-control"
                                required />
                        </div>

                        <!-- Barcode -->
                        <div class="mb-3">
                            <label for="barcode" class="form-label">Barcode</label>
                            <input v-model="produitLocal.barcode" type="text" id="barcode" class="form-control"
                                required />
                        </div>

                        <!-- Status -->
                        <div class="mb-3">
                            <label for="status" class="form-label">Status</label>
                            <select v-model="produitLocal.status" id="status" class="form-control" required>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        <!-- Description -->
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea v-model="produitLocal.description" id="description" class="form-control"
                                rows="3"></textarea>
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

// Receiving props from the parent component
const props = defineProps({
    product: Object
});
const emit = defineEmits(['product-modified']);

// Local copy of the product to edit
const produitLocal = ref({ ...props.product });

// Watch for any updates to the product prop and sync the local state
watch(() => props.product, (nouveauProduit) => {
    produitLocal.value = { ...nouveauProduit };
});

// Function to handle product modification
const modifierProduit = () => {
    // Emit the modified product data
    emit('product-modified', produitLocal.value);

    // Close the modal
    const modalElement = document.getElementById('editProductModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
        modal.hide();
    }
};
</script>

<style scoped>
/* Add any specific styles here */
</style>
