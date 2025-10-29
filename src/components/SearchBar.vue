<script setup>
import { ref, computed } from "vue";
import { categories } from "./products";
import { useRouter } from "vue-router";

//.flatMap() is a combination of .map() + .flat() -> creates new array for each element, falttens nested arrays by 1 level
// For each category in categories, we are returning an array ([...]) that contains:
// An object representing the category itself.
// A list of all products in that category, transformed into search friendly objects
//ex. [
//   { type: "category", name: "Beer" },
//   { type: "product", name: "Lagunitas IPA", category: "Beer", id: 101 },
//   { type: "product", name: "Space Dust IPA", category: "Beer", id: 102 },
//   { type: "product", name: "Cass 6-pack", category: "Beer", id: 103 },
//   ...
// ]
const searchItems = categories.flatMap((category) => [
  { type: "category", name: category.name },
  ...category.products.map((product) => ({
    type: "product",
    name: product.name,
    category: category.name,
    id: product.id,
  })),
]);

//search
const query = ref("");

// filter suggestions based on query
const filteredSuggestions = computed(() => {
  // if no search
  if (!query.value) return [];
  return searchItems.filter((item) =>
    item.name.toLowerCase().includes(query.value.toLowerCase())
  );
});

// what happens when they select item
const router = useRouter();
function handleSelect(item) {
  // clears search
  query.value = "";
  // if category navigates to category page, if specific item goes to product details
  if (item.type === "category") {
    router.push(`/products/${item.name}`);
  } else {
    router.push(`/products/${item.category}/${item.id}`);
  }
}
</script>

<template>
  <div class relative w-80>
    <input
      v-model="query"
      type="text"
      placeholder="Search"
      class="w-full p-2 border rounded"
    />

    <!-- Suggestions Dropdown -->
    <!-- Only show suggestions if user types -->
    <ul
      v-if="filteredSuggestions.length"
      class="absolute bg-white border w-full mt-1 rounded shadow-lg z-50"
    >
      <!--  -->
      <li
        v-for="(item, index) in filteredSuggestions"
        :key="index"
        class="p-2 hover:bg-gray-200 cursor-pointer"
        @click="handleSelect(item)"
      >
        <!-- loop through suggestions item -> if search is included in names of category/products -->
        <!-- if item.type is category include "Category :" in search span then in li item.name will show otherwise just item name of product-->
        <span>{{ item.type === "category" ? "Category: " : "" }}</span
        >{{ item.name }}
      </li>
    </ul>
  </div>
</template>
