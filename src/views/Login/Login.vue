<template>
<el-row type="flex" class="row-bg" justify="center" align="middle" >
  <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
    <el-form ref="ruleForm" :model="form" :rules="rules" class="el-form" label-width="80px"   >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" show-password v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-col>
  
</el-row>




</template>

<script>
import axios from "axios"
 export default {
    data() {
      return {
        form: {
          username:"",
          password:""
        },
        rules:{
          username:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios({
              url:"http://localhost:8888/api/private/v1/login",
              method:"post",
              data:this.form
            }).then(({data:{data,meta}}) => {
              // console.log(meta,data);
              if( meta.status === 200){
                console.log(data);
                localStorage.setItem("token",data.token)
                this.$router.push('/home')
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
  border-radius: 10px;
  padding:  50px 30px 10px 0px;
  min-width: 400px;
}
</style>