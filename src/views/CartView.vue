<script setup>
import { supabase } from "../supabase";
import { ref } from "vue";

const datas = ref([]);
const getCarts = async () => {
  let { data: carts } = await supabase
    .from("carts")
    .select("*,items(*)")
    .eq("users", "2");
  datas.value = carts;
  console.log(carts)
};
getCarts();

const deleteCart = async (itemId) => {
  const { data:carts } = await supabase
  .from('carts')
  .delete()
  .eq("items", itemId);
  console.log(carts);
};

</script>

<template>
  <div class="about">
    <h1>カートページ</h1>
    <ul>
      <li
        v-for="cart in datas"
        :key="cart.id"
        :style="cart.completed ? 'text-decoration:line-through' : ''"
      >
        <span>{{ cart.items.itemName }}</span>
        <button @click="deleteCart(cart.items.id)">削除</button>
      </li>
    </ul>
  </div>
</template>
