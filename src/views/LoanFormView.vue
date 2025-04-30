<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">
      {{ isEditMode ? "Editar Préstamo" : "Registrar Préstamo" }}
    </h2>
    <form
      class="space-y-4"
      @submit.prevent="handleSubmit"
    >
      <div>
        <label
          for="user_id"
          class="block text-sm font-medium text-gray-700"
        >Usuario</label>
        <select
          id="user_id"
          v-model="form.user_id"
          class="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option
            v-for="user in users"
            :key="user.id"
            :value="user.id"
          >
            {{ user.first_name }} {{ user.middle_name }} {{ user.last_name }}
          </option>
        </select>
      </div>
      <div>
        <label
          for="material_id"
          class="block text-sm font-medium text-gray-700"
        >Material</label>
        <select
          id="material_id"
          v-model="form.material_id"
          class="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option
            v-for="material in materials"
            :key="material.material_id"
            :value="material.material_id"
          >
            {{ material.brand }} - {{ material.model }} ({{ material.material_type }})
          </option>
        </select>
      </div>
      <div>
        <label
          for="loan_status"
          class="block text-sm font-medium text-gray-700"
        >Estado del Préstamo</label>
        <select
          id="loan_status"
          v-model="form.loan_status"
          class="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Active">
            Activo
          </option>
          <option value="Returned">
            Devuelto
          </option>
          <option value="Overdue">
            Atrasado
          </option>
        </select>
      </div>
      <div>
        <label
          for="loan_date"
          class="block text-sm font-medium text-gray-700"
        >Fecha de Préstamo</label>
        <input
          id="loan_date"
          v-model="form.loan_date"
          type="date"
          class="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
      </div>
      <div>
        <label
          for="return_date"
          class="block text-sm font-medium text-gray-700"
        >Fecha de Devolución</label>
        <input
          id="return_date"
          v-model="form.return_date"
          type="date"
          class="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
      </div>
      <button
        type="submit"
        class="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {{ isEditMode ? "Actualizar Préstamo" : "Registrar Préstamo" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { getUsers, getMaterials, createLoan, updateLoan, getLoanById } from "../lib/api";

const router = useRouter();
const route = useRoute();
const queryClient = useQueryClient();

const isEditMode = ref(false);
const form = ref({
  user_id: "",
  material_id: "",
  loan_status: "Active",
  loan_date: "",
  return_date: "",
});

const { data: users = [] } = useQuery({ queryKey: ["users"], queryFn: getUsers });
const { data: materials = [] } = useQuery({ queryKey: ["materials"], queryFn: getMaterials });

onMounted(async () => {
  if (route.params.id) {
    isEditMode.value = true;
    try {
      const loan = await getLoanById(route.params.id);
      if (loan) {
        form.value = { ...loan };
      }
    } catch (error) {
      alert("Error al cargar los datos del préstamo. Inténtalo de nuevo.");
    }
  }
});

const createLoanMutation = useMutation({
  mutationFn: createLoan,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["loans"] });
    router.push("/dashboard/loans");
  },
});

const updateLoanMutation = useMutation({
  mutationFn: updateLoan,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["loans"] });
    router.push("/dashboard/loans");
  },
});

async function handleSubmit() {
  try {
    if (isEditMode.value) {
      await updateLoanMutation.mutateAsync(form.value);
    } else {
      await createLoanMutation.mutateAsync(form.value);
    }
  } catch (error) {
    alert("Error al guardar el préstamo. Inténtalo de nuevo.");
  }
}
</script>