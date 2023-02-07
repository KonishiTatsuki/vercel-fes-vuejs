<script setup>
import { supabase } from "../supabase";
import { ref } from "vue";

const tasks = ref([]);
const getTasks = async () => {
  let { data: items } = await supabase.from("items").select("*");
  tasks.value = items;
};
getTasks();

</script>

<template>
  <div>
    <p>商品一覧</p>
    <ul>
      <li
        v-for="task in tasks"
        :key="task.id"
        :style="task.completed ? 'text-decoration:line-through' : ''"
      >
        <span><input type="checkbox" v-model="task.completed" /></span>
        <span>{{ task.itemName }}</span>
        <button>追加</button>
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
