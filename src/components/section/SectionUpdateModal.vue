<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead></thead>
        <tbody>
          <tr>
            <td>섹션명</td>
            <td>
              <input v-model="name" type="text" class="date" placeholder="섹션명을 입력해주세요" />
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <span>
      <v-btn @click="updateSection">수정</v-btn>
      <v-btn @click="refreshData">초기화</v-btn>
      <v-btn color="red" @click="deleteSection">삭제</v-btn>
    </span>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    sectionId: {
      required: true
    },
    sectionName: {
      required: true
    }
  },
  data() {
    return {
      name: this.sectionName
    };
  },

  methods: {
    ...mapActions(["UPDATE_SECTION", "DELETE_SECTION"]),

    updateSection() {
      if (this.name == "") {
        return alert("섹션명을 입력해주세요.");
      }

      this.UPDATE_SECTION({
        sectionId: this.sectionId,
        name: this.name
      });

      this.refreshData();
      this.$emit("closeSectionUpdateDialog");
    },

    deleteSection() {
      if (
        confirm(
          "해당 섹션을 삭제하실경우 하위 할일도 모두 삭제됩니다. \n삭제 하시겠습니까?"
        )
      ) {
        this.DELETE_SECTION(this.sectionId);
      }

      this.$emit("closeSectionUpdateDialog");
    },

    refreshData() {
      this.name = this.sectionName;
    }
  }
};
</script>

<style>
.date {
  width: 200px;
}
</style>
