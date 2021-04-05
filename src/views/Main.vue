<template>
  <todo>
    <template v-slot:header>
      <my-header :buttons="headerButtons" />
    </template>

    <template v-slot:left>
      <my-left
        :categoryInfo="categoryInfo"
        v-on:findTodo="findTodo"
        v-on:showType="showType"
      ></my-left>
    </template>

    <template v-slot:content>
      <!-- schedule -->
      <my-todo
        :showType="type"
        :todoInfo="todoInfo"
        :sDate="sDate"
        :eDate="eDate"
        v-on:searchTodo="searchTodo"
      ></my-todo>
    </template>
  </todo>
</template>

<script>
import MyHeader from '@/components/common/MyHeader.vue';
import MyLeft from '@/components/common/MyLeft.vue';
import Todo from '@/components/common/Todo.vue';
import MyTodo from '@/components/todo/MyTodo.vue';
import { mapState, mapActions, mapMutations } from 'vuex';
import moment from 'moment';

export default {
  components: { MyHeader, Todo, MyLeft, MyTodo },
  data() {
    return {
      headerButtons: [
        {
          iconType: 'logout',
          callback: this.logout,
        },
      ],
    };
  },
  methods: {
    ...mapActions([
      'GET_MY_CATEGORY_INFO_ALL',
      'GET_MY_TODO_INFO_ALL',
      'GET_MY_TODO_INFO_BY_SECTION',
    ]),
    ...mapMutations(['SET_TYPE']),
    logout() {
      localStorage.removeItem('token');
      alert('로그아웃 하였습니다.');
      this.$router.push({ name: 'Login' });
    },

    findTodo(sectionId, type) {
      this.GET_MY_TODO_INFO_BY_SECTION(sectionId);
      this.SET_TYPE(type);
    },
    showType(type) {
      this.GET_MY_TODO_INFO_ALL({
        startDate: `${moment(this.sDate).format('YYYY-MM-DD 00:00:00')}`,
        endDate: `${moment(this.eDate).format('YYYY-MM-DD 00:00:00')}`,
      });
      this.SET_TYPE(type);
    },
    searchTodo() {
      this.GET_MY_TODO_INFO_ALL({
        startDate: `${moment(this.sDate).format('YYYY-MM-DD 00:00:00')}`,
        endDate: `${moment(this.eDate).format('YYYY-MM-DD 00:00:00')}`,
      });
    },
  },
  computed: {
    ...mapState(['categoryInfo', 'todoInfo', 'sDate', 'eDate', 'type']),
  },
  created() {
    this.GET_MY_CATEGORY_INFO_ALL();
    this.GET_MY_TODO_INFO_ALL({
      startDate: `${moment(this.sDate).format('YYYY-MM-DD 00:00:00')}`,
      endDate: `${moment(this.eDate).format('YYYY-MM-DD 00:00:00')}`,
    });
  },
};
</script>
