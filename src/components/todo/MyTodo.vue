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
    <div v-if="showType == 2">
      <div v-for="(todo, index) in todoInfo" :key="index">
        <span>
          <v-card elevation="2" outlined shaped tile>
            제목: {{ todo.name }} (상태: {{ todo.statusName }})
            <v-card-subtitle
              >기간 : {{ todo.startDate }} ~ {{ todo.endDate }}</v-card-subtitle
            >
            <v-card-text>내용 : {{ todo.content }}</v-card-text>

            <v-btn @click="openDialog()">수정</v-btn>
          </v-card>
        </span>

        <!-- 할일 수정 모달창 -->
        <v-dialog v-model="dialog" persistent max-width="900px">
          <v-card>
            <v-card-title>
              <template>
                <v-icon style="margin-right:10px;" large color="#41B883"
                  >update</v-icon
                >
                <span class="headline" large>{{ todo.name }}</span>
              </template>
              <v-spacer></v-spacer>
              <v-btn icon @click="closeDialog()">
                <!-- closeDialog 클릭 이벤트 -->
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
                  <todo-update-modal
                    :todo="todo"
                    v-on:closeDialog="closeDialog"
                  ></todo-update-modal>
                  <!-- 업로드 컴포넌트 -->
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
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
                <v-date-picker
                  v-model="startDate"
                  no-title
                  @input="menu1 = false"
                ></v-date-picker>
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
                <v-date-picker
                  v-model="endDate"
                  no-title
                  @input="menu2 = false"
                ></v-date-picker>
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
import { mapMutations } from 'vuex';
import moment from 'moment';
import TodoUpdateModal from '@/components/todo/TodoUpdateModal.vue';

export default {
  components: { TodoUpdateModal },
  props: {
    todoInfo: {},
    schedule: {
      required: false,
    },
    showType: {
      required: true,
    },
    sDate: {},
    eDate: {},
  },
  data() {
    return {
      // 전체일정 데이터
      type: 'month',
      types: ['month', 'week', 'day'],

      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: '일 - 월', value: [0, 1, 2, 3, 4, 5, 6] },
        { text: '월 - 일', value: [1, 2, 3, 4, 5, 6, 0] },
      ],
      value: '',
      events: [],

      // 검색 관련 데이터
      startDate: `${moment(this.sDate).format('YYYY-MM-DD')}`,
      endDate: `${moment(this.eDate).format('YYYY-MM-DD')}`,
      menu1: false,
      menu2: false,

      // 섹션 > 할일 데이터
      dialog: '',
    };
  },

  computed: {},

  watch: {
    startDate: function() {
      this.SET_START_DATE(this.startDate);
      this.$emit('searchTodo');
    },
    endDate: function() {
      this.SET_END_DATE(this.endDate);
      this.$emit('searchTodo');
    },
    todoInfo: function() {
      this.getEvents();
    },
  },
  methods: {
    ...mapMutations(['SET_START_DATE', 'SET_END_DATE']),
    // 검색 관련 메소드

    parseStartDate(date) {
      let val = `${moment(date).format('YYYY-MM-DD')}`;
      return val;
    },
    parseEndDate(date) {
      let val = `${moment(date).format('YYYY-MM-DD')}`;
      return val;
    },

    // 전체일정 관련 메소드
    getEvents() {
      const events = [];

      for (let i = 0; i < this.todoInfo.length; i++) {
        let todo = this.todoInfo[i];

        const min = new Date(
          `${moment(todo.startDate).format('YYYY-MM-DD HH:mm:ss')}`
        );
        const max = new Date(
          `${moment(todo.endDate).format('YYYY-MM-DD HH:mm:ss')}`
        );

        const first = new Date(min.getTime());
        const second = new Date(max.getTime());

        events.push({
          name: todo.name,
          start: first,
          end: second,
          color: todo.color,
        });
      }

      this.events = events;
    },
    // getEventColor(event) {

    // 섹션 > 할일 메소드
    openDialog() {
      //Dialog 열리는 동작
      this.dialog = true;
    },
    closeDialog() {
      //Dialog 닫히는 동작
      this.dialog = false;
    },
  },
  created() {},
};
</script>

<style scoped>
.left {
  flex: 2;
}
</style>
