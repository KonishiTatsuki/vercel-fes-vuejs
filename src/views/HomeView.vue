<script setup>
import { supabase } from "../supabase";
import { ref } from "vue";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();
const cookieUserId = cookies.get("userId");
const datas = ref([]);

//商品情報の取得
const getItems = async () => {
  let { data: items } = await supabase.from("items").select("*");
  datas.value = items;
};
getItems();

//カート追加ボタンを押したとき
const addCart = async (item) => {
  //ローカルストレージに入れる商品情報
  const localItems = {
    id: item.id,
    itemName: item.itemName,
    itemDetail: item.itemDetail,
    itemImage: item.itemImage,
    itemPraice: item.itemPraice,
  };
  //ログインしてるか確認
  //してる場合、supabaseにカート情報を追加
  const localItemsJSON = localStorage.getItem("localItems");
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
};
</script>

<template>
  <div class="">
    <p class="p-10 text-center">商品一覧</p>
    <ul class="flex justify-between">
      <li v-for="item in datas" :key="item.id">
        <img
          :src="require(`@/assets${item.itemImage}`)"
          height="112"
          width="200"
        />
        <p>{{ item.itemName }}</p>
        <button @click="addCart(item)">追加</button>
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
