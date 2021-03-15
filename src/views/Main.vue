<template>
  <todo>
    <template v-slot:header>
      <my-header :buttons="headerButtons" />
    </template>
    <template v-slot:left>
      <my-left :category="category"></my-left>
    </template>
  </todo>
</template>

<script>
import MyHeader from '@/components/common/MyHeader.vue';
import MyLeft from '@/components/common/MyLeft.vue';
import Todo from '@/components/common/Todo.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: { MyHeader, Todo, MyLeft },
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
    ...mapActions(['GET_MY_TODO_INFO_ALL']),

    logout() {
      localStorage.removeItem('token');
      alert('로그아웃 하였습니다.');
      this.$router.push({ name: 'Login' });
    },
  },
  computed: {
    ...mapState(['todoInfo']),
  },
  created() {
    this.GET_MY_TODO_INFO_ALL();
  },
};
</script>

<style></style>
