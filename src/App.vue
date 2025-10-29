<script setup>
import { ref } from "vue";
import AgeVerification from "./components/AgeVerification.vue";
import HeroLogo from "./components/HeroLogo.vue";
import SearchBar from "./components/SearchBar.vue";

//Controls mobile menu toggle
const isOpen = ref(false);
</script>

<template>
  <div
    class="relative min-h-screen overflow-x-hidden"
    :class="{ 'overflow-hidden h-screen': isOpen }"
  >
    <!-- Age Verification Gateway Modal -->
    <AgeVerification />

    <!-- Hero logo (always visible, can overlap navbar if styled in HeroLogo.vue) -->
    <HeroLogo @click="isOpen = false" />
    <!-- Nav Bar -->
    <nav
      class="bg-gray-200 border-b border-gray-300 text-black h-32 flex justify-end relative z-50"
    >
      <!-- Desktop Nav hidden -->
      <div class="hidden sm:flex mt-20 gap-6 px-20">
        <SearchBar />

        <router-link to="/" class="transition transform hover:scale-105"
          >Home</router-link
        >
        <router-link to="/products" class="transition transform hover:scale-105"
          >Products</router-link
        >
        <router-link to="/about" class="transition transform hover:scale-105"
          >About</router-link
        >
        <router-link to="/contact" class="transition transform hover:scale-105"
          >Contact</router-link
        >
      </div>

      <!-- Mobile Hamburger Menu Button -->
      <div class="sm:hidden flex w-full justify-end p-5 mt-18 z-50">
        <button
          @click="isOpen = !isOpen"
          class="relative w-6 h-6 flex items-center justify-center"
        >
          <!-- Top span -->
          <span
            :class="[
              'absolute block h-0.5 w-full bg-black transition-all duration-300',
              isOpen
                ? 'rotate-45 translate-y-0' // rotated for X
                : '-translate-y-1', // initially slightly up
            ]"
          ></span>

          <!-- Bottom span -->
          <span
            :class="[
              'absolute block h-0.5 w-full bg-black transition-all duration-300',
              isOpen
                ? '-rotate-45 translate-y-0' // rotated for X
                : 'translate-y-1', // initially slightly down
            ]"
          ></span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 -translate-y-10"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-500 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-10"
      >
        <div
          v-if="isOpen"
          class="fixed left-0 right-0 top-32 z-40 h-[calc(100vh-8rem)] bg-gray-200 flex flex-col items-center pt-8 gap-8 text-2xl font-medium"
        >
          <router-link @click="isOpen = false" to="/">Home</router-link>
          <router-link @click="isOpen = false" to="/products"
            >Products</router-link
          >
          <router-link @click="isOpen = false" to="/about">About</router-link>
          <router-link @click="isOpen = false" to="/contact"
            >Contact</router-link
          >
        </div>
      </transition>
    </nav>
    <router-view />
  </div>
</template>
