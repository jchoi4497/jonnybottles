<script setup>
import { ref, computed, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import { categories } from "../components/products.js";

const route = useRoute();

// Compute selected category from URL parameter
const selectedCategory = computed(() => {
  const cat = route.params.category;
  return cat ? categories.find((c) => c.name === cat) : null;
});

// tag filter state
const selectedTag = ref("ALL");

// creates computed property - value that automatically updates whenever dependencies change
const filteredProducts = computed(() => {
  if (!selectedCategory.value) return [];
  if (selectedTag.value === "ALL") return selectedCategory.value.products;
  return selectedCategory.value.products.filter((p) =>
    p.tags.includes(selectedTag.value)
  );
});

// built in watch function looks for change
watch(
  () => route.params.category,
  async (newCategory) => {
    if (newCategory) {
      // Wait for DOM to update
      await nextTick();

      // Scroll smoothly to the products section
      const section = document.getElementById("products-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }
);
</script>

<template>
  <div
    class="p-4 flex flex-col items-center min-h-screen pb-76 overscroll-contain"
  >
    <!-- Breadcrumbs -->
    <nav
      class="text-sm mb-4 flex flex-wrap gap-1 text-gray-600 w-full max-w-5xl"
    >
      <router-link to="/products" class="hover:text-green-500"
        >Products</router-link
      >
      <span v-if="selectedCategory">/</span>
      <span v-if="selectedCategory" class="font-semibold">{{
        selectedCategory.name
      }}</span>
    </nav>

    <!-- Categories list -->
    <div class="mb-8 w-full max-w-5xl">
      <h1 class="text-2xl font-bold mb-4">Categories</h1>
      <div class="flex flex-wrap gap-4">
        <router-link
          v-for="category in categories"
          :key="category.id"
          :to="`/products/${category.name}`"
          class="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-200 cursor-pointer hover:bg-green-100 transition flex flex-col items-center shadow-xl transform hover:scale-105"
          :class="{
            'bg-green-200 border-green-400':
              route.params.category === category.name,
          }"
        >
          <div class="w-36 h-36 flex items-center justify-center mb-2">
            <img
              :src="category.logo.img"
              :alt="category.name"
              class="max-w-full max-h-full object-contain rounded-md"
            />
          </div>
          <span class="font-semibold text-center">{{ category.name }}</span>
        </router-link>
      </div>
    </div>

    <!-- Show selected category items -->
    <div v-if="selectedCategory" id="products-section" class="w-full max-w-5xl">
      <h1 class="text-xl font-bold mb-3 text-center">
        {{ selectedCategory.name }}
      </h1>
      <div class="flex flex-wrap justify-center gap-4">
        <router-link
          v-for="product in selectedCategory.products"
          :key="selectedCategory.id + '-' + product.id + '-' + product.name"
          :to="`/products/${selectedCategory.name}/${product.id}`"
          class="w-44 h-56 p-3 rounded-lg shadow-xl flex flex-col items-center bg-white transition transform hover:scale-105"
        >
          <div class="w-36 h-36 flex items-center justify-center mb-2">
            <img
              :src="product.img"
              :alt="product.name"
              class="max-w-full max-h-full object-contain rounded-md"
            />
          </div>
          <h2 class="text-sm font-semibold text-center">{{ product.name }}</h2>
        </router-link>
      </div>
    </div>

    <!-- If no category selected -->
    <div v-else class="text-gray-500 italic">
      Please choose a category above.
    </div>
  </div>
</template>
