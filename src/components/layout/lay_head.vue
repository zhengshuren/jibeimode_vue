<template>
  <div class="lay_header">
    <div class="header_left">
    </div>
    <div class="header_right">
      <span class="header_title">重大活动供电保障调度指挥技术支持系统</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layHeader',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .lay_header {
    height: 56px;
    width: 100%;
    background-color: #1a4663;
    background: linear-gradient(to bottom,#2a7697,#1b3c57);
    display: flex;
    border-bottom: 1px solid #18405f;
    .header_left {
      width: 180px;
      @include bis('logo.png');
      background-size: 107px 36px;
      /*background: url(@/) 0 0 no-repeat;*/
    }
    .header_right {
      flex: 1;
      padding: 13px 10px;
      .header_title {
        display: inline-block;
        line-height: 30px;
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        border-left: 2px solid #1c4965;
        padding-left: 42px;
      }
    }
  }

</style>


