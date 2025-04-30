<template>
  <div class="p-4 bg-white rounded-lg shadow-md relative">
    <h3 class="text-lg font-semibold text-gray-800">
      Préstamo ID: {{ loan.loan_id }}
    </h3>
    <p class="text-sm text-gray-600">
      Usuario: {{ loan.user.first_name }} {{ loan.user.middle_name }} {{ loan.user.last_name }}
    </p>
    <p class="text-sm text-gray-600">
      Material: {{ loan.material.brand }} - {{ loan.material.model }}
    </p>
    <p class="text-sm text-gray-600">
      Tipo de Material: {{ loan.material.material_type }}
    </p>
    <p
      class="text-sm font-semibold"
      :class="{
        'text-green-500': loan.loan_status === 'Active',
        'text-blue-500': loan.loan_status === 'Returned',
        'text-red-500': loan.loan_status === 'Overdue',
      }"
    >
      Estado del Préstamo: {{ getLoanStatusLabel(loan.loan_status) }}
    </p>
    <p class="text-xs text-gray-500">
      Fecha de Préstamo: {{ formatDate(loan.loan_date) }}
    </p>
    <p class="text-xs text-gray-500">
      Fecha de Devolución: {{ formatDate(loan.return_date) }}
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
          @click="editLoan"
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
import { deleteLoan } from "../lib/api";
import { format } from "date-fns";

const props = defineProps({
  loan: {
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

function editLoan() {
  router.push(`/dashboard/loans/edit/${props.loan.loan_id}`);
}

function formatDate(date) {
  return format(new Date(date), "MMMM dd, yyyy");
}

function getLoanStatusLabel(status) {
  switch (status) {
    case "Active":
      return "Activo";
    case "Returned":
      return "Devuelto";
    case "Overdue":
      return "Atrasado";
    default:
      return "Desconocido";
  }
}

const mutation = useMutation({
  mutationKey: ["deleteLoan"],
  mutationFn: deleteLoan,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["loans"] });
    alert("Préstamo eliminado correctamente.");
  },
});

async function handleDelete() {
  if (confirm("¿Estás seguro de que deseas eliminar este préstamo?")) {
    try {
      await mutation.mutateAsync(props.loan.loan_id);
    } catch (error) {
      alert("Error al eliminar el préstamo. Inténtalo de nuevo.");
    }
  }
}
</script>