<script setup>
import { supabase } from "../supabase";
import { ref } from "vue";

const datas = ref([]);
const getItems = async () => {
  let { data: items } = await supabase.from("items").select("*");
  datas.value = items;
};
getItems();

const addCart = async (itemId) => {
  let { data:carts } = await supabase
  .from('carts')
  .insert([
    { users: '2', items: itemId },
  ])
};

</script>

<template>
  <div>
    <p>商品一覧</p>
    <ul>
      <li
        v-for="item in datas"
        :key="item.id"
        :style="item.completed ? 'text-decoration:line-through' : ''"
      >
        <span><input type="checkbox" v-model="item.completed" /></span>
        <span>{{ item.itemName }}</span>
        <button @click="addCart(item.id)">追加</button>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  /* list-style-type: none; */
  padding: 0;
}
li {
  /* display: inline-block; */
  margin: 10px 10px;
}
a {
  color: #42b983;
}
</style>
