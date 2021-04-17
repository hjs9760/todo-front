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
      <v-btn @click="createSection">추가</v-btn>
    </span>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    categoryId: {
      required: true
    }
  },
  data() {
    return {
      name: ""
    };
  },
  created() {},
  methods: {
    ...mapActions(["CREATE_SECTION"]),

    createSection() {
      if (this.name == "") {
        return alert("섹션명을 입력해주세요.");
      }

      this.CREATE_SECTION({
        categoryId: this.categoryId,
        name: this.name
      });

      this.refreshData();
      this.$emit("closeSectionCreateDialog");
    },

    refreshData() {
      this.name = "";
    }
  }
};
</script>

<style>
.date {
  width: 200px;
}
</style>
