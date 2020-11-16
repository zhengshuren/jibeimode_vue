<template>
  <div class="leftMeau">
    <div class="my_submenu">
      <span class="my_submenu_title">保障级别</span>
      <div class="my_submenu_item my_submenu_item_bottom">
        <span class="my_submenu_item_title my_submenu_item_title_active" ref="super"
              @click="selectMeau('特级', 'super')">特级</span>
        <span class="my_submenu_item_title" ref="one"
              @click="selectMeau('一级', 'one')">一级</span>
        <span class="my_submenu_item_title" ref="two"
              @click="selectMeau('二级', 'two')">二级</span>
      </div>
      <!--<span class="my_submenu_title">保电重要用户供电路径图</span>-->
      <!--<div class="my_submenu_item my_submenu_item_bottom">-->
        <!--<span class="my_submenu_item_title" ref="inner">内部接线图</span>-->
      <!--</div>-->
      <!--<div class="backButton" @click="$router.push('/index')">返回</div>-->
      <div class="backButton">返回</div>
    </div>
  </div>
</template>

<script>
	export default {
		name: "leftMeau",
    props: {
      selectItem: {
        type: String,
        default: ''
      },
    },
    data() {
		  return {
		    itemName: ['super', 'one', 'two'],
      }
    },
    methods: {
		  selectMeau(name, refName) {
		    for (let i = 0; i < this.itemName.length; i++) {
          this.$refs[this.itemName[i]].className = 'my_submenu_item_title';
        }
        this.$refs[refName].className = 'my_submenu_item_title my_submenu_item_title_active';
        this.$emit("update:selectItem", name);
		    // console.log(this.$refs[refName])
      }
    }

	}
</script>

<style scoped lang="scss">
.leftMeau {
  width: 100%;
  height: 100%;
  .my_submenu {
    position: relative;
    width: 100%;
    height: 100%;
    span {
      text-align: center;
      display: block;
      color: #90a6b6;
    }
    .my_submenu_title {
      line-height: 40px;
      font-size: 16px;
      color: #0cbdb6;
      font-weight: bold;
      background: linear-gradient(to bottom,#277d84,#22666f,#1b4153);
      border: 1px solid #1d7e86;
      /*opacity: 0.6;*/
    }
    .my_submenu_item {
      margin: 0 16px;
      border-right: 2px solid #13507b;
      border-left: 2px solid #13507b;
      overflow:hidden;
    }
    .my_submenu_item_title {
      margin: 8px 16px;
      line-height: 32px;
      background-color: rgba(34, 81, 112, 0.6);
      cursor: pointer;
      border: 1px solid #246084;
    }
    .my_submenu_item_title:hover {
      background-color: #205291;
    }
    .my_submenu_item_title_active {
      color: #fff;
      background-color: rgba(31, 114,148, 0.6);
    }
    .my_submenu_item_bottom {
      border-bottom: 2px solid #164d7a;
      height: calc(100% - 42px);
    }
  }
  .backButton {
    position: absolute;
    text-align: center;
    color: #90a6b6;
    width: calc(100% - 64px);
    left: 16px;
    bottom: 0;
    margin: 12px 16px;
    line-height: 32px;
    background-color: rgba(34, 81, 112, 0.6);
    cursor: pointer;
    border: 1px solid #246084;
  }
}
</style>
