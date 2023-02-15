<script setup>
import { useCookies } from "vue3-cookies";
// import { ref} from "vue";
import { useRouter } from "vue-router";

const { cookies } = useCookies();
const cookieUserId = cookies.get("userId");
const router = useRouter();

//ログアウト
const rogout = () => {
  cookies.remove("userId");
  cookies.remove("userName");
  cookies.remove("isLoggedIn");
  router.push("/");
};
</script>

<template>
  <header class="bg-blue-400 p-4 sticky top-0 z-50">
    <nav class="flex justify-between mx-auto container items-center">
      <router-link
        class="hover:text-green-200 transition-all duration-300 text-4xl"
        to="/"
        >Vue3</router-link
      >
      <div class="space-x-12 font-bold" v-if="cookieUserId">
        <router-link
          to="/cart"
          class="hover:text-green-200 transition-all duration-300"
          >カート</router-link
        >
        <router-linkp
          to="/pay"
          class="hover:text-green-200 transition-all duration-300"
          >決済</router-linkp
        >
        <a
          to="/"
          class="hover:text-green-200 transition-all duration-300"
          @click="rogout()"
          >ログアウト</a
        >
      </div>
      <div class="space-x-12 font-bold" v-else>
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
        <router-link
          to="/Rogin"
          class="hover:text-green-200 transition-all duration-300"
          >ログイン</router-link
        >
      </div>
    </nav>
  </header>
  <div class="bg-gray-200">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
