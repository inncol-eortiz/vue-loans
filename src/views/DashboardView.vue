<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <Header :toggleSidebar="toggleSidebar" />

      <!-- Content -->
      <main class="flex-1 p-4 ">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "../layout/SideBar.vue";
import Header from "../layout/HeaderLayout.vue";

const isSidebarOpen = ref(true);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>