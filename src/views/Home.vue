<script setup>
// importing array from product.js
import { categories } from "../components/products.js";

// Intialize array to store featured Products.
const featuredProducts = [];

// Loop through categories and pick first product from each
categories.forEach((category) => {
  // Check if category has products
  if (category.products && category.products.length > 0) {
    //push object containing category name and first product
    featuredProducts.push({
      category: category.name,
      product: category.products[0], // product object with name & img
    });
  }
});

// Limit to 6 featured products
featuredProducts.splice(6);
</script>

<template>
  <div class="p-10 bg-gray-200 min-h-screen pb-36 overscroll-contain">
    <h1 class="text-4xl font-bold mb-6">Featured Items</h1>

    <!-- Grid layout for featured Products -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      <!-- Loop through each featured product -->
      <router-link
        v-for="(featuredProduct, i) in featuredProducts"
        :key="i"
        :to="`/products/${featuredProduct.category}/${featuredProduct.product.id}`"
        class="flex flex-col items-center p-4 rounded-2xl shadow-lg transform transition hover:scale-105"
      >
        <img
          :src="featuredProduct.product.img"
          :alt="featuredProduct.product.name"
          class="w-auto h-72 object-cover rounded mb-2"
        />
        <h2 class="font-semibold">{{ featuredProduct.product.name }}</h2>
        <p class="text-gray-500 text-sm">{{ featuredProduct.category }}</p>
      </router-link>
    </div>
  </div>
</template>
