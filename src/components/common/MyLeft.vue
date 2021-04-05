<template>
  <div class="left">
    <v-card class="mx-auto" width="300">
      <v-list>
        <v-list-item>
          <v-list-item-title class="my-button" @click="showType(1)"
            >전체 일정</v-list-item-title
          >
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>
        </v-list-item>

        <div v-for="(category, index) in categoryInfo" :key="index">
          <v-list-group :value="true" prepend-icon="mdi-account-circle">
            <template v-slot:activator>
              <v-list-item-title>{{ category.name }}</v-list-item-title>
            </template>

            <div v-for="(section, index) in category.sectionInfo" :key="index">
              <v-list-group :value="true" no-action sub-group>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title @click="findTodo(section.sectionId)">{{
                      section.name
                    }}</v-list-item-title>
                  </v-list-item-content>
                </template>

                <!-- <v-list-item v-for="([title, icon], i) in admins" :key="i" link>
                <v-list-item-title v-text="title"></v-list-item-title>

                <v-list-item-icon>
                  <v-icon v-text="icon"></v-icon>
                </v-list-item-icon>
                </v-list-item>-->
              </v-list-group>
            </div>
          </v-list-group>
        </div>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    categoryInfo: {
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      type: 1,
    };
  },
  methods: {
    ...mapMutations(['SET_TYPE']),

    findTodo(sectionId) {
      this.SET_TYPE(2);
      this.$emit('findTodo', sectionId, 2);
    },
    showType(type) {
      this.SET_TYPE(type);
      this.$emit('showType', type);
    },
  },
};
</script>

<style scoped>
.left {
  flex: 1;
}
.my-button {
  cursor: pointer;
}
</style>
