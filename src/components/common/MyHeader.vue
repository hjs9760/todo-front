<template>
  <div class="header">
    <img src="../../../public/image/todoLogo.png" alt />
    <span class="button-container">
      <div v-if="this.userInfo.name != undefined">{{this.userInfo.name}} 님 환영합니다.</div>
      <div v-else>{{this.userInfo}} 님 환영합니다.</div>
      <div>
        <my-button
          v-for="(button, index) in buttons"
          :key="index"
          :iconType="button.iconType"
          :callback="button.callback"
        />
      </div>
    </span>
  </div>
</template>

<script>
import MyButton from "@/components/common/MyButton.vue";
import { mapState } from "vuex";

export default {
  components: { MyButton },
  props: {
    buttons: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["userInfo"])
  }
};
</script>

<style scoped>
.header {
  position: sticky;
  /* height: 50px; */
  border-bottom: 1px solid #ebebeb;
}

.button-container {
  margin-left: auto;

  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
}

.my-btn:hover {
  cursor: pointer;
}
.logo {
  text-align: center;
}
</style>
