<template>
  <div>
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on">{{ sectionNameString }}</span>
      </template>
      {{this.sectionName}}
    </v-tooltip>

    <v-btn text color="grey" @click="openSectionUpdateDialog()">
      <v-icon>mdi-wrench</v-icon>
    </v-btn>

    <!-- 섹션 생성 모달창 -->
    <v-dialog v-model="sectionUpdateDialog" persistent max-width="900px">
      <v-card>
        <v-card-title>
          <template>
            <v-icon style="margin-right:10px;" large color="#41B883">update</v-icon>
            <span class="headline" large>섹션 수정</span>
          </template>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeSectionUpdateDialog()">
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
              <section-update-modal
                :sectionId="sectionId"
                :sectionName="sectionName"
                v-on:closeSectionUpdateDialog="closeSectionUpdateDialog"
              ></section-update-modal>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SectionUpdateModal from "@/components/section/SectionUpdateModal.vue";

export default {
  components: { SectionUpdateModal },
  props: {
    sectionId: {},
    sectionName: {}
  },
  data() {
    return {
      sectionUpdateDialog: false,
      sectionNameString:
        this.sectionName.length > 8
          ? this.sectionName.slice(0, 7) + "..."
          : this.sectionName
    };
  },
  methods: {
    openSectionUpdateDialog() {
      this.sectionUpdateDialog = true;
    },
    closeSectionUpdateDialog() {
      this.sectionUpdateDialog = false;
    }
  }
};
</script>

<style>
</style>