<template>
  <div class="upateInfo">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px">
      <el-row class="searchBar">
        <el-col :span="12">
          <el-form-item label="地区：">
            <el-input v-model="form.area"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="保障级别：">
            <el-select v-model="form.assuranceLevel" placeholder="请选择">
              <el-option v-for="item in assuranceOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户名称：" prop="clientName">
            <el-input v-model="form.clientName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="访问地址：">
            <el-input v-model="form.accessAddress"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
	export default {
		name: "upateInfo",
    data() {
      return {
        form: {
          area: '',  // 地区
          assuranceLevel: '',
          clientName: '',
          accessAddress: ''
        },
        assuranceOptions: [
          {label: '特级', value: '特级'},
          {label: '一级', value: '一级'},
          {label: '二级', value: '二级'},
        ],
        rules: {
          clientName: [
            {required: true, message: '请输入客户名称', trigger: 'blur'},
          ],
        }
      }
    },
    props: {
      dialogVisible: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      selectRow: {
        type: Object,
        default: {}
      },
    },
    watch: {
      dialogVisible: function (value) {
        if (value) {
          if (this.title.includes('新增')) {
            this.reset();
          } else {
            // console.log(this.selectRow)
            this.form = {...this.selectRow};
          }
        }
      }
    },
    mounted() {
		  if (this.title.includes('修改')) {
        this.form = {...this.selectRow};
      }
    },
    methods: {
		  /* 新增数据 */
		  addInfo() {
		    const that = this;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            that.form.creatTime = that.$moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
            that.$apis.GetInfoAdd(this.form).then(res => {
              if (res.status == 200) {
                that.$message({
                  message: '新增成功！',
                  type: 'success'
                });
              } else {
                that.$message({
                  message: '新增失败！',
                  type: 'warning'
                });
              }
            })
          } else {
            return false;
          }
        });
      },
      /* 修改数据 */
      updateInfo() {
        const that = this;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            that.$apis.GetInfoUpadte(this.form).then(res => {
              // console.log(res)
              if (res.status == 200) {
                that.$message({
                  message: '修改成功！',
                  type: 'success'
                });
              } else {
                that.$message({
                  message: '修改失败！',
                  type: 'warning'
                });
              }
            })
          } else {
            return false;
          }
        });
      },
      /* 清空数据 */
      reset() {
        this.form = {
          area: '',  // 地区
          assuranceLevel: '',
          clientName: '',
          accessAddress: '',
          id: '',
          creatTime: '',
        };
      }
    }
	}
</script>

<style scoped>

</style>
