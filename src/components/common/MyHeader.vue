<template>
  <div class="header">
    <img src="../../../public/image/todoLogo.png" alt />
    <span class="button-container">
      <my-button
        v-for="(button, index) in buttons"
        :key="index"
        :iconType="button.iconType"
        :callback="button.callback"
      />
    </span>
  </div>
</template>

<script>
import MyButton from "@/components/common/MyButton.vue";

export default {
  components: { MyButton },
  props: {
    buttons: {
      type: Array,
      required: false,
      default: () => []
    }
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
}

.my-btn:hover {
  cursor: pointer;
}
.logo {
  text-align: center;
}
</style>
