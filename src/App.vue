<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" @click="toggleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div :class="['collapse', 'navbar-collapse', { show: isNavbarVisible }]" id="navbarNav">
                <ul class="navbar-nav me-auto mr-2 mb-lg-0 container">
                    <li class="nav-item">
                        <!-- Customers Icon and Link -->
                        <RouterLink class="nav-link" to="/">
                            <i class="fas fa-users"></i> Customers
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <!-- Products Icon and Link -->
                        <RouterLink class="nav-link" to="/Products">
                            <i class="fas fa-box-open"></i> Products
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <!-- Orders Icon and Link -->
                        <RouterLink class="nav-link" to="/Orders">
                            <i class="fas fa-shopping-cart"></i> Orders
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <!-- Main Content -->
    <div class="container">
        <RouterView />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const isNavbarVisible = ref(false);

function toggleNavbar() {
    isNavbarVisible.value = !isNavbarVisible.value;
}
</script>

<style scoped>
body {
    background-color: #f8f9fa;
}

.nav-link i {
    margin-right: 20px;
}
</style>
