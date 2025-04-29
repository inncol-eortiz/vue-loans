<template>
  <li>
    <router-link
      :to="to"
      :class="[
        'flex items-center p-2 rounded-lg group',
        isActive ? 'bg-gray-200 text-blue-600 dark:bg-gray-700 dark:text-white' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
      ]"
    >
      <span class="ms-3">{{ text }}</span>
    </router-link>
  </li>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

// Define props
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const route = useRoute();
const isActive = computed(() => route.path === props.to);
</script>