<script setup>
import { supabase } from "../supabase";
import { ref } from "vue";

const datas = ref([]);
const getCarts = async () => {
  let { data: carts } = await supabase
    .from("carts")
    .select("*")
    .eq("userId", "5");
  datas.value = carts;
};
getCarts();

const paydelete = async (userId) => {
  const { data:carts } = await supabase
  .from('carts')
  .delete()
  .eq("userId", userId);
  datas.value = carts;
};


</script>

<template>
  <div class="about">
    <h1>決済</h1>
    <ul>
      <li
        v-for="cart in datas"
        :key="cart.id"
        :style="cart.completed ? 'text-decoration:line-through' : ''"
      >
        <span>{{ cart.itemId }}</span>
      </li>
    </ul>
    <button @click="paydelete(5)">決済</button>
  </div>
</template>
