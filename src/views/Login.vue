<template>
<el-row type="flex" class="row-bg" justify="center" align="middle" >
  <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
    <el-form ref="form" :model="form" class="el-form" label-width="80px" label-position="top" >
      <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-col>
  
</el-row>




</template>

<script>
 export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style>
.row-bg{
  height: 100%;
  background-color: #2D434C;
}
.el-form{
  background-color: #fff;
  min-width: 400px;
  border-radius: 10px;
  border: 1px solid #000;
  padding: 20px 20px;
}
</style>