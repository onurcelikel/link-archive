<template>
  <li class="link-item">
    <div class="points">
      <span>{{ item.point }}</span>
      POINTS
    </div>
    <div class="link-infos">
      <div>
        <div class="link-name">{{ item.linkName }}</div>
        <a :href="item.linkUrl" target="_blank" class="link">
          {{ item.linkUrl }}
        </a>
        <button
          @click="deleteLink"
          type="button"
          class="delete-button"
        ></button>
      </div>
      <div class="vote">
        <div @click="$emit('up', item.time)" class="up">Up 👍</div>
        <div @click="$emit('down', item.time)" class="down">Down 👎</div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "LinkItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteLink() {
      this.$emit("deleteLink", this.item);
    },
  },
};
</script>

<style lang="scss" scoped>
.link-item {
  display: flex;
  transition: all 0.3s linear;
  padding: 12px;
  border-radius: 5px;
  position: relative;
  &:before {
    content: "";
    width: calc(100% - 10px);
    height: 1px;
    background-color: #f1f1f1;
    position: absolute;
    bottom: 0;
    left: 5px;
  }
  &:hover {
    background-color: #f1f1f1;
    .link-infos .delete-button {
      display: block;
    }
  }
  .points {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 70px;
    height: 70px;
    border-radius: 5px;
    border: 2px solid #cccccc;
    background-color: #f1f1f1;
    font-size: 12px;
    span {
      font-size: 34px;
      font-weight: bold;
    }
  }

  .link-infos {
    flex: 1;
    padding-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    .link-name {
      font-size: 18px;
      font-weight: bold;
    }
    .link {
      margin-top: 3px;
      align-self: flex-start;
      color: #4b8aff;
    }

    .delete-button {
      border: 2px solid #ffffff;
      background-color: #f00;
      color: #ffffff;
      border-radius: 50%;
      position: absolute;
      outline: none;
      width: 24px;
      height: 24px;
      top: -14px;
      right: -14px;
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
      -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
      display: none;
      cursor: pointer;
      &:before {
        content: "";
        position: absolute;
        width: 10px;
        height: 2px;
        background-color: #f1f1f1;
        top: 50%;
        left: 50%;
        margin-left: -5px;
        margin-top: -1px;
      }
    }

    .vote {
      display: flex;
      justify-content: space-between;
      .up,
      .down {
        cursor: pointer;
      }
    }
  }
}
</style>
