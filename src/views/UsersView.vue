<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-bold text-gray-800">
        Usuarios
      </h2>
      <button
        class="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        @click="goToCreateUser"
      >
        Crear Usuario
      </button>
    </div>
    <p class="text-gray-600 mb-6">
      Administra aquí los usuarios de la aplicación. Puedes ver, editar y eliminar usuarios existentes.
    </p>

    <div
      v-if="isLoading"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div
        v-for="n in 6"
        :key="n"
        class="p-4 bg-gray-200 rounded-lg animate-pulse"
      >
        <div class="h-6 bg-gray-300 rounded mb-2" />
        <div class="h-4 bg-gray-300 rounded mb-2" />
        <div class="h-4 bg-gray-300 rounded mb-2" />
        <div class="h-4 bg-gray-300 rounded" />
      </div>
    </div>

    <div
      v-else-if="isError"
      class="p-4 bg-red-100 text-red-700 rounded-lg"
    >
      <p>
        <strong>Error:</strong> Failed to load users. Please try again.
      </p>
    </div>
    
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <UserCard
        v-for="user in users"
        :key="user.id"
        :user="user"
      />
    </div>
  </div>
</template>

<script setup>
import { useQuery } from "@tanstack/vue-query";
import UserCard from "../components/UserCard.vue";
import { getUsers } from "../lib/api";
import { useRouter } from "vue-router";

const router = useRouter();

const { data: users, isLoading, isError } = useQuery({ queryKey: ["users"], queryFn: getUsers });

function goToCreateUser() {
  router.push("/dashboard/users/create");
}
</script>