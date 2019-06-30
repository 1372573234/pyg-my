 <template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="10">
      <el-col :span="6">
         <div style="margin-top: 15px;"  >
          <el-input placeholder="请输入内容"  class="input-with-select" v-model="keyword" @keyup.enter.native="searchUser" >
            <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <el-tag type="success" style="margin-top: 15px;" @click="dialogFormVisible = true">添加用户</el-tag>
      </el-col>
    </el-row>

   

    <el-table
    :data="dataList"
    stripe
    style="width: 100%">
    <el-table-column
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="180">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话">
    </el-table-column>
    <el-table-column
      prop="status"
      label="用户状态">
      <template v-slot="{row}">   
      <!-- <template v-slot="scope">    -->
        <!-- {{ scope.row}} -->
        <el-switch 
          v-model="row.mg_state"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="changeStatus(row)">
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column
      prop="operate"
      label="操作">
      <template v-slot="{row}">
        <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
        <el-button type="danger" plain size="mini" icon="el-icon-delete" @click="delUser(row.id)"></el-button>
        <el-button type="success" plain size="mini" icon="el-icon-check">分配角色</el-button>
      </template>
     
    </el-table-column>

    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pagesize"
      :current-page="currentpage"
      @current-change="changePage"
    >
    </el-pagination>

    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" ref="addForm" :rules="addRules" label-width="80px">
        <el-form-item label="用户名"  prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"  prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"  prop="email">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号"  prop="mobile">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser('addForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改用户" :visible.sync="dialogFormVisible">
    <el-form :model="editForm" ref="editForm" :rules="addRules" label-width="80px">
      <el-form-item label="用户名"  prop="username">
        <el-input v-model="editForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码"  prop="password">
        <el-input v-model="editForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"  prop="email">
        <el-input v-model="editForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号"  prop="mobile">
        <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
      </el-form-item>
    
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="addUser('addForm')">确 定</el-button>
    </div>
  </el-dialog>


 </div>  
</template>

<script>
  import axios from "axios"
  import Vue from 'vue';
  export default {
    data() {
      return {
        dataList:[],
        total: 0,
        pagesize: 3,
        currentpage: 1,
        keyword:"",
        dialogFormVisible: false,
        addForm: {
          username: '',
          password: '',
          email: '',
          mobile: '',
         
        },
       formLabelWidth: '120px',
        addRules:{
          username:[
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
          ],
            password:[
            { required: true, message: '请输入用户密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ]
        }
      
      }
    },
    created(){
      this.getDataList();
    },
    methods:{
      getDataList(){
        axios({
          url:"http://localhost:8888/api/private/v1/users",
          params:{
            query:this.keyword,
            pagenum:this.currentpage,
            pagesize:this.pagesize
          },
          headers:{
            Authorization:localStorage.getItem("token")
          }

        }).then(res => {
          let {data:{data,meta}} = res;
          this.dataList = data.users;
          this.total = data.total;
        
        // console.log(res.data);
        })
      },
      async changeStatus(user){
        let res = await axios({
          url:`http://localhost:8888/api/private/v1/users/${user.id}/state/${user.mg_state}`,
          method:"put",
          headers:{
            Authorization:localStorage.getItem("token")
          }
        })
        if(res.data.meta.status == 200){
          this.$message({
            type:"success",
            message: '修改状态成功',
            duration:1000
          })
        }
        
      },
      changePage(currentpage){
        this.currentpage = currentpage;
        this.getDataList()
      },
      delUser(id){
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            axios({
          url:`http://localhost:8888/api/private/v1/users/${id}`,
          method:"delete",
          headers:{
            Authorization:localStorage.getItem("token")
          }
          }).then(res => {
            if(res.data.meta.status == 200){
              this.$message({
                type:"success",
                message: '删除用户成功',
                duration:1000
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        
      }); // catch结束
      },
      searchUser(){
        this.getDataList()
      },
      addUser(){
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            axios({
              url:"http://localhost:8888/api/private/v1/users",
              method:"post",
              data:this.addForm,
              headers:{
                Authorization:localStorage.getItem("token")
              }
            }).then(res => {
              if(res.data.meta.status == 201){
                this.$message({
                  type:"success",
                  message:"用户添加成功",
                  duration:1000
                })
                this.dialogFormVisible = false;
                this.getDataList()
              }
            })
        
          } else {
            console.log('error submit!!');
            return false;
          }
        });
       
      }
    }
  }


</script>

<style lang="less">
.el-breadcrumb{
  background-color: #D4DAE0;
  height: 50px;
  font-size: 20px;
  padding-left: 10px;
}
.el-breadcrumb .el-breadcrumb__item{
  line-height: 50px;
  
}
</style>
