<template>
  <div class="p-4 bg-white rounded-lg shadow-md relative">
    <h3 class="text-lg font-semibold text-gray-800">
      {{ user.first_name }} {{ user.middle_name }} {{ user.last_name }}
    </h3>
    <p class="text-sm text-gray-600">
      Email: {{ user.username }}
    </p>
    <p class="text-sm text-gray-600">
      Email: {{ user.email }}
    </p>
    <p class="text-sm text-gray-600">
      Phone: {{ user.phone_number }}
    </p>
    <p class="text-sm text-gray-600">
      Type: {{ user.user_type }}
    </p>
    <p
      class="text-sm"
      :class="user.status === 'active' ? 'text-green-500' : 'text-red-500'"
    >
      Status: {{ user.status }}
    </p>
    <p class="text-xs text-gray-500">
      Registered: {{ formatDate(user.registration_date) }}
    </p>
    <p class="text-xs text-gray-500">
      Last Updated: {{ formatDate(user.update_date) }}
    </p>
    <!-- Dropdown menu -->
    <div class="absolute top-2 right-2">
      <button
        class="text-gray-500 hover:text-gray-700"
        @click="toggleDropdown"
      >
        ⋮
      </button>
      <div
        v-if="dropdownOpen"
        class="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg"
      >
        <button
          class="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          @click="editUser"
        >
          Editar
        </button>
        <button
          class="block w-full px-4 py-2 text-left text-red-500 hover:bg-red-100"
          @click="handleDelete"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { deleteUser } from "../lib/api";
import { format } from "date-fns";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const queryClient = useQueryClient();
const dropdownOpen = ref(false);

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

function editUser() {
  router.push(`/dashboard/users/edit/${props.user.id}`);
}

function formatDate(date) {
  return format(new Date(date), "MMMM dd, yyyy");
}

const mutation = useMutation({
  mutationKey: ['deleteUser'],
  mutationFn: deleteUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
    alert("Usuario eliminado correctamente.");
  },
}
);

async function handleDelete() {
  if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
    try {
      await mutation.mutateAsync(props.user.id);
    } catch (error) {
      alert("Error al eliminar el usuario. Inténtalo de nuevo.");
    }
  }
}
</script>