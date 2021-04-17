<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th style="text-align:center; width:100px;">내용</th>
            <th style="text-align:center; width:300px;">값</th>
            <th style="text-align:center; width:200px;">설명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>제목</td>
            <td>
              <input v-model="name" type="text" class="date" />
            </td>
            <td></td>
          </tr>

          <tr>
            <td>상태</td>
            <td>
              <v-btn @click="changeStatus('PROGRESS', '진행')" color="green">진행</v-btn>
              <v-btn @click="changeStatus('COMPLETE', '완료')" color="blue">완료</v-btn>
              <v-btn @click="changeStatus('STATELESS', '상태없음')" color="grey">상태없음</v-btn>
            </td>

            <td>선택한 상태 : {{statusName }}</td>
          </tr>
          <tr>
            <td>시작 날짜</td>
            <td>
              <input v-model="startDate" type="text" class="date" />
            </td>
            <td>yyyy-mm-dd(년-월-일) 형식으로 입력하세요.</td>
          </tr>
          <tr>
            <td>종료 날짜</td>
            <td>
              <input v-model="endDate" type="text" class="date" />
            </td>
            <td>yyyy-mm-dd(년-월-일) 형식으로 입력하세요.</td>
          </tr>
          <tr></tr>
        </tbody>
      </template>
    </v-simple-table>
    <span>
      <v-btn @click="updateCategory">수정</v-btn>
      <v-btn @click="resetInfo">초기화</v-btn>
      <v-btn @click="deleteCategory" color="red">삭제</v-btn>
    </span>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";

export default {
  props: {
    category: {}
  },
  data() {
    return {
      categoryId: this.category.id,
      name: this.category.name,
      status: this.category.status,
      statusName: this.category.statusName,
      startDate:
        this.category.startDate == null
          ? ""
          : `${moment(this.category.startDate).format("YYYY-MM-DD")}`,
      endDate:
        this.category.endDate == null
          ? ""
          : `${moment(this.category.endDate).format("YYYY-MM-DD")}`
    };
  },

  methods: {
    ...mapActions(["UPDATE_CATEGORY", "DELETE_CATEGORY"]),

    changeStatus(status, statusName) {
      this.status = status;
      this.statusName = statusName;
    },

    resetInfo() {
      this.name = this.category.name;
      this.content = this.category.content;
      this.status = this.category.status;
      this.startDate = this.category.startDate;
      this.endDate = this.category.endDate;
    },

    updateCategory() {
      let regExp = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

      if (
        (this.startDate != "" && !regExp.test(this.startDate)) ||
        (this.endDate != "" && !regExp.test(this.endDate))
      ) {
        return alert("날짜 형식에 맞춰서 입력해주세요.");
      }

      this.UPDATE_CATEGORY({
        categoryId: this.categoryId,
        name: this.name,
        status: this.status,
        startDate: this.startDate == "" ? null : this.startDate,
        endDate: this.endDate == "" ? null : this.endDate
      });

      this.resetInfo();
      this.$emit("closeCategoryUpdateDialog");
    },

    deleteCategory() {
      if (
        confirm(
          "해당 카테고리를 삭제하실경우 하위 섹션, 할일도 모두 삭제됩니다. \n삭제 하시겠습니까?"
        )
      ) {
        // 삭제 함수  호출
        this.DELETE_CATEGORY(this.categoryId);
        this.$router.push("/main");
      }
      this.$emit("closeCategoryUpdateDialog");
    }
  }
};
</script>

<style>
.date {
  width: 200px;
}
</style>
