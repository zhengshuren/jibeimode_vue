<template>
  <div class="rightContent">
    <div class="title">
      <h2 class="assuranceLevel">{{ selectItem }}用户</h2>
    </div>
    <div class="item_conetent">
      <span class="item_clientName" v-for="item in clientNameArray" @click="selectClient(item)">
        {{ item.clientName }}
      </span>
    </div>
  </div>
</template>

<script>
	export default {
		name: "rightContent",
    props: {
      selectItem: {
        type: String,
        default: ''
      },
    },
    data() {
		  return {
        clientNameArray: [],
        clientInfo: []
      }
    },
    watch: {
      selectItem: function (value) {
        // console.log(value)
        if (this.clientInfo || this.clientInfo.length < 1) {
          this.getAllClientNames();
        } else {
          this.clientNameArray = this.getClientNamesByName(value)
        }
      }
    },
    mounted() {
		  this.getAllClientNames();
    },
    methods: {
      getAllClientNames() {
        const that = this;
        that.$apis.GetInfoList({}).then(res => {
          that.clientInfo = [...res.data]
          that.clientNameArray = this.getClientNamesByName(this.selectItem);
        })
      },
      getClientNamesByName(name) {
        let array = [];
        this.clientInfo.forEach(element => {
          if (element.assuranceLevel === name)  {
            array.push(element);
          }
        })
        return array;
      },
      selectClient(info) {
        window.open(info.accessAddress, '_blank');
      },
    }
	}
</script>

<style scoped lang="scss">
.rightContent {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 12px 24px;
  .assuranceLevel {
    color: #88aab1;
  }
  .item_clientName {
    display: inline-block;
    margin: 8px 12px;
    padding: 0 10px;
    margin-left: 0;
    background-color: rgba(31, 127, 169, 0.6);
    line-height: 36px;
    font-size: 12px;
    color: #81cfe9;
    border-radius: 4px;
    border: 1px solid #2682a5;
    cursor: pointer;
  }
  .item_clientName:hover {
    background-color: #1d3d6a;
  }
}
</style>
