<template>
  <div class="p-4 bg-white rounded-lg shadow-md relative">
    <h3 class="text-lg font-semibold text-gray-800">
      Modelo: {{ material.model }}
    </h3>
    <p class="text-sm text-gray-600">
      Marca: {{ material.brand }}
    </p>
    <p class="text-sm text-gray-600">
      Tipo: {{ material.material_type }}
    </p>
    <p
      class="text-sm font-semibold"
      :class="{
        'text-green-500': material.status === 'Available',
        'text-yellow-500': material.status === 'Borrowed',
        'text-blue-500': material.status === 'UnderMaintenance' || material.status === 'Under Maintenance',
        'text-red-500': material.status === 'NotAvailable' || material.status === 'Not Available',
      }"
    >
      Estado: {{ getStatusLabel(material.status) }}
    </p>
    <p class="text-xs text-gray-500">
      Registrado: {{ formatDate(material.registration_date) }}
    </p>
    <p class="text-xs text-gray-500">
      Última Actualización: {{ formatDate(material.update_date) }}
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
          @click="editMaterial"
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
import { deleteMaterial } from "../lib/api";
import { format } from "date-fns";

const props = defineProps({
  material: {
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

function editMaterial() {
  router.push(`/dashboard/materials/edit/${props.material.material_id}`);
}

function formatDate(date) {
  return format(new Date(date), "MMMM dd, yyyy");
}

function getStatusLabel(status) {
  switch (status) {
    case "Available":
      return "Disponible";
    case "Borrowed":
      return "Prestado";
    case "Not Available":
      return "No Disponible";
    case "UnderMaintenance":
      return "En Mantenimiento";
    case "Under Maintenance":
      return "En Mantenimiento";
    case "NotAvailable":
      return "No Disponible";
    default:
      return "Desconocido";
  }
}

const mutation = useMutation({
  mutationKey: ["deleteMaterial"],
  mutationFn: deleteMaterial,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["materials"] });
    alert("Material eliminado correctamente.");
  },
});

async function handleDelete() {
  if (confirm("¿Estás seguro de que deseas eliminar este material?")) {
    try {
      await mutation.mutateAsync(props.material.material_id);
    } catch (error) {
      alert("Error al eliminar el material. Inténtalo de nuevo.");
    }
  }
}
</script>