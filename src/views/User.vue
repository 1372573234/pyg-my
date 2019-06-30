 <template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

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
      <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
      <el-button type="danger" plain size="mini" icon="el-icon-delete"></el-button>
      <el-button type="success" plain size="mini" icon="el-icon-check">分配角色</el-button>
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
        
        console.log(res.data);
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
      }
    }
  }


</script>