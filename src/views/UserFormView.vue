<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">
      {{ isEditMode ? "Editar Usuario" : "Crear Usuario" }}
    </h2>
    <form
      class="space-y-4"
      @submit.prevent="handleSubmit"
    >
      <div>
        <label
          for="first_name"
          class="block text-sm font-medium text-gray-700"
        >Nombre</label>
        <input
          id="first_name"
          v-model="form.first_name"
          type="text"
          class="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
      </div>
      <div>
        <label
          for="middle_name"
          class="block text-sm font-medium text-gray-700"
        >Segundo Nombre</label>
        <input
          id="middle_name"
          v-model="form.middle_name"
          type="text"
          class="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
      </div>
      <div>
        <label
          for="last_name"
          class="block text-sm font-medium text-gray-700"
        >Apellido</label>
        <input
          id="last_name"
          v-model="form.last_name"
          type="text"
          class="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
      </div>
      <div>
        <label
          for="username"
          class="block text-sm font-medium text-gray-700"
        >Nombre de Usuario</label>
        <input
          id="username"
          v-model="form.username"
          type="text"
          class="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
      </div>
      <div>
        <label
          for="email"
          class="block text-sm font-medium text-gray-700"
        >Correo Electrónico</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
      </div>
      <div>
        <label
          for="phone_number"
          class="block text-sm font-medium text-gray-700"
        >Teléfono</label>
        <input
          id="phone_number"
          v-model="form.phone_number"
          type="text"
          class="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
      </div>
      <div>
        <label
          for="password"
          class="block text-sm font-medium text-gray-700"
        >Contraseña</label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          class="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
      </div>
      <div>
        <label
          for="user_type"
          class="block text-sm font-medium text-gray-700"
        >Tipo de Usuario</label>
        <select
          id="user_type"
          v-model="form.user_type"
          class="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Student">
            Estudiante
          </option>
          <option value="Teacher">
            Docente
          </option>
          <option value="Secretary">
            Secretarial
          </option>
          <option value="Executive">
            Ejecutivo
          </option>
          <option value="Administrative">
            Administrativo
          </option>
          <option value="LabTechnician">
            Laboratorista
          </option>
        </select>
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
          <option value="Active">
            Activo
          </option>
          <option value="Inactive">
            Inactivo
          </option>
          <option value="Blocked">
            Bloqueado
          </option>
          <option value="Suspended">
            Suspendido
          </option>
        </select>
      </div>
      <button
        type="submit"
        class="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {{ isEditMode ? "Actualizar Usuario" : "Crear Usuario" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { createUser, updateUser, getUsers, getUserById } from "../lib/api";

const router = useRouter();
const route = useRoute();
const queryClient = useQueryClient();

const isEditMode = ref(false);
const form = ref({
  first_name: "",
  middle_name: "",
  last_name: "",
  username: "",
  email: "",
  phone_number: "",
  password: "",
  user_type: "Student",
  status: "Active",
});

onMounted(async () => {
  if (route.params.id) {
    isEditMode.value = true;
    const user = await getUserById(route.params.id);
    if (user)
      form.value = { ...user };

  }
});

const createUserMutation = useMutation({
  mutationFn: createUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
    router.push("/dashboard/users");
  },
});

const updateUserMutation = useMutation({
  mutationFn: updateUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
    router.push("/dashboard/users");
  },
});

async function handleSubmit() {
  try {
    if (isEditMode.value) {
      await updateUserMutation.mutateAsync(form.value);
    } else {
      await createUserMutation.mutateAsync(form.value);
    }
  } catch (error) {
    alert("Error al guardar el usuario. Inténtalo de nuevo.");
  }
}
</script>