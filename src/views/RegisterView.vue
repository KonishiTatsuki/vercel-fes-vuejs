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
    phoneNumber:datas.value.phoneNumber,
    password:datas.value.password,
  };
  await supabase.from("users").insert([user]);
};
</script>

// <template>
  <div class="about">
    <div>{{ text }}</div>
    <h1>会員登録</h1>
    <form @submit="onSubmit">
      <ul>
        <li>
          <label for="">ユーザー名</label>
          <input type="text" v-model="datas.userName" />
        </li>
        <li>
          <label for="">E-mail</label>
          <input type="text" v-model="datas.mailAddress" />
        </li>
        <li>
          <label for="">電話番号</label>
          <input type="text" v-model="datas.phoneNumber" />
        </li>
        <li>
          <label for="">password</label>
          <input type="text" v-model="datas.password" />
        </li>
      </ul>
      <button type="submit">会員登録</button>
    </form>
  </div>
</template>
