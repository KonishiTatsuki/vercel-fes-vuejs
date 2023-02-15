<script setup>
import { supabase } from "../supabase";
import { ref } from "vue";
// import { ref, computed } from "vue";
import { useCookies } from "vue3-cookies";
import { useRouter } from "vue-router";
// import {computed} from "./HomeView.vue"

const datas = ref([]);
const user = ref({
  mailAddress: "",
  password: "",
});
//エラーメッサージ表示・非表示
const error = ref(false);
const { cookies } = useCookies();
const router = useRouter();

const getCarts = async () => {
  let { data: users } = await supabase.from("users").select("*");
  datas.value = users;
};
getCarts();

const checkUser = async () => {
  let { data: checkUser } = await supabase
    .from("users")
    .select("*")
    .eq("mailAddress", user.value.mailAddress)
    .eq("password", user.value.password);

  if (checkUser[0]) {
    // const aaaa = computed(() => {
    //   const cookie = ref({
    //     cookieUserId: "",
    //     cookieUserName: "",
    //   });
    //   console.log("computedの中");
    //   cookies.set("userId", checkUser[0].id);
    //   cookies.set("userName", checkUser[0].userName);
    //   cookies.set("isLoggedIn", false);
    //   const cookieUserId = cookies.get("userId");
    //   const cookieUserName = cookies.get("userName");
    //   cookie.value = { cookieUserId: cookieUserId, userName: cookieUserName };
    //   return cookie.value;
    // });
    // console.log(aaaa.value);
    // const displayNumber = () => {
    //   console.log(aaaa.value);
    // };
    // displayNumber();
    // computed();
    cookies.set("userId", checkUser[0].id);
    cookies.set("userName", checkUser[0].userName);
    cookies.set("isLoggedIn", false);
    router.push("/");
    console.log("ログイン");
  } else {
    console.log("エラー");
    error.value = true;
    router.push("/rogin");
  }
};
</script>

<template>
  <div class="min-h-screen h-screen w-screen flex justify-center items-center">
    <form @submit.prevent="checkUser" class="bg-blue-200 p-3">
      <div class="text-center">
        <ul class="m-10">
          <li class="flex justify-between pb-5">
            <p class="pr-3">メールアドレス</p>
            <input type="text" v-model="user.mailAddress" />
          </li>
          <li class="flex justify-between">
            <p class="pr-3">パスワード</p>
            <input type="text" v-model="user.password" />
          </li>
        </ul>
        <p v-show="error">※メールアドレスまたはパスワードが間違っています</p>
        <p></p>
        <button
          type="submit"
          class="bg-blue-800 hover:bg-blue-700 text-white rounded px-4 py-2 mb-5"
        >
          ログイン
        </button>
      </div>
      <div class="text-right">
        <router-link
          class="hover:text-blue-800 transition-all duration-300 border-b-2 border-indigo-500"
          to="/register"
          >新規登録</router-link
        >
      </div>
    </form>
  </div>
</template>
