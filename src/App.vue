<script setup>
import { useCookies } from "vue3-cookies";
import { ref, computed } from "vue";

const { cookies } = useCookies();
const cookieUserId = cookies.get("userId");

const aaaa =  computed(() => {
  const cookie = ref({
    userId: "",
  });
  cookie.value = {
    userId: cookieUserId,
  };
  // console.log(cookieUserId !== null);
  return cookieUserId !== null;
});
console.log(aaaa.value)
</script>

<template>
  <header class="bg-blue-400 p-4 sticky top-0 z-50">
    <nav class="flex justify-between mx-auto container items-center">
      <router-link
        class="hover:text-green-200 transition-all duration-300 text-4xl"
        to="/"
        >Vue3</router-link
      >
      <div class="space-x-12 font-bold" v-if="!computed">
        <router-link
          to="/cart"
          class="hover:text-green-200 transition-all duration-300"
          >カート</router-link
        >
        <router-link
          to="/pay"
          class="hover:text-green-200 transition-all duration-300"
          >決済</router-link
        >
      </div>
      <div class="space-x-12 font-bold" v-else>
        <router-link
          to="/Rogin"
          class="hover:text-green-200 transition-all duration-300"
          >ログイン</router-link
        >
        <router-link
          to="/cart"
          class="hover:text-green-200 transition-all duration-300"
          >カート</router-link
        >
        <router-link
          to="/pay"
          class="hover:text-green-200 transition-all duration-300"
          >決済</router-link
        >
      </div>
    </nav>
  </header>
  <div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
