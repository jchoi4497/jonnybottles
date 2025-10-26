<!-- ref() creates a reactive variable tracked by Vue.

computed() creates a derived value that updates automatically when dependencies change (!isVerified.value && route.path !== "/sorry").

onMounted() runs code after the component is loaded in the DOM.

v-if="showModal" conditionally renders the modal.

localStorage is used to remember the user across page reloads.

verifyAge(true/false) handles the two possible user choices and updates the state or redirects. -->

<script setup>
// vue composition API functions
import { ref, onMounted, computed } from "vue";
// vue router hook to get current route
import { useRoute } from "vue-router";

// reactive variable to see if user is verified(21+)
const isVerified = ref(false);
//get current route (needed to hidle modal on /sorry page)
const route = useRoute();

// When component mounts, check if user has already verified
// local storage will remember
onMounted(() => {
  isVerified.value = localStorage.getItem("isVerified") === "true";
});

// Modal shows if: user is NOT verified AND current route is NOT "/sorry" page
const showModal = computed(() => {
  return !isVerified.value && route.path !== "/sorry";
});

// function is called when user clicks yes or no
// yes - store confirmation and modal wont show again/hides modal
function verifyAge(confirmed) {
  if (confirmed) {
    localStorage.setItem("isVerified", "true");
    isVerified.value = true;
  } else {
    isVerified.value = true;
    setTimeout(() => (window.location.href = "/sorry"), 200);
  }
}
</script>

<template>
  <!-- Only shows if showModal is true -->
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center bg-black/80 z-[9999]"
  >
    <!-- Modal Box -->
    <div class="bg-white rounded-2xl p-8 text-center max-w-md mx-auto">
      <h2 class="text-2xl font-bold mb-4">Are you 21 or older?</h2>
      <p>You must be of legal age to enter this site.</p>
      <div class="flex justify-center gap-4 mt-4">
        <button
          @click="verifyAge(true)"
          class="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
        >
          Yes, I am 21+
        </button>
        <button
          @click="verifyAge(false)"
          class="bg-gray-300 px-6 py-2 rounded-full hover:bg-gray-400"
        >
          No
        </button>
      </div>
    </div>
  </div>
</template>
