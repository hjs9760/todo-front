<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th style="text-align:center; width:100px;">내용</th>
            <th style="text-align:center; width:300px;">공유할 메일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>이메일</td>
            <td>
              <input v-model="email" type="text" class="email" />
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <span>
      <v-btn @click="saveNotice">보내기</v-btn>
    </span>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    categoryId: {
      required: true
    }
  },
  data() {
    return {
      email: ""
    };
  },
  created() {},
  methods: {
    ...mapActions(["CREATE_NOTICE"]),

    saveNotice() {
      let regExp = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/;

      if (!regExp.test(this.email)) {
        return alert("올바른 이메일 형식이 아닙니다.");
      }

      this.CREATE_NOTICE({
        categoryId: this.categoryId,
        email: this.email,
        noticeType: "SHARECATEGORY"
      });

      this.refreshData();
      this.$emit("closeShareCreateDialog");
    },

    refreshData() {
      this.email = "";
      this.noticeType = "";
    }
  }
};
</script>

<style>
.email {
  width: 200px;
}
</style>
