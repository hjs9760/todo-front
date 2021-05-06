<template>
  <todo>
    <template v-slot:header>
      <my-header :buttons="headerButtons" />
    </template>

    <template v-slot:left>
      <my-left
        :categoryInfo="categoryInfo"
        v-on:findTodo="findTodo"
        v-on:showType="setType"
        v-on:showLeftType="showLeftType"
      ></my-left>
    </template>

    <template v-slot:content>
      <!-- schedule -->
      <div v-if="leftType == 1">
        <my-todo
          :sectionId="sectionId"
          :showType="showType"
          :todoInfo="todoInfo"
          :sDate="sDate"
          :eDate="eDate"
          v-on:searchTodo="searchTodo"
        ></my-todo>
      </div>
      <div v-else-if="leftType == 3">
        <notice :noticeInfo="noticeInfo"></notice>
      </div>
      <div v-else-if="leftType == 4">
        <share></share>
      </div>
    </template>
  </todo>
</template>

<script>
import MyHeader from "@/components/common/MyHeader.vue";
import MyLeft from "@/components/common/MyLeft.vue";
import Todo from "@/components/common/Todo.vue";
import MyTodo from "@/components/todo/MyTodo.vue";
import Notice from "@/components/notice/Main.vue";
import Share from "@/components/share/Main.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import moment from "moment";

export default {
  components: { MyHeader, Todo, MyLeft, MyTodo, Notice, Share },
  data() {
    return {
      headerButtons: [
        {
          iconType: "logout",
          callback: this.logout
        }
      ]
    };
  },
  methods: {
    ...mapActions([
      "GET_MY_CATEGORY_INFO_ALL",
      "GET_MY_TODO_INFO_ALL",
      "GET_MY_TODO_INFO_BY_SECTION",
      "GET_MY_NOTICE_INFO"
    ]),
    ...mapMutations(["SET_TYPE", "SET_SECTIONID", "SET_LEFT_TYPE"]),
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("vuex");
      alert("로그아웃 하였습니다.");
      this.$router.push({ name: "Login" });
    },

    findTodo(sectionId) {
      this.GET_MY_TODO_INFO_BY_SECTION(sectionId);
      this.SET_SECTIONID(sectionId);
      this.SET_TYPE(2);
    },
    setType(type) {
      this.GET_MY_TODO_INFO_ALL({
        startDate: `${moment(this.sDate).format("YYYY-MM-DD 00:00:00")}`,
        endDate: `${moment(this.eDate).format("YYYY-MM-DD 23:59:59")}`
      });
      this.SET_TYPE(type);
    },
    searchTodo() {
      this.GET_MY_TODO_INFO_ALL({
        startDate: `${moment(this.sDate).format("YYYY-MM-DD 00:00:00")}`,
        endDate: `${moment(this.eDate).format("YYYY-MM-DD 23:59:59")}`
      });
    },
    showLeftType(type) {
      if (type == 3) {
        this.GET_MY_NOTICE_INFO();
      }
      this.SET_LEFT_TYPE(type);
    }
  },
  computed: {
    ...mapState([
      "categoryInfo",
      "todoInfo",
      "sDate",
      "eDate",
      "showType",
      "sectionId",
      "leftType",
      "noticeInfo"
    ])
  },
  created() {
    this.GET_MY_CATEGORY_INFO_ALL();
    this.GET_MY_TODO_INFO_ALL({
      startDate: `${moment(this.sDate).format("YYYY-MM-DD 00:00:00")}`,
      endDate: `${moment(this.eDate).format("YYYY-MM-DD 23:59:59")}`
    });
  }
};
</script>
