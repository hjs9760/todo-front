<template>
  <div>
    <h2 class="header">TodoList</h2>
    <form @submit="goSignUp" onsubmit="return false;">
      <div class="text3">아이디</div>
      <span>
        <input v-model="id" minlength="4" maxlength="20" class="input_id" @change="checkId()" />
        <button @click.prevent="duplicatedId" class="button_id">중복확인</button>
      </span>
      <div class="blank" v-bind:class="{ blank_success: isId, blank_fail: isId_f }" v-text="idText"></div>

      <div class="text4">비밀번호</div>
      <input
        type="password"
        v-model="password"
        minlength="8"
        maxlength="20"
        class="input"
        @change="checkPw()"
      />
      <div class="blank" v-bind:class="{ blank_success: isPw, blank_fail: isPw2 }" v-text="pwText"></div>

      <div class="text6">비밀번호 확인</div>
      <input
        type="password"
        v-model="password2"
        minlength="8"
        maxlength="20"
        class="input"
        @change="checkPw2()"
      />
      <div
        class="blank"
        v-bind:class="{ blank_success: isPw2, blank_fail: isPw2_f }"
        v-text="pw2Text"
      ></div>

      <div class="text2">이름</div>
      <input v-model="name" class="input" @change="checkName()" />
      <div
        class="blank"
        v-bind:class="{ blank_success: isName, blank_fail: isName_f }"
        v-text="nameText"
      ></div>

      <div class="text4">생년월일</div>
      <span>
        <span>
          <input
            v-model="yyyy"
            type="text"
            placeholder="년(4자)"
            aria-label="년(4자)"
            maxlength="4"
            class="ps_box1"
            @change="checkBirth()"
          />
        </span>

        <span>
          <span>
            <select v-model="mm" class="ps_box2" aria-label="월" @change="checkBirth()">
              <option value>월</option>
              <option value="01">1</option>
              <option value="02">2</option>
              <option value="03">3</option>
              <option value="04">4</option>
              <option value="05">5</option>
              <option value="06">6</option>
              <option value="07">7</option>
              <option value="08">8</option>
              <option value="09">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </span>
        </span>

        <span class="bir_dd">
          <span>
            <input
              v-model="dd"
              type="text"
              placeholder="일"
              aria-label="일"
              class="ps_box1"
              maxlength="2"
              @change="checkBirth()"
            />
            <label for="dd" class="lbl"></label>
          </span>
        </span>
      </span>
      <div
        class="blank"
        v-bind:class="{ blank_success: isBirth, blank_fail: isBirth_f }"
        v-text="birthText"
      ></div>

      <div class="text2">성별</div>
      <input type="radio" v-model="gender" name="gender" value="man" @change="checkGender" />
      <span class="gender">남</span>
      <input type="radio" v-model="gender" name="gender" value="woman" @change="checkGender" />
      <span class="gender">여</span>
      <div
        class="blank"
        v-bind:class="{ blank_success: isGender, blank_fail: isGender_f }"
        v-text="genderText"
      ></div>

      <div class="text3">이메일</div>
      <input v-model="email" class="input" @change="checkEmail()" />
      <div
        class="blank"
        v-bind:class="{ blank_success: isEmail, blank_fail: isEmail_f }"
        v-text="emailText"
      ></div>

      <button type="submit">회원가입</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
import CryptoJS from "crypto-js";

export default {
  data() {
    return {
      id: "",
      password: "",
      password2: "",
      name: "",
      birth: "",
      gender: "",
      email: "",
      yyyy: "",
      mm: "",
      dd: "",

      idText: "",
      pwText: "",
      pw2Text: "",
      nameText: "",
      birthText: "",
      genderText: "",
      emailText: "",

      isId: false,
      isPw: "",
      isPw2: "",
      isName: "",
      isBirth: "",
      isGender: "",
      isEmail: "",

      isId_f: "",
      isPw_f: "",
      isPw2_f: "",
      isName_f: "",
      isBirth_f: "",
      isGender_f: "",
      isEmail_f: ""
    };
  },

  methods: {
    ...mapMutations(["SET_USERID"]),
    checkId() {
      let regExp = /^[A-Za-z0-9_]{4,20}$/;

      if (!regExp.test(this.id)) {
        this.isId_f = true;
        this.idText = "4~20자의 영문, 숫자와 특수기호(_)만 사용 가능합니다.";
        return;
      }
    },

    checkPw() {
      if (this.password.length < 8 || this.password.length > 20) {
        this.isPw_f = true;
        this.pwText = "8~20자로 암호를 설정하세요.";
        return;
      }

      this.isPw = true;
      this.pwText = "안전한 비밀번호 입니다.";
    },

    checkPw2() {
      if (this.password.length < 8 || this.password.length > 20) {
        this.isPw2_f = true;
        this.pw2Text = "8~20자로 암호를 설정하세요.";
        return;
      }

      if (this.password != this.password2) {
        this.isPw2_f = true;
        this.pw2Text = "비밀번호가 일치하지 않습니다.";
        return;
      }

      this.isPw2 = true;
      this.pw2Text = "비밀번호가 일치합니다.";
    },

    checkName() {
      if (this.name.length == 0) {
        this.isName_f = true;
        this.nameText = "이름을 입력하세요.";
        return;
      }

      this.isName = true;
      this.nameText = "확인";
    },

    checkBirth() {
      if (
        this.yyyy.length != 4 ||
        this.mm.length == "월" ||
        this.dd.length == 0
      ) {
        this.isBirth_f = true;
        this.birthText = "생년월일을 제대로 입력하세요.";
        return;
      }

      this.isBirth = true;
      this.birthText = "확인";
    },

    checkGender() {
      if (this.gender == "") {
        this.isGender_f = true;
        this.genderText = "성별을 선택하세요.";
        return;
      }

      this.isGender = true;
      this.genderText = "확인";
    },

    checkEmail() {
      let regExp = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/;

      if (!regExp.test(this.email)) {
        this.isEmail_f = true;
        this.emailText = "올바른 이메일 형식이 아닙니다.";
        return;
      } else {
        this.isEmail = true;
        this.emailText = "올바른 이메일 형식입니다.";
      }
    },

    duplicatedId() {
      axios
        .get("http://localhost:8080/member/checkId", {
          params: {
            userId: this.id
          }
        })
        .then(res => {
          if (res.data) {
            this.isId_f = true;
            this.idText = "이미 사용중인 아이디입니다.";
          } else {
            this.isId = true;
            this.idText = "사용 가능한 아이디입니다.";
          }
        });
    },

    goSignUp() {
      if (!this.id) {
        alert("아이디 정보를 확인해주세요");
        return;
      }

      if (!this.isId) {
        alert("아이디 중복체크를 해주세요.");
        return;
      }

      if (
        this.isPw &&
        this.isPw2 &&
        this.isName &&
        this.isBirth &&
        this.isGender &&
        this.isEmail
      ) {
        axios
          .post("http://localhost:8080/member/signUp", {
            userId: this.id,
            pw: CryptoJS.AES.encrypt(this.password, "todo").toString(),
            name: this.name,
            birth: this.yyyy + "-" + this.mm + "-" + this.dd,
            gender: this.gender,
            email: this.email
          })
          .then(res => {
            if (res.data.code == 200) {
              alert(res.data.message);
              this.SET_USERID(this.id);

              axios.get("http://localhost:8080/mail/sendEmail", {
                params: {
                  userId: this.id
                }
              });

              this.$router.push("/checkEmail");
            }
          });
      } else {
        alert("회원가입 정보를 제대로 입력해주세요.");
        return;
      }
    }
  }
};
</script>

<style scoped>
.header {
  color: red;
  border-width: 10px;
  text-align: center;
}

.input {
  width: 300px;
  height: 20px;
}

.input_id {
  margin-left: 75px;
  width: 300px;
  height: 20px;
}

.text2 {
  color: whitesmoke;
  margin-right: 275px;
}

.text3 {
  color: whitesmoke;
  margin-right: 260px;
}

.text4 {
  color: whitesmoke;
  margin-right: 249px;
}

.text6 {
  color: whitesmoke;
  margin-right: 220px;
}

.gender {
  color: whitesmoke;
  margin-right: 15px;
}

.ps_box1 {
  width: 92px;
  height: 35px;
  margin-left: 10px;
}

.ps_box2 {
  width: 95px;
  height: 40px;
  margin-left: 10px;
}

.blank {
  margin-bottom: 30px;
}

.blank_fail {
  margin-bottom: 30px;
  color: red;
}

.blank_success {
  margin-bottom: 30px;
  color: green;
}

.button_id {
  widows: 80px;
  height: 25px;
  margin-left: 10px;
  background-color: whitesmoke;
}
</style>
