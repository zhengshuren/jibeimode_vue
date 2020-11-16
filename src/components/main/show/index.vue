<template>
  <div class="show">
    <div class="show_left">
      <component is="left-meau" :selectItem.sync="selectItem"/>
    </div>
    <div class="show_right">
      <component is="right-content" :selectItem="selectItem"/>
    </div>
  </div>
</template>

<script>
  import leftMeau from '@/components/main/show/components/leftMeau'
  import rightContent from '@/components/main/show/components/rightContent'

	export default {
		name: "show",
    components: {
		  'left-meau': leftMeau,
      'right-content': rightContent
    },
    data() {
		  return {
		    selectItem: '特级'
      }
    },

    methods: {


    }
	}
</script>

<style scoped lang="scss">
.show {
  width: 100%;
  height: 100%;
  display: flex;
  .show_left {
    padding: 12px;
    height: 100%;
    width: 300px;
  }
  .show_right {
    flex: 1;
    border: 2px solid #13507b;
    margin: 12px;
  }

}
</style>
