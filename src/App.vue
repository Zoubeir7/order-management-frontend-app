<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" @click="toggleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div :class="['collapse', 'navbar-collapse', { show: isNavbarVisible }]" id="navbarNav">
                <ul class="navbar-nav me-auto ml-3 mb-lg-0 container">
                    <li class="nav-item">
                        <RouterLink :class="['nav-link', { active: route.path === '/' }]" to="/">
                            <i class="fas fa-users"></i> Customers
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink :class="['nav-link', { active: route.path === '/Products' }]" to="/Products">
                            <i class="fas fa-box-open"></i> Products
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink :class="['nav-link', { active: route.path.startsWith('/Orders') }]" to="/Orders">
                            <i class="fas fa-shopping-cart"></i> Orders
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container">
        <RouterView />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const isNavbarVisible = ref(false);

const route = useRoute();

function toggleNavbar() {
    isNavbarVisible.value = !isNavbarVisible.value;
}
</script>

<style scoped>
body {
    background-color: #f8f9fa;
}

.navbar-nav li i {
    margin-left: 10px;
}

.nav-link i {
    margin: 10px;
}

#navbarNav .nav-item .nav-link {
    margin: 5px;
}

.nav-link.active {
    color: rgb(78, 78, 245) !important;
}

#navbarNav {
    margin-left: 30px;
}
</style>
