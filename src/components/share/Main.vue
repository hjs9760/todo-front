<template>
  <v-data-table
    :headers="headers"
    :items="shareCategoryInfo"
    sort-by="calories"
    style="width:1000px;"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>공유</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:item.shareMemberInfos="{ item }">
      <v-container fluid class="text-center">
        <v-row class="flex" justify="space-between">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">{{item.shareMemberInfos.shareCount}}</v-btn>
            </template>
            <span>{{item.shareMemberInfos.name}}</span>
          </v-tooltip>
        </v-row>
      </v-container>
    </template>
    <template v-slot:item.categoryId="{ item }">
      <v-icon small color="blue" @click="openShareCreateDialog(item.categoryId)">mdi-account</v-icon>
      <!-- 할일 추가 모달창 -->
      <v-dialog v-model="shareModal" persistent max-width="900px">
        <v-card>
          <v-card-title>
            <template>
              <v-icon style="margin-right:10px;" large color="#41B883">mdi-account</v-icon>
              <span class="headline" large>{{item.name}} > 공유</span>
            </template>
            <v-spacer></v-spacer>
            <v-btn icon @click="closeShareCreateDialog()">
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
                <share-create-modal
                  :categoryId="item.categoryId"
                  v-on:closeShareCreateDialog="closeShareCreateDialog"
                ></share-create-modal>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- end 할일 추가 모달창  -->
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ShareCreateModal from "@/components/share/ShareCreateModal.vue";

export default {
  components: { ShareCreateModal },
  data: () => ({
    headers: [
      {
        text: "카테고리 명",
        align: "center",
        sortable: false,
        value: "name"
      },

      { text: "상태", value: "statusName" },
      { text: "시작", value: "startDate", align: "center" },
      { text: "마감", value: "endDate", align: "center" },
      {
        text: "공유 수",
        value: "shareMemberInfos",
        sortable: false
      },
      { text: "공유", value: "categoryId", sortable: false, align: "center" }
    ],
    shareModal: false
  }),
  computed: {
    ...mapState(["shareCategoryInfo"])
  },
  created() {
    this.GET_MY_CATEGORY_SHARE_INFO();
  },
  props: {},

  methods: {
    ...mapActions(["GET_MY_CATEGORY_SHARE_INFO"]),
    openShareCreateDialog() {
      this.shareModal = true;
    },
    closeShareCreateDialog() {
      this.shareModal = false;
    }
  }
};
</script>