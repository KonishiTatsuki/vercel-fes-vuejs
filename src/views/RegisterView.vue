<script setup>
import { supabase } from "../supabase";
import { ref } from "vue";

const datas = ref({
  userName: "",
  mailAddress: "",
  phoneNumber: "",
  password: "",
});

const onSubmit = async () => {
  const user = {
    userName: datas.value.userName,
    mailAddress: datas.value.mailAddress,
    phoneNumber: datas.value.phoneNumber,
    password: datas.value.password,
  };
  await supabase.from("users").insert([user]);
};
</script>

<template>
  <div class="h-screen w-screen flex justify-center items-center  ">
    <form @submit="onSubmit" class="bg-blue-200  text-center">
      <ul class="m-10">
        <li class="flex justify-between pb-5 ">
          <p class="pr-3">ユーザー名</p>
          <input type="text" v-model="datas.userName" />
        </li>
        <li class="flex justify-between pb-5">
          <p class="pr-3">E-mail</p>
          <input type="text" v-model="datas.mailAddress" />
        </li>
        <li class="flex justify-between pb-5">
          <p class="pr-3">電話番号</p>
          <input type="text" v-model="datas.phoneNumber" />
        </li>
        <li class="flex justify-between">
          <p class="pr-3">password</p>
          <input type="text" v-model="datas.password" />
        </li>
      </ul>
      <button
        type="submit"
        class="bg-blue-800 hover:bg-blue-700 text-white rounded px-4 py-2 mb-5"
      >
        会員登録
      </button>
    </form>
  </div>
</template>
