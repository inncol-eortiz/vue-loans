<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">
      {{ isEditMode ? "Editar Material" : "Registrar Material" }}
    </h2>
    <form
      class="space-y-4"
      @submit.prevent="handleSubmit"
    >
      <div>
        <label
          for="brand"
          class="block text-sm font-medium text-gray-700"
        >Marca</label>
        <input
          id="brand"
          v-model="form.brand"
          type="text"
          class="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
      </div>
      <div>
        <label
          for="model"
          class="block text-sm font-medium text-gray-700"
        >Modelo</label>
        <input
          id="model"
          v-model="form.model"
          type="text"
          class="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
      </div>
      <div>
        <label
          for="material_type"
          class="block text-sm font-medium text-gray-700"
        >Tipo de Material</label>
        <input
          id="material_type"
          v-model="form.material_type"
          type="text"
          class="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
      </div>
      <div>
        <label
          for="status"
          class="block text-sm font-medium text-gray-700"
        >Estado</label>
        <select
          id="status"
          v-model="form.status"
          class="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Available">
            Disponible
          </option>
          <option value="Borrowed">
            Prestado
          </option>
          <option value="UnderMaintenance">
            En Mantenimiento
          </option>
          <option value="NotAvailable">
            No Disponible
          </option>
        </select>
      </div>
      <button
        type="submit"
        class="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {{ isEditMode ? "Actualizar Material" : "Registrar Material" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { createMaterial, updateMaterial, getMaterialById } from "../lib/api";

const router = useRouter();
const route = useRoute();
const queryClient = useQueryClient();

const isEditMode = ref(false);
const form = ref({
  brand: "",
  model: "",
  material_type: "",
  status: "Available",
});

onMounted(async () => {
  if (route.params.id) {
    isEditMode.value = true;
    try {
      const material = await getMaterialById(route.params.id);
      if (material) {
        form.value = { ...material };
      }
    } catch (error) {
      alert("Error al cargar los datos del material. Inténtalo de nuevo.");
    }
  }
});

const createMaterialMutation = useMutation({
  mutationFn: createMaterial,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["materials"] });
    router.push("/dashboard/materials");
  },
});

const updateMaterialMutation = useMutation({
  mutationFn: updateMaterial,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["materials"] });
    router.push("/dashboard/materials");
  },
});

async function handleSubmit() {
  try {
    if (isEditMode.value) {
      await updateMaterialMutation.mutateAsync(form.value);
    } else {
      await createMaterialMutation.mutateAsync(form.value);
    }
  } catch (error) {
    alert("Error al guardar el material. Inténtalo de nuevo.");
  }
}
</script>