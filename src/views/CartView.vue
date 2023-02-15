<script setup>
import { supabase } from "../supabase";
import { ref } from "vue";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();
const cookieUserId = cookies.get("userId");
const datas = ref([]);

//カート情報を取得
const getCarts = async () => {
  if (cookieUserId) {
    console.log("ログイン状態");
    let { data: carts } = await supabase
      .from("carts")
      .select("*,items(*)")
      .eq("users", cookieUserId);
    datas.value = carts;
    console.log(carts);
  } else {
    console.log("ローカル状態");
    const localCartsJSON = localStorage.getItem("localItems");
    let carts = JSON.parse(localCartsJSON);
    datas.value = carts;
  }
};
getCarts();

//カートの商品を削除
const deleteCart = async (itemId) => {
  await supabase
    .from("carts")
    .delete()
    .eq("users", cookieUserId)
    .eq("items", itemId);

  // ボタンの切り替え(削除 → 追加)
  await supabase
    .from("items")
    .update({ bottonSwitch: false })
    .eq("id", itemId);
};
</script>

<template>
  <div class="">
    <h1>カートページ</h1>
    <ul class="flex justify-center m-20">
      <!-- ログイン後 -->
      <div v-if="cookieUserId">
        <li
          class="flex border-2 border-black p-3 mb-3 max-w-7xl"
          v-for="cart in datas"
          :key="cart.id"
          :style="cart.completed ? 'text-decoration:line-through' : ''"
        >
          <img
            class="pr-3"
            :src="require(`@/assets${cart.items.itemImage}`)"
            height="112"
            width="200"
          />
          <div>
            <p>{{ cart.items.itemName }}</p>
            <button @click="deleteCart(cart.items.id)">削除</button>
          </div>
        </li>
        <div class="text-center">
          <button
            class="bg-blue-800 hover:bg-blue-700 text-white rounded px-4 py-2 mb-5"
          >
            <router-link to="/pay">決済</router-link>
          </button>
        </div>
      </div>
      <!-- ログイン前 -->
      <div v-else>
        <li
          class="flex border-2 border-black p-3 mb-3 max-w-7xl"
          v-for="cart in datas"
          :key="cart.id"
          :style="cart.completed ? 'text-decoration:line-through' : ''"
        >
          <img
            class="pr-3"
            :src="require(`@/assets${cart.itemImage}`)"
            height="112"
            width="200"
          />
          <div>
            <p>{{ cart.itemName }}</p>
            <button @click="deleteCart(cart.id)">削除</button>
          </div>
        </li>
        <div class="text-center">
          <p>※決済に進むにはログインが必要です</p>
          <button
            class="bg-blue-800 hover:bg-blue-700 text-white rounded px-4 py-2 mb-5"
          >
            <router-link to="/Rogin">ログインしてください</router-link>
          </button>
        </div>
      </div>
    </ul>
  </div>
</template>
