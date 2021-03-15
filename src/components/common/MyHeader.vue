<template>
  <div class="header">
    <div class="logo">
      <img src="../../../public/image/todoLogo.png" alt="" />
    </div>
    <div class="button-container">
      <my-button
        v-for="(button, index) in buttons"
        :key="index"
        :iconType="button.iconType"
        :callback="button.callback"
      />
    </div>
  </div>
</template>

<script>
import MyButton from '@/components/common/MyButton.vue';

export default {
  components: { MyButton },
  props: {
    buttons: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 48px;

  display: flex;
  flex-direction: row;
}

.button-container {
  /* border: 1px solid black; */
  margin-left: auto;

  display: flex;
  justify-content: center;
  align-items: center;
}

.my-btn:hover {
  cursor: pointer;
}
.logo {
  align-items: center;
  text-align: center;
}
</style>
