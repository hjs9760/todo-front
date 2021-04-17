<template>
  <div style="float:right;">
    {{categoryName}}
    <v-btn text color="grey" @click="openSectionCreateDialog()" class="btn">+ 추가</v-btn>
    <v-btn text color="grey" @click="openCategoryUpdateDialog()" class="btn">
      <v-icon>mdi-wrench</v-icon>
    </v-btn>

    <!-- 카테고리 수정 모달 -->
    <v-dialog v-model="categoryUpdateDialog" persistent max-width="900px">
      <v-card>
        <v-card-title>
          <template>
            <v-icon style="margin-right:10px;" large color="#41B883">update</v-icon>
            <span class="headline" large>{{this.category.name}}</span>
          </template>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeCategoryUpdateDialog()">
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
              <category-update-modal
                v-on:closeCategoryUpdateDialog="closeCategoryUpdateDialog"
                :category="category"
              ></category-update-modal>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- end 카테고리 수정 모달 -->

    <!-- 섹션 생성 모달창 -->
    <v-dialog v-model="sectionCreateDialog" persistent max-width="900px">
      <v-card>
        <v-card-title>
          <template>
            <v-icon style="margin-right:10px;" large color="#41B883">update</v-icon>
            <span class="headline" large>섹션 추가</span>
          </template>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeSectionCreateDialog()">
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
              <section-create-modal
                :categoryId="category.id"
                v-on:closeSectionCreateDialog="closeSectionCreateDialog"
              ></section-create-modal>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SectionCreateModal from "@/components/section/SectionCreateModal.vue";
import CategoryUpdateModal from "@/components/category/CategoryUpdateModal.vue";

export default {
  components: { SectionCreateModal, CategoryUpdateModal },
  props: {
    category: {}
  },

  data() {
    return {
      categoryName:
        this.category.name.length > 5
          ? this.category.name.slice(0, 4) + "..."
          : this.category.name,
      sectionCreateDialog: false,
      categoryUpdateDialog: false
    };
  },
  methods: {
    openSectionCreateDialog() {
      this.sectionCreateDialog = true;
    },
    closeSectionCreateDialog() {
      this.sectionCreateDialog = false;
    },
    openCategoryUpdateDialog() {
      this.categoryUpdateDialog = true;
    },
    closeCategoryUpdateDialog() {
      this.categoryUpdateDialog = false;
    }
  }
};
</script>

<style scoped>
v-btn {
  padding: 5px;
}
</style>