<template>
  <div class="card">
    <div @click="$router.push({ name: 'add-link' })" class="submit-link">
      <div class="plus">+</div>
      <div class="submit-link-text">
        SUBMIT A LINK
      </div>
    </div>
    <div class="content">
      <div v-if="linkItems.length" class="order">
        <select v-model="order" @change="sortLink" name="vote">
          <option :value="1">Most Voted</option>
          <option :value="0">Less Voted</option>
        </select>
      </div>
      <ul v-if="linkItems.length" class="link-list">
        <template v-for="(item, i) in linkItems">
          <LinkItem
            v-if="isActiveItem(i)"
            @deleteLink="deleteLinkTime"
            @up="up"
            @down="down"
            :key="item.time"
            :item="item"
          />
        </template>
      </ul>
      <div class="no-data" v-else>There is no link</div>
    </div>
    <Pagination
      v-if="linkItems.length"
      :total="linkItems.length"
      :perPage="perPage"
      :active="1"
      @selectPage="selectPage"
    />
    <Modal @ok="ok" ref="modal" />
    <SnackBar ref="snackbar">
      <span> {{ deleteItem && deleteItem.linkName }} </span> removed.
    </SnackBar>
  </div>
</template>

<script>
import LinkItem from "@/components/LinkItem";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal";
import SnackBar from "@/components/SnackBar";

export default {
  name: "Home",
  components: {
    LinkItem,
    Pagination,
    Modal,
    SnackBar,
  },
  data() {
    return {
      linkItems: [],
      deleteItem: null,
      order: 1,
      activePage: 1,
      perPage: 5,
    };
  },
  methods: {
    deleteLinkTime(val) {
      this.deleteItem = val;
      this.$refs.modal.isShow = true;
    },
    ok() {
      const index = this.linkItems.findIndex(
        (x) => x.time === this.deleteItem.time
      );
      this.linkItems.splice(index, 1);
      localStorage.setItem("link-list", JSON.stringify(this.linkItems));
      this.$refs.snackbar.isShow = true;
    },
    up(val) {
      this.linkItems = this.linkItems.map((x) => {
        if (x.time === val) {
          x.point += 1;
        }
        return x;
      });
      localStorage.setItem("link-list", JSON.stringify(this.linkItems));
      this.sortLink();
    },
    down(val) {
      this.linkItems = this.linkItems.map((x) => {
        if (x.time === val) {
          x.point -= 1;
        }
        return x;
      });
      localStorage.setItem("link-list", JSON.stringify(this.linkItems));
      this.sortLink();
    },
    sortLink() {
      this.linkItems.sort((vote1, vote2) => {
        if (vote1.point > vote2.point) return this.order ? -1 : 1;
        if (vote1.point < vote2.point) return this.order ? 1 : -1;

        if (vote1.time > vote2.time) return this.order ? -1 : 1;
        if (vote1.time < vote2.time) return this.order ? 1 : -1;
      });
    },
    selectPage(val) {
      this.activePage = val;
    },
    isActiveItem(val) {
      return (
        (this.activePage - 1) * this.perPage <= val &&
        this.activePage * this.perPage > val
      );
    },
  },
  mounted() {
    if (localStorage.getItem("link-list")) {
      this.linkItems = JSON.parse(localStorage.getItem("link-list"));
      this.sortLink();
    }
  },
};
</script>

<style lang="scss" scoped>
.submit-link {
  border-radius: 5px;
  padding: 10px;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  .plus {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    border: 2px solid #cccccc;
    border-radius: 5px;
    font-size: 54px;
    font-weight: 600;
  }
  .submit-link-text {
    font-family: sans-serif;
    text-align: center;
    font-size: 32px;
    font-weight: 500;
    letter-spacing: 2px;
    flex: 1;
  }
}

.content {
  border-top: 3px solid #f1f1f1;
  margin-top: 15px;
  padding-top: 10px;
  .order {
    margin-left: 12px;
    select {
      height: 40px;
      width: 200px;
      padding-left: 10px;
      outline: none;
    }
  }
}

.link-list {
  margin-top: 10px;
}

.no-data {
  text-align: center;
  padding: 50px 0 40px 0;
  font-size: 20px;
}
</style>
