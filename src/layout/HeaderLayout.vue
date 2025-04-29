<template>
  <header class="bg-white shadow-md p-4 flex items-center justify-between">
    <button
      class="text-gray-500 focus:outline-none lg:hidden"
      @click="toggleSidebar"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </button>
    <h2 class="text-xl font-semibold text-gray-800">
      Interfaz de Prestamos
    </h2>
  </header>
</template>

<script setup>
defineProps({
  toggleSidebar: {
    type: Function,
    required: true,
  },
});
</script>