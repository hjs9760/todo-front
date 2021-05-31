<template>
  <div class="login">
    <el-card>
      <h2>Login</h2>
      <el-form
        class="login-form"
        :model="model"
        ref="form"
        @submit.native.prevent="login"
      >
        <el-form-item prop="username">
          <el-input
            v-model="model.username"
            placeholder="아이디를 입력하세요."
            prefix-icon="fas fa-lock"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="model.password"
            placeholder="암호를 입력하세요."
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            @click="goSignIn"
            >Login</el-button
          >
        </el-form-item>
        <el-button
          :loading="loading"
          class="signup-button"
          type="primary"
          @click="goSignUp"
          >SignUp</el-button
        >
        <br />

        <!-- <a class="forgot-password" href>Forgot password ?</a> -->
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
import { Base64 } from 'js-base64';

export default {
  name: 'login',
  data() {
    return {
      model: {
        username: '',
        password: '',
      },
      loading: false,
    };
  },
  methods: {
    ...mapMutations(['SET_USERINFO', 'SET_TOKEN']),

    simulateLogin() {
      return new Promise((resolve) => {
        setTimeout(resolve, 800);
      });
    },
    async login() {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      this.loading = true;
      await this.simulateLogin();
      this.loading = false;
      if (
        this.model.username === this.validCredentials.username &&
        this.model.password === this.validCredentials.password
      ) {
        this.$message.success('Login successfull');
      } else {
        this.$message.error('Username or password is invalid');
      }
    },
    goSignUp() {
      this.$router.push('/signup');
    },
    goSignIn() {
      if (this.username == '' || this.password == '') {
        alert('아이디 또는 비밀번호를 입력하세요.');
        return;
      }

      axios
        .post('http://localhost:8080/member/signIn', {
          userId: this.model.username,
          pw: Base64.encode(this.model.password),
        })
        .then((res) => {
          if (res.data.code == 'B003') {
            alert(res.data.message);
            this.$router.push('/checkEmail');
          } else if (res.data.code == 'B001' || res.data.code == 'B004') {
            alert(res.data.message);
            return;
          } else {
            this.SET_USERINFO(res.data.data);
            this.SET_TOKEN(res.data.token);
            this.$router.push('/Main');
          }
        });
    },
  },
};
</script>

<style scoped>
.login {
  flex: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button {
  width: 70%;
  height: 25px;
  margin-top: 30px;
}
.signup-button {
  width: 70%;
  height: 25px;
}
.login-form {
  width: 290px;
}
.forgot-password {
  margin-top: 10px;
}
</style>
<style lang="scss">
$teal: rgb(0, 124, 137);
.el-button--primary {
  background: $teal;
  border-color: $teal;

  &:hover,
  &.active,
  &:focus {
    background: lighten($teal, 7);
    border-color: lighten($teal, 7);
  }
}
.login .el-input__inner:hover {
  border-color: $teal;
}
.login .el-input__prefix {
  background: rgb(238, 237, 234);
  left: 0;
  height: calc(100% - 2px);
  left: 1px;
  top: 1px;
  border-radius: 3px;
  .el-input__icon {
    width: 30px;
  }
}

.login .el-card {
  padding-top: 0;
  padding-bottom: 30px;
}
h2 {
  font-family: 'Open Sans';
  letter-spacing: 1px;
  font-family: Roboto, sans-serif;
  padding-bottom: 20px;
}
a {
  color: $teal;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    color: lighten($teal, 7);
  }
}
.login .el-card {
  width: 340px;
  display: flex;
  justify-content: center;
}
</style>
