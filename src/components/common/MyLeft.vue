<template>
  <div>
    <v-btn style="margin:10px;" @click="opencCategoryDialog()">
      <v-icon>mdi-plus</v-icon>카테고리 추가
    </v-btn>

    <div class="left">
      <v-card class="mx-auto" width="350">
        <v-list>
          <v-list-item>
            <v-icon>mdi-dialpad</v-icon>
            <v-list-item-title class="my-button" @click="setType(1)">전체 일정</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-icon>mdi-call-split</v-icon>
            <v-list-item-title class="my-button" @click="goNotice(3)">알림</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-icon>mdi-account</v-icon>
            <v-list-item-title class="my-button" @click="goShare(4)">공유</v-list-item-title>
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
                <v-list-item-title>
                  <section-create-item :category="category"></section-create-item>
                </v-list-item-title>
              </template>

              <div v-for="(section, index) in category.sectionInfo" :key="index">
                <v-list-group sub-group>
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title @click="findTodo(section.sectionId)">
                        <section-update-item
                          :sectionId="section.sectionId"
                          :sectionName="section.name"
                        ></section-update-item>
                      </v-list-item-title>
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
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import CategoryCreateModal from "@/components/category/CategoryCreateModal.vue";
import SectionCreateItem from "@/components/section/SectionCreateItem.vue";
import SectionUpdateItem from "@/components/section/SectionUpdateItem.vue";

export default {
  components: { CategoryCreateModal, SectionCreateItem, SectionUpdateItem },
  props: {
    categoryInfo: {
      required: false,
      default: () => {}
    }
  },
  computed: {
    ...mapState(["showType", "sectionId"])
  },
  data() {
    return {
      categoryDialog: false
    };
  },
  methods: {
    ...mapMutations(["SET_TYPE", "SET_SECTIONID", "SET_LEFT_TYPE"]),

    findTodo(sectionId) {
      this.SET_LEFT_TYPE(1);
      this.$emit("findTodo", sectionId);
    },
    setType(type) {
      this.SET_TYPE(type);
      this.SET_LEFT_TYPE(type);
      this.$emit("showType", this.showType);
    },

    opencCategoryDialog() {
      //Dialog 열리는 동작
      this.categoryDialog = true;
    },
    closeCategoryDialog() {
      //Dialog 닫히는 동작
      this.categoryDialog = false;
    },
    goNotice(type) {
      this.$emit("showLeftType", type);
    },
    goShare(type) {
      this.$emit("showLeftType", type);
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
  /* text-align: left; */
  color: darkblue;
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
