<template>
  <div class="sub-header">
    <div class="back" @click="$router.go(-1)" v-show="isBack"></div>
    <div class="title">{{ title }}</div>
    <div class="right-btn" v-if="rightText ? true : false" @click="submit()">
      {{ rightText }}
    </div>
  </div>
</template>

<script>
export default {
  name: "sub-header",
  props: {
    title: {
      type: String,
      default: "",
    },
    isBack: {
      type: Boolean,
      default: true,
    },
    rightText: {
      type: String,
      default: "",
    },
  },
  methods: {
    submit() {
      this.$emit("submit");
    },
  },
};
</script>

<style scoped>
.sub-header {
  width: 100%;
  height: 1rem;
  background-color: #ffffff;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  border-bottom: 1px solid #efefef;
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  justify-content: space-between;
  padding: 0px 0.1rem;
  box-sizing: border-box;
}

.sub-header .back {
  width: 0.8rem;
  height: 0.8rem;
  background-image: url("../../assets/images/home/goods/back.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.sub-header .title {
  width: 79%;
  height: auto;
  font-size: 0.32rem;
  text-align: center;
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.sub-header .right-btn {
  width: auto;
  height: auto;
  font-size: 0.32rem;
}
</style>
