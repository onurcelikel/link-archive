<template>
  <div v-if="isShow" class="modal">
    <div class="modal-wrapper">
      <div class="modal-header">
        <div class="modal-title">Remove Link</div>
        <div @click="isShow = false" class="modal-close">x</div>
      </div>
      <div class="modal-body">
        <div class="content">
          <p>Do you want to remove</p>
          <div class="link-name">REDDIT</div>
        </div>
        <div class="buttons">
          <button @click="ok" type="button">OK</button>
          <button @click="isShow = false" type="button">CANCEL</button>
        </div>
      </div>
    </div>
    <div class="modal-overlay"></div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    ok() {
      this.$emit("ok");
      this.isShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  .modal-wrapper {
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    width: 400px;
    height: auto;
    margin: auto;
    background-color: #ffffff;
  }
  .modal-overlay {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2;
  }

  .modal-header {
    background-color: #000000;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    color: #ffffff;
    .modal-title {
    }
    .modal-close {
      cursor: pointer;
    }
  }
  .modal-body {
    .content {
      padding: 30px;
      text-align: center;
      p {
        font-size: 16px;
        margin-bottom: 10px;
      }
      .link-name {
        font-size: 20px;
        font-weight: 600;
      }
    }
    .buttons {
      display: flex;
      justify-content: center;
      width: 100%;
      button {
        margin: 0 15px 25px 15px;
        height: 40px;
        width: 100px;
        border: 2px solid #000000;
        background-color: #000000;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
}
</style>
