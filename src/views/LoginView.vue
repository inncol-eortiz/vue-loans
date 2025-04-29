<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-center text-gray-800">
        Inicia Sesión
      </h1>
      <form
        class="space-y-4"
        @submit.prevent="login"
      >
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700"
          >Correo Electrónico</label>
          <input
            id="email"
            v-model="email"
            type="text"
            class="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            placeholder="ejemplo@ejemplo.com"
          >
        </div>
        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-700"
          >Password</label>
          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter your password"
            >
            <button
              type="button"
              class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
              @click="togglePasswordVisibility"
            >
              <span v-if="showPassword">🙈</span>
              <span v-else>👁️</span>
            </button>
          </div>
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </button>
      </form>
      <p class="text-sm text-center text-gray-600">
        Don't have an account?
        <a 
          href="#" 
          class="text-blue-500 hover:underline"
        >
          Sign up
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const showPassword = ref(false);

async function login() {
  try {
    await authStore.login(email.value, password.value);
    router.push("/dashboard/loans");
  } catch (error) {
    alert("Credenciales inválidas. Inténtalo de nuevo.");
  }
}

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}
</script>
