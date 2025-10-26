<script setup>
// Import Vue Router hook to access route parameters
import { useRoute } from "vue-router";
// Import computed to create reactive computed properties
import { computed } from "vue";
// Import categories data containing all products
import { categories } from "../components/products.js";

// Get access to the current route
const route = useRoute();

// Compute the selected category based on URL parameter
// For example, route.params.category might be "Flower"
const selectedCategory = computed(() =>
  categories.find((category) => category.name === route.params.category)
);

// Compute the selected product based on URL parameter
// For example, route.params.id might be "1"
// We find the product inside the selected category
const product = computed(() => {
  if (!selectedCategory.value) return null; // return null if category not found
  return selectedCategory.value.products.find(
    (p) => p.id.toString() === route.params.id // match product ID from URL
  );
});
</script>

<template>
  <div class="p-8 max-w-md mx-auto min-h-screen pb-32 overscroll-contain">
    <!-- Breadcrumbs -->
    <nav class="text-sm mb-6 flex flex-wrap gap-1 text-gray-600">
      <!-- Products main page -->
      <router-link to="/products" class="hover:text-green-500"
        >Products</router-link
      >
      <span>/</span>
      <!-- Category -->
      <router-link
        v-if="selectedCategory"
        :to="`/products/${selectedCategory.name}`"
        class="hover:text-green-500"
      >
        {{ selectedCategory.name }}
      </router-link>
      <span v-if="selectedCategory">/</span>
      <!-- Current Product (not clickable) -->
      <span class="font-semibold">{{ product?.name }}</span>
    </nav>

    <!-- Product Details -->
    <div v-if="product" class="text-center">
      <img
        :src="product.img"
        :alt="product.name"
        class="w-full h-72 object-contain rounded-2xl mb-4 shadow-lg transform transition hover:scale-105"
      />
      <h1 class="text-2xl font-bold mb-2">{{ product.name }}</h1>
      <p class="text-gray-500 mb-4">Description: {{ product.description }}</p>
    </div>

    <div v-else class="text-gray-500 italic text-center">
      Product not found.
    </div>
  </div>
</template>
