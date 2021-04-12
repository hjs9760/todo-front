<template>
  <div class="left">
    <v-card class="mx-auto" width="300">
      <v-list>
        <v-list-item>
          <v-list-item-title class="my-button" @click="setType(1)">전체 일정</v-list-item-title>
          <v-list-item-icon>
            <v-icon @click="opencCategoryDialog()">mdi-plus</v-icon>
          </v-list-item-icon>
        </v-list-item>

        <!-- 카테고리 생성 모달  -->
        <v-dialog v-model="categoryDialog" persistent max-width="900px">
          <v-card>
            <v-card-title>
              <template>
                <v-icon style="margin-right:10px;" large color="#41B883">update</v-icon>
                <span class="headline" large>카테고리 추가</span>
              </template>
              <v-spacer></v-spacer>
              <v-btn icon @click="closeCategoryDialog()">
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
                  <category-create-modal v-on:closeCategoryDialog="closeCategoryDialog"></category-create-modal>
                  <!-- 업로드 컴포넌트 -->
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- end 카테고리 생성 모달  -->

        <!-- 섹션영역 -->
        <div v-for="(category, index) in categoryInfo" :key="index">
          <v-list-group>
            <template v-slot:activator>
              <v-icon v-bind:style="{ color: category.statusColor }">mdi-thumb-up</v-icon>
              <v-list-item-title>{{ category.name }}</v-list-item-title>
            </template>

            <div v-for="(section, index) in category.sectionInfo" :key="index">
              <v-list-group sub-group prepend-icon>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title @click="findTodo(section.sectionId)">{{ section.name }}</v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-list-group>
            </div>
          </v-list-group>
        </div>
        <!-- end 섹션영역 -->
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import CategoryCreateModal from "@/components/category/CategoryCreateModal.vue";

export default {
  components: { CategoryCreateModal },
  props: {
    categoryInfo: {
      required: false,
      default: () => {}
    }
  },
  computed: {
    ...mapState(["showType"])
  },
  data() {
    return {
      categoryDialog: false
    };
  },
  methods: {
    ...mapMutations(["SET_TYPE"]),

    findTodo(sectionId) {
      this.SET_TYPE(2);
      this.$emit("findTodo", sectionId, 2);
    },
    setType(type) {
      this.SET_TYPE(type);
      this.$emit("showType", this.showType);
    },

    opencCategoryDialog() {
      //Dialog 열리는 동작
      this.categoryDialog = true;
    },
    closeCategoryDialog() {
      //Dialog 닫히는 동작
      this.categoryDialog = false;
    }
  }
};
</script>

<style scoped>
.left {
  display: flex;
  flex: 1;
}
.my-button {
  cursor: pointer;
}

.statusGreen {
  color: green;
}
.statusBlue {
  color: blue;
}
.statusGrey {
  color: grey;
}
</style>
