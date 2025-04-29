<template>
  <aside
    class="top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li>
          <h2 class="text-blue-300 text-3xl mb-8">
            Prestamos
          </h2>
        </li>
        <SidebarItem
          to="/dashboard/users"
          text="Usuarios"
        />
        <SidebarItem
          to="/dashboard/loans"
          text="Préstamos"
        />
        <li>
          <button
            class="flex items-center w-full p-2 text-gray-200 rounded-lg hover:bg-red-100 dark:hover:bg-gray-500 cursor-pointer"
            @click="logout"
          >
            <span class="ms-3">Cerrar sesión</span>
          </button>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import SidebarItem from "./SidebarItem.vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

function logout() {
  authStore.logout();
  router.push("/");
}
</script>