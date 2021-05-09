<template>
  <v-data-table :headers="headers" :items="noticeInfo" sort-by="calories" style="width:1000px;">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>알림</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:item.categoryId="{ item }">
      <div v-if="item.noticeCheck == 'NONE' && item.noticeType == 2">
        <v-btn @click="updateNotice(item.noticeId, 'TRUE', item.categoryId)">동의</v-btn>
        <v-btn @click="updateNotice(item.noticeId, 'FALSE', item.categoryId)">거절</v-btn>
      </div>
      <div v-else>
        <div v-if="item.noticeCheck == 'TRUE' && item.noticeType == 2" style="color:grey;">동의</div>
        <div v-if="item.noticeCheck == 'FALSE' && item.noticeType == 2" style="color:grey;">거절</div>
      </div>
    </template>
    <template v-slot:item.noticeId="{ item }">
      <v-icon small color="red" @click="deleteItem(item.noticeId)">delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    headers: [
      {
        text: "알림 유형",
        align: "center",
        sortable: false,
        value: "noticeTypeName"
      },

      { text: "내용", value: "text", align: "center" },
      { text: "보낸 사람", value: "fromName", align: "center" },
      { text: "시간", value: "registTime", align: "center" },
      { text: "여부", value: "categoryId", sortable: false, align: "center" },
      { text: "삭제", value: "noticeId", sortable: false, align: "center" }
    ]
  }),
  computed: {
    ...mapState(["noticeInfo"])
  },
  created() {
    this.GET_MY_NOTICE_INFO();
  },
  methods: {
    ...mapActions([
      "DELETE_NOTICE",
      "UPDATE_NOTICE",
      "SHARE_CATEGORY",
      "GET_MY_NOTICE_INFO"
    ]),

    deleteItem(noticeId) {
      if (confirm("해당 알림을 삭제 하시겠습니까?") == true) {
        this.DELETE_NOTICE(noticeId);
      }
    },

    updateNotice(noticeId, noticeCheck, categoryId) {
      this.UPDATE_NOTICE({
        noticeId: noticeId,
        noticeCheck: noticeCheck
      });

      if (noticeCheck == "TRUE") {
        this.SHARE_CATEGORY(categoryId);
      }
    }
  }
};
</script>