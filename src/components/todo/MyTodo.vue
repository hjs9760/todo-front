<template>
  <div>
    <div>
      <v-btn @click="findTodoByStatus('PLAN')" color="whitesmoke">계획</v-btn>
      <v-btn @click="findTodoByStatus('PROGRESS')" color="green">진행</v-btn>
      <v-btn @click="findTodoByStatus('COMPLETE')" color="blue">완료</v-btn>
      <v-btn @click="findTodoByStatus('PROBLEM')" color="red">문제</v-btn>
      <v-btn @click="findTodoByStatus('HOLD')" color="grey">보류</v-btn>
    </div>

    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-divider></v-divider>

    <!-- 할일 목록 -->
    <div v-if="showType == 2" class="myTodo">
      <div v-for="(todo, index) in todoInfo" :key="index">
        <todo-item :todo="todo"></todo-item>
      </div>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn text color="grey" @click="openTodoCreateDialog()">+ 할일 추가</v-btn>
      <!-- 할일 추가 모달창 -->
      <v-dialog v-model="todoCreateDialog" persistent max-width="900px">
        <v-card>
          <v-card-title>
            <template>
              <v-icon style="margin-right:10px;" large color="#41B883">create</v-icon>
              <span class="headline" large>할일 추가</span>
            </template>
            <v-spacer></v-spacer>
            <v-btn icon @click="closeTodoCreateDialog()">
              <v-icon>clear</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
                style="position: relative; border:1px solid #41B883; border-style:dashed; "
              >
                <todo-create-modal
                  :sectionId="sectionId"
                  v-on:closeTodoCreateDialog="closeTodoCreateDialog"
                ></todo-create-modal>
                <!-- 업로드 컴포넌트 -->
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- end 할일 추가 모달창  -->
    </div>

    <!-- 전체 일정 -->
    <div v-else>
      <v-sheet tile height="54" class="d-flex">
        <v-btn icon class="ma-2" @click="$refs.calendar.prev()">이전</v-btn>
        <v-select
          v-model="type"
          :items="types"
          dense
          outlined
          hide-details
          class="ma-2"
          label="type"
        ></v-select>
        <v-select
          v-model="weekday"
          :items="weekdays"
          dense
          outlined
          hide-details
          label="weekdays"
          class="ma-2"
        ></v-select>
        <!-- 날짜검색 -->
        <v-container>
          <v-row>
            <v-col cols="12" lg="6">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="startDate"
                    label="시작 날짜"
                    persistent-hint
                    prepend-icon="event"
                    v-bind="attrs"
                    @blur="date = parseStartDate()"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="startDate" no-title @input="menu1 = false"></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" lg="6">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="endDate"
                    label="끝 날짜"
                    persistent-hint
                    prepend-icon="event"
                    readonly
                    v-bind="attrs"
                    @blur="date = parseEndDate(endDate)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="endDate" no-title @input="menu2 = false"></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-btn icon class="ma-2" @click="$refs.calendar.next()">이후</v-btn>
      </v-sheet>
      <v-sheet height="600">
        <!-- :event-overlap-mode="mode" -->
        <!-- v-model="value" -->
        <v-calendar
          ref="calendar"
          v-model="value"
          :weekdays="weekday"
          :type="type"
          :events="events"
          :event-overlap-threshold="30"
          @change="getEvents"
        ></v-calendar>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import moment from "moment";
import TodoItem from "@/components/todo/TodoItem.vue";
import TodoCreateModal from "@/components/todo/TodoCreateModal.vue";

export default {
  components: { TodoCreateModal, TodoItem },
  props: {
    todoInfo: {},
    schedule: {
      required: false
    },
    showType: {
      required: true
    },
    sDate: {},
    eDate: {},
    sectionId: {
      required: true
    }
  },
  data() {
    return {
      // 전체일정 데이터
      type: "month",
      types: ["month", "week", "day"],

      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: "일 - 월", value: [0, 1, 2, 3, 4, 5, 6] },
        { text: "월 - 일", value: [1, 2, 3, 4, 5, 6, 0] }
      ],
      value: "",
      events: [],

      // 검색 관련 데이터
      startDate: `${moment(this.sDate).format("YYYY-MM-DD")}`,
      endDate: `${moment(this.eDate).format("YYYY-MM-DD")}`,
      menu1: false,
      menu2: false,

      // 섹션 > 할일 데이터
      todoCreateDialog: ""
    };
  },

  computed: {},

  watch: {
    startDate: function() {
      this.SET_START_DATE(this.startDate);
      this.$emit("searchTodo");
    },
    endDate: function() {
      this.SET_END_DATE(this.endDate);
      this.$emit("searchTodo");
    },
    todoInfo: function() {
      this.getEvents();
    }
  },
  methods: {
    ...mapMutations(["SET_START_DATE", "SET_END_DATE"]),
    // 검색 관련 메소드

    parseStartDate(date) {
      let val = `${moment(date).format("YYYY-MM-DD")}`;
      return val;
    },
    parseEndDate(date) {
      let val = `${moment(date).format("YYYY-MM-DD")}`;
      return val;
    },

    // 전체일정 관련 메소드
    getEvents() {
      const events = [];

      for (let i = 0; i < this.todoInfo.length; i++) {
        let todo = this.todoInfo[i];

        const min = new Date(
          `${moment(todo.startDate).format("YYYY-MM-DD HH:mm:ss")}`
        );
        const max = new Date(
          `${moment(todo.endDate).format("YYYY-MM-DD HH:mm:ss")}`
        );

        const first = new Date(min.getTime());
        const second = new Date(max.getTime());

        events.push({
          name: todo.name,
          start: first,
          end: second,
          color: todo.color
        });
      }

      this.events = events;
    },

    // 섹션 > 할일 메소드
    openTodoCreateDialog() {
      this.todoCreateDialog = true;
    },
    closeTodoCreateDialog() {
      this.todoCreateDialog = false;
    }
  },
  created() {}
};
</script>

<style scoped>
.myTodo {
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  /* align-content: stretch; */
}
</style>
