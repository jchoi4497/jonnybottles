<template>
  <!-- Outer div just for positioning, not clickable -->
  <div class="absolute top-4 left-10 z-60">
    <!-- Router-link wraps only the image -->
    <router-link to="/">
      <img
        src="/Logo/bbbLogo.png"
        alt="Brown Boy Bags"
        class="h-24 w-auto object-contain cursor-pointer hover:scale-105 transition"
      />
    </router-link>
  </div>
</template>

<script setup>
// Nothing needed here
</script>
