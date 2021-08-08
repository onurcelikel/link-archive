<template>
  <div class="pagination">
    <div @click="prev" class="back">❮</div>
    <ul class="pages">
      <li
        v-for="i in pageCount"
        @click="selectPage(i)"
        :class="{ active: activePage === i }"
        :key="i"
      >
        {{ i }}
      </li>
    </ul>
    <div @click="next" class="next">❯</div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      pageCount: 0,
      activePage: 0,
    };
  },
  methods: {
    selectPage(val) {
      this.$emit("selectPage", val);
      this.activePage = val;
    },
    prev() {
      if (this.activePage > 1) {
        this.$emit("selectPage", this.activePage - 1);
        this.activePage -= 1;
      }
    },
    next() {
      if (this.activePage < this.pageCount) {
        this.$emit("selectPage", this.activePage + 1);
        this.activePage += 1;
      }
    },
    calcPageCount() {
      this.pageCount = Math.ceil(this.total / this.perPage);
    },
  },
  mounted() {
    this.calcPageCount();
    this.activePage = this.active;
  },
  watch: {
    total() {
      this.calcPageCount();
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  margin-top: 20px;
  .pages {
    display: flex;
    margin: 0 8px;
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border: 1px solid #000000;
      margin: 0 2px;
      transition: all 0.2s linear;
      cursor: pointer;
      &.active {
        background-color: #000000;
        color: #ffffff;
      }
    }
  }
  .back,
  .next {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 26px;
    height: 26px;
  }
}
</style>
