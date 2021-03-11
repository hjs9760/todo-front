<template>
  <div></div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  created() {
    const token = this.$route.query.token;
    this.SET_TOKEN(token);

    this.$router.push({ name: 'Main' });
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
  },
};
</script>

<style></style>
