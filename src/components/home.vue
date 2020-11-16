<template>
  <div class="home">
    <lay_head></lay_head>
    <div class="content">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" v-wechat-title="$route.meta.title" img-set="/static/logo.png"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" v-wechat-title="$route.meta.title" img-set="/static/logo.png"/>
    </div>
   </div>
</template>

<script>
import lay_head from "@/components/layout/lay_head";
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    // this.$eventHub.$on("sub",(val)=>{
    //   console.log(val)
    // })
  },
  components:{
    lay_head
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {
  background-color: #20344e;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
  }
}
</style>


