<script setup>
import { ref } from "vue";

const datas = ref({
  userName: "あああああ",
  mailAddress: "",
  phoneNumber: "",
  password: "",
});

console.log(datas.value);
console.log(datas.value.userName);
</script>

<template>
  <div class="about">
    <div>{{ text }}</div>
    <h1>会員登録</h1>
    <form action="">
      <ul>
        <li>
          <label for="">ユーザー名</label>
          <input type="text" v-model="datas.userName" />
        </li>
        <li>
          <label for="">E-mail</label>
          <input type="text" />
        </li>
        <li>
          <label for="">電話番号</label>
          <input type="text" />
        </li>
        <li>
          <label for="">password</label>
          <input type="text" />
        </li>
      </ul>
    </form>
  </div>
</template>
