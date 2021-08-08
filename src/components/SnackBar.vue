<template>
  <div v-if="isShow" class="snackbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SnackBar",
  data() {
    return {
      isShow: false,
    };
  },
  watch: {
    isShow(val) {
      setTimeout(() => {
        if (val) {
          this.isShow = false;
        }
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
.snackbar {
  padding: 20px 40px;
  border: 2px solid #008000;
  background-color: #a0ffa0;
  border-radius: 5px;
  font-size: 20px;
  color: #008000;
  text-align: center;
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  span {
    font-weight: bold;
  }
}
</style>
