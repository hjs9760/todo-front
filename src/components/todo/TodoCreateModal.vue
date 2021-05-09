<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th style="text-align:center; width:100px;">내용</th>
            <th style="text-align:center; width:300px;">값</th>
            <th style="text-align:center; width:200px;">설명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>제목</td>
            <td>
              <input v-model="name" type="text" class="date" />
            </td>
            <td></td>
          </tr>
          <tr>
            <td>내용</td>
            <td>
              <input v-model="content" type="text" class="date" />
            </td>
            <td></td>
          </tr>
          <tr>
            <td>우선 순위</td>
            <td>
              <input v-model="priority" type="number" min="1" max="99" class="date" />
            </td>
            <td>1 ~ 99 까지 숫자만 입력하세요.</td>
          </tr>
          <tr>
            <td>상태</td>
            <td>
              <v-btn @click="changeStatus('PLAN', '계획')" color="yellow">계획</v-btn>
              <v-btn @click="changeStatus('PROGRESS', '진행')" color="green">진행</v-btn>
              <v-btn @click="changeStatus('COMPLETE', '완료')" color="blue">완료</v-btn>
              <v-btn @click="changeStatus('PROBLEM', '문제')" color="red">문제</v-btn>
              <v-btn @click="changeStatus('HOLD', '보류')" color="grey">보류</v-btn>
            </td>

            <td>선택한 상태 : {{ statusName }}</td>
          </tr>
          <tr>
            <td>시작 날짜</td>
            <td>
              <input v-model="startDate" type="text" class="date" />
            </td>
            <td>yyyy-mm-dd(년-월-일) 형식으로 입력하세요.</td>
          </tr>
          <tr>
            <td>종료 날짜</td>
            <td>
              <input v-model="endDate" type="text" class="date" />
            </td>
            <td>yyyy-mm-dd(년-월-일) 형식으로 입력하세요.</td>
          </tr>
          <tr></tr>
        </tbody>
      </template>
    </v-simple-table>
    <span>
      <v-btn @click="createTodo">저장</v-btn>
    </span>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";

export default {
  props: {
    sectionId: {
      required: true
    }
  },
  data() {
    return {
      name: "",
      content: "",
      priority: "",
      status: "",
      statusName: "",
      startDate: `${moment().format("YYYY-MM-DD")}`,
      endDate: `${moment(this.startDate)
        .endOf("months")
        .format("YYYY-MM-DD")}`
    };
  },
  created() {},
  methods: {
    ...mapActions(["CREATE_TODO"]),

    createTodo() {
      let regExp = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

      if (!regExp.test(this.startDate) || !regExp.test(this.startDate)) {
        return alert("날짜 형식에 맞춰서 입력해주세요.");
      }

      if (!(this.priority > 0 && this.priority < 100)) {
        return alert("우선 순위는 1 ~ 99까지 입력가능합니다.");
      }

      if (this.status == "") {
        return alert("상태를 선택하세요.");
      }

      this.CREATE_TODO({
        sectionId: this.sectionId,
        name: this.name,
        content: this.content,
        priority: this.priority,
        status: this.status,
        startDate: `${moment(this.startDate).format("YYYY-MM-DD 00:00:00")}`,
        endDate: `${moment(this.endDate).format("YYYY-MM-DD 00:00:00")}`
      });

      this.refreshData();
      this.$emit("closeTodoCreateDialog");
    },

    changeStatus(status, statusName) {
      this.status = status;
      this.statusName = statusName;
    },

    resetInfo() {
      this.name = this.todo.name;
      this.content = this.todo.content;
      this.priority = this.todo.priority;
      this.status = this.todo.status;
      this.startDate = this.todo.startDate;
      this.endDate = this.todo.endDate;
    },

    refreshData() {
      (this.name = ""),
        (this.content = ""),
        (this.priority = ""),
        (this.status = ""),
        (this.statusName = ""),
        (this.startDate = `${moment().format("YYYY-MM-DD")}`),
        (this.endDate = `${moment(this.startDate)
          .endOf("months")
          .format("YYYY-MM-DD")}`);
    }
  }
};
</script>

<style>
.date {
  width: 200px;
}
</style>
