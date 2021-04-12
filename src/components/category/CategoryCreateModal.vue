<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th style="text-align:center; width:100px;">
              내용
            </th>
            <th style="text-align:center; width:300px;">
              값
            </th>
            <th style="text-align:center; width:200px;">
              설명
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>제목</td>
            <td><input v-model="name" type="text" class="date" /></td>
            <td></td>
          </tr>

          <tr>
            <td>상태</td>
            <td>
              <v-btn @click="changeStatus('PROGRESS', '진행')" color="green"
                >진행</v-btn
              >
              <v-btn @click="changeStatus('COMPLETE', '완료')" color="blue"
                >완료</v-btn
              >
              <v-btn @click="changeStatus('STATELESS', '상태없음')" color="grey"
                >상태없음</v-btn
              >
            </td>

            <td>선택한 상태 : {{ statusName }}</td>
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
    <span><v-btn @click="createCategory"> 생성 </v-btn></span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import moment from 'moment';

export default {
  data() {
    return {
      name: '',
      status: '',
      statusName: '',
      startDate: `${moment().format('YYYY-MM-DD')}`,
      endDate: `${moment(this.startDate)
        .endOf('months')
        .format('YYYY-MM-DD')}`,
    };
  },
  methods: {
    ...mapActions(['CREATE_CATEGORY']),

    changeStatus(status, statusName) {
      this.status = status;
      this.statusName = statusName;
    },

    createCategory() {
      let regExp = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

      if (!regExp.test(this.startDate) || !regExp.test(this.startDate)) {
        return alert('날짜 형식에 맞춰서 입력해주세요.');
      }

      this.CREATE_CATEGORY({
        name: this.name,
        status: this.status,
        startDate: `${moment(this.startDate).format('YYYY-MM-DD')}`,
        endDate: `${moment(this.endDate).format('YYYY-MM-DD')}`,
      });

      this.$emit('closeCategoryDialog');
    },
  },
};
</script>

<style>
.date {
  width: 200px;
}
</style>
