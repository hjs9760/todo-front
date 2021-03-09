<template>
  <todo>
    <template v-slot:header>
      <my-header />
    </template>
    <template v-slot:left>
      <my-left :category="category"></my-left>
    </template>
  </todo>
</template>

<script>
import MyHeader from "@/components/common/MyHeader.vue";
import MyLeft from "@/components/common/MyLeft.vue";
import Todo from "@/components/common/Todo.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: { MyHeader, Todo, MyLeft },
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
    ...mapActions(["GET_MY_TODO_INFO_ALL"])
  },
  computed: {
    ...mapState(["todoInfo"])
  },
  created() {
    this.GET_MY_TODO_INFO_ALL();
  }
};
</script>

<style>
</style>