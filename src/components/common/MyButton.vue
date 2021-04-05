<template>
  <span class="my-button" @click="callback">
    <md-icon>{{ iconType }}</md-icon>
  </span>
</template>

<script>
export default {
  props: {
    iconType: {
      type: String,
      required: true,
    },
    callback: {
      type: Function,
      required: false,
      default: function() {},
    },
  },
};
</script>

<style>
.my-button:hover {
  cursor: pointer;
}
</style>
