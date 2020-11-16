<template>
  <div class="info">
    <el-row class="searchBar">
      <el-col :span="5">
        <span>地区：</span>
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="search.area"
                  style="width: calc(100% - 120px) !important;"/>
      </el-col>
      <el-col :span="5">
        <span>保障级别：</span>
        <el-select v-model="search.assuranceLevel" placeholder="请选择" style="width: calc(100% - 120px) !important;">
          <el-option v-for="item in assuranceOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <span>客户名称：</span>
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="search.clientName"
                  style="width: calc(100% - 120px) !important;"/>
      </el-col>
      <el-col :span="9">
        <div class="info_button">
          <el-button type="primary" icon="el-icon-search" @click="searchInfo">查询</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addInfo">增加</el-button>
          <el-button type="primary" icon="el-icon-edit" @click="updateInfo">修改</el-button>
          <el-button type="primary" icon="el-icon-delete" @click="delectInfo">删除</el-button>
        </div>
      </el-col>
    </el-row>

    <div class="table_content">
      <el-table :data="tableData.slice((pagination.currentPage-1)*pagination.pageSize,pagination.currentPage*pagination.pageSize)"
                ref="multipleTable"  border style="width: 100%" :height="tableHeight" @selection-change="handleSelectionChange"
                row-key="id" @row-click="rowClick">
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column type="index" width="70" label="序号" align="center":index="indexMethod" />
        <el-table-column prop="area" label="地区" align="center" width="160"/>
        <el-table-column prop="creatTime" label="创建时间" width="190" align="center" sortable />
        <el-table-column prop="assuranceLevel" label="保障级别" align="center" width="100" />
        <el-table-column prop="clientName" label="客户名称" align="center" width="340" />
        <el-table-column prop="accessAddress" label="访问地址" align="center" />
      </el-table>
    </div>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="pagination.currentPage" :page-sizes="[15, 30, 50, 100]"
                     :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="pagination.total">
      </el-pagination>
    </div>

    <el-dialog :title="title" :visible.sync="dialogVisible" width="760px" :before-close="handleClose">
      <upate-info ref="upateInfo" :dialogVisible="dialogVisible" :selectRow="selectRow" :title="title" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="submit">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import upateInfo from '@/components/main/info/components/upateInfo'

  export default {
    name: 'info',
    data () {
      return {
        tableData: [],   // 表格数据
        tableHeight: null,  // 表格高度
        multipleSelection: [],  // 选中数组
        search: {    // 搜素条件
          area: '',  // 地区
          assuranceLevel: '',  // 保障级别
          clientName: '',  // 客户名称
        },
        pagination: {  // 分页
          currentPage: 1,
          pageSize: 15,
          total: 0
        },
        assuranceOptions: [
          {label: '全部', value: ''},
          {label: '特级', value: '特级'},
          {label: '一级', value: '一级'},
          {label: '二级', value: '二级'},
        ],
        title: '新增',
        dialogVisible: false,
        selectRow: {},
      }
    },
    components: {
      'upate-info': upateInfo,
    },
    mounted(){
      this.initTable();
      this.tableHeight = document.documentElement.clientHeight - 186;
    },
    methods:{
      initTable() {
        this.$apis.GetInfoList({}).then(res => {
          // console.log(res)
          this.tableData = [...res.data];
          this.pagination.total = this.tableData.length;
        })
        this.$apis.mokeLogin({}).then(res => {
          console.log(res)
        })
      },
      handleSelectionChange(val) {
        // console.log(val)
        this.multipleSelection = val;
      },
      /* 查询 */
      searchInfo() {
        const that = this;
        that.$apis.GetInfoByCondition(this.search).then(res => {
          // console.log(res)
          this.tableData = [...res.data];
          this.pagination.total = this.tableData.length;
        })
      },
      /* 删除数据 */
      delectInfo() {
        const that = this;
        // 未选中数据时
        if (!this.multipleSelection || this.multipleSelection.length < 1 ) {
          this.$message({
            message: '请至少选择一条数据！',
            type: 'warning'
          });
          return;
        }
        that.$confirm('确认删除？')
          .then(_ => {
            // 选中数据
            let ids = [];
            that.multipleSelection.forEach(element => {
              ids.push(element.id);
            })
            that.$apis.GetInfoDelect({
              id: ids.join(',')
            }).then(res => {
              if (res.status == 200) {
                that.$message({
                  message: '删除成功！',
                  type: 'success'
                });
              } else {
                that.$message({
                  message: '删除失败！',
                  type: 'warning'
                });
              }
              // 清空选中
              that.multipleSelection = [];
              that.initTable();
            })
          })
          .catch(_ => {});
      },
      /* 添加数据 */
      addInfo() {
        this.title = '新增';
        this.dialogVisible = true;
      },
      /* 修改数据 */
      updateInfo() {
        // 未选中数据一条时
        if (!this.multipleSelection || this.multipleSelection.length !== 1 ) {
          this.$message({
            message: '请选择一条数据！',
            type: 'warning'
          });
          return;
        }
        this.selectRow = this.multipleSelection[0];
        this.title = '修改';
        this.dialogVisible = true;
      },
      /* 提交修改 */
      submit() {
        if (this.title.includes('新增')) {
          this.$refs['upateInfo'].addInfo();
        } else {
          this.$refs['upateInfo'].updateInfo();
          // 清空选中
          this.$refs['multipleTable'].clearSelection();
          this.multipleSelection = [];
        }
        this.reset();
        this.initTable();
        this.dialogVisible = false;
      },
      reset() {
        this.search = {    // 搜素条件
          area: '',  // 地区
          assuranceLevel: '',  // 保障级别
          clientName: '',  // 客户名称
        }
      },
      // 关闭弹窗
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      indexMethod(index) {
        return (this.pagination.currentPage - 1) * this.pagination.pageSize + index + 1;
      },
      rowClick(row) {
        this.$refs['multipleTable'].toggleRowSelection(row);
      },
      // 改变页数
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pagination.pageSize = val;
      },
      // 翻页
      handleCurrentChange(val) {
        this.pagination.currentPage = val;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .info {
    width: 100%;
    height: 100%;
    padding: 12px;
    .info_button {
      text-align: right;
    }
    .searchBar {
      padding: 12px 0;
      span {
        color: #FFFFFF;
      }
    }
    .block {
      text-align: center;
      color: #FFFFFF;
      padding-top: 10px;
    }
    /deep/ .el-dialog__footer {
      text-align: center;
    }
  }
</style>
