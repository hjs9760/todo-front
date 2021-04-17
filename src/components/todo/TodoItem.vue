<template>
  <div style="background-color:red;">
    <v-card
      class="todoItem"
      @click="openModal()"
      elevation="2"
      outlined
      shaped
      tile
      v-bind:style="{ 'background-color': todo.color  }"
    >
      제목: {{ todo.name }}
      <v-card-subtitle>기간 : {{ todo.startDate }} ~ {{ todo.endDate }}</v-card-subtitle>
      <v-card-text>내용 : {{ todo.content }}</v-card-text>
    </v-card>
    <!-- 할일 수정 모달창 -->
    <v-dialog v-model="show" persistent max-width="900px">
      <v-card>
        <v-card-title>
          <template>
            <v-icon style="margin-right:10px;" large color="#41B883">update</v-icon>
            <span class="headline" large>{{ todo.name }}</span>
          </template>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeModal()">
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
              <todo-update-modal :todo="todo" v-on:closeModal="closeModal" :show="show"></todo-update-modal>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import TodoUpdateModal from "@/components/todo/TodoUpdateModal.vue";

export default {
  components: { TodoUpdateModal },
  props: {
    todo: {}
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    openModal() {
      this.show = true;
    },
    closeModal() {
      this.show = false;
    }
  }
};
</script>

<style scoped>
.todoItem {
  width: 250px;
  height: 200px;
  /* background-color: #2196f3; */
}
</style>