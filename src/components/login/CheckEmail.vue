<template>
  <div>
    <input type="text" v-model="emailCheckToken" placeholder="이메일에 도착한 인증코드를 입력해 주세요." />
    <button @click="checkEmail">인증</button>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      emailCheckToken: ""
    };
  },
  computed: {
    ...mapState(["userId"])
  },
  methods: {
    checkEmail() {
      if (this.emailCheckToken == "") {
        alert("인증코드를 입력하세요");
        return;
      }
      axios
        .post("http://localhost:8080/member/checkEmail", {
          emailCheckToken: this.emailCheckToken,
          userId: this.userId
        })
        .then(res => {
          if (res.data.code == 200) {
            alert(res.data.message);
            this.$router.push("/Main");
          } else {
            alert(res.data.message);
            return;
          }
        });
    }
  }
};
</script>

<style>
</style>