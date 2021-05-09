<template>
  <div></div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  created() {
    const token = this.$route.query.token;
    this.SET_TOKEN(token);
    const userInfo = this.$route.query.userInfo;
    this.SET_USERINFO(userInfo);

    this.$router.push({ name: "Main" });
  },
  methods: {
    ...mapMutations(["SET_TOKEN", "SET_USERINFO"])
  }
};
</script>

<style></style>
