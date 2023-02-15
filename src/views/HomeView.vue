<script setup>
import { supabase } from "../supabase";
import { ref } from "vue";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();
const cookieUserId = cookies.get("userId");
const datas = ref([]);
const explanation = ref(false);

//商品情報の取得
const getItems = async () => {
  let { data: items } = await supabase.from("items").select("*");
  datas.value = items;
};
getItems();

//画像をホバーした時に説明文を表示・非表示
const mouseOverAction = (id) => {
  explanation.value = true;
};
const mouseLeaveAction = () => {
  explanation.value = false;
};

//カート追加ボタンを押したとき
const addCart = async (item) => {
  //ローカルストレージの情報を取得
  const localItemsJSON = localStorage.getItem("localItems");
  //ローカルストレージに入れる商品情報
  const localItems = {
    id: item.id,
    itemName: item.itemName,
    itemDetail: item.itemDetail,
    itemImage: item.itemImage,
    itemPraice: item.itemPraice,
    itemBottonSwith: item.bottonSwitch,
  };
  //ログインしてるか確認
  //してる場合、supabaseにカート情報を追加
  if (cookieUserId) {
    //ローカルストレージに商品情報がある場合
    if (localItemsJSON) {
      console.log("ローカルストレージに商品情報がある場合(ログイン)");
      let cartItems = JSON.parse(localItemsJSON);
      console.log(cartItems);
      cartItems.map(async (cartItem) => {
        await supabase
          .from("carts")
          .insert([{ users: cookieUserId, items: cartItem.id }]);
      });
      await supabase
        .from("carts")
        .insert([{ users: cookieUserId, items: item.id }]);
      localStorage.removeItem("localItems");
    } //ローカルストレージが空の場合
    else {
      console.log("ローカルストレージが空の場合(ログイン)");
      await supabase
        .from("carts")
        .insert([{ users: cookieUserId, items: item.id }]);
    }
  } //してない場合、ローカルストレージにカート情報を追加
  else {
    //ローカルストレージの保存状況を確認
    //ローカルストレージにすでに商品情報がある場合
    if (localItemsJSON) {
      console.log("ローカルストレージに商品情報がある場合(ローカル)");
      let cartItemed = JSON.parse(localItemsJSON);
      const setCartItems = [...cartItemed, localItems];
      localStorage.setItem("localItems", JSON.stringify(setCartItems));
      const items = localStorage.getItem("localItems");
    } //ローカルストレージが空の場合
    else {
      console.log("ローカルストレージが空の場合(ローカル)");
      localStorage.setItem("localItems", JSON.stringify([localItems]));
      const item = localStorage.getItem("localItems");
    }
  }
  // ボタンの切り替え(追加 → 削除)
  await supabase.from("items").update({ bottonSwitch: true }).eq("id", item.id);
};

// カート削除ボタンを押したとき
const deleteCart = async (item) => {
  //ローカルストレージの情報を取得
  const localItemsJSON = localStorage.getItem("localItems");
  let localCartItems = JSON.parse(localItemsJSON);
  //ログインしてるか確認
  //してる場合、supabaseにカート情報を削除
  if (cookieUserId) {
    console.log("ログインしている場合");
    await supabase
      .from("carts")
      .delete()
      .eq("users", cookieUserId)
      .eq("items", item.id);
  }
  //してない場合、ローカルストレージのカート情報を削除
  else {
    console.log("ログインしていない場合");
    if (localCartItems) {
      const cartItem = localCartItems.find((a) => a.id === item.id);
      const filterCartItem = localCartItems.filter((data) => {
        return data.id !== item.id;
      });
      //削除後のローカルストレージ内
      localStorage.setItem("localItems", JSON.stringify(filterCartItem));
    }
  }
  // ボタンの切り替え(削除 → 追加)
  await supabase
    .from("items")
    .update({ bottonSwitch: false })
    .eq("id", item.id);
};
</script>

<template>
  <div class="p-10">
    <p class="text-2xl pb-10 text-center">作品一覧</p>
    <ul class="flex justify-between flex-wrap">
      <li
        v-for="item in datas"
        :key="item.id"
        class="mb-3 border-solid border-2 border-black bg-slate-50"
      >
        <div
          class="relative z-auto"
          v-on:mouseover="mouseOverAction(item.id)"
          v-on:mouseleave="mouseLeaveAction"
        >
          <p v-show="explanation" class="absolute top-0 left-0 p-10 z-100">
            {{ item.itemDetail }}
          </p>
          <img
            :src="require(`@/assets${item.itemImage}`)"
            height="150"
            width="300"
            class="hover:opacity-20"
          />
        </div>
        <div class="p-3">
          <p>{{ item.itemName }}</p>
          <div class="flex justify-between">
            <p>{{ item.itemPrice }}円</p>
            <button
              class="bg-blue-800 hover:bg-blue-700 text-white rounded px-4 py-0.5"
              @click="addCart(item)"
              v-if="!item.bottonSwitch"
            >
              追加
            </button>
            <button
              class="bg-blue-800 hover:bg-blue-700 text-white rounded px-4 py-0.5"
              @click="deleteCart(item)"
              v-else
            >
              削除
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>
