<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>


    <el-table
    ref="rolesTable"
    :data="tableData"
    stripe
    highlight-current-row
    
    style="width: 100%">

     <el-table-column type="expand">
      <template v-slot="{row}">
        <el-row type="flex" class="level1" v-for="level1 in row.children" :key="level1.id">
          <el-col :span="6">
            <el-tag closable @close="deleteRight(row,level1.id)">{{ level1.authName }}</el-tag>
            <i class="el-icon-arrow-right
"></i>
          </el-col>
          <el-col>
            <el-row type="flex" class="level2" v-for="level2 in level1.children" :key="level2.id">
              <el-col  :span="6">
                <el-tag type="success" closable  @close="deleteRight(row,level2.id)">{{ level2.authName }}</el-tag>
                  <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col >
                <el-tag type="warning" class="level3" v-for="level3 in level2.children" :key="level3.id"  closable  @close="deleteRight(row,level3.id)">{{ level3.authName }}</el-tag>

               
              </el-col> 
            </el-row>      
          </el-col>
        </el-row>
      </template>
    </el-table-column>

    <el-table-column
      type="index"
      width="80">
    </el-table-column>
    <el-table-column
      property="roleName"
      label="角色名称"
      width="180">
    </el-table-column>
    <el-table-column
      property="roleDesc"
      label="描述"
      width="180">
    </el-table-column>
    <el-table-column
      property="operate"
      label="操作">
      <template v-slot="{row}">
        <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="editUser(row.id)"></el-button>
        <el-button type="danger" plain size="mini" icon="el-icon-delete" @click="delUser(row.id)"></el-button>
        <el-button type="success" plain size="mini" icon="el-icon-check" @click="showAssignRolesDialog(row)">分配权限</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分配权限的模态框 -->
  <el-dialog title="角色授权" :visible.sync="dialogFormVisible">
   
    <el-tree
      :data="rightsList"
      show-checkbox
      node-key="id"
      :default-checked-keys="checkRights"
      :props="defaultProps"
      :default-expand-all="true"
      ref='rightTree'
      >
    </el-tree>
    
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateRole">确 定</el-button>
    </div>
  </el-dialog>



  </div>
</template>

<script>
import axios from "axios"
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  data() {
      return {
        // 角色列表数据
        tableData: [],
        currentRow: null,
        dialogFormVisible:false,
        //  tree组件的数据展示子节点以及展示的文字
        defaultProps:{
          // 子级元素的属性名
          children:"children",
          // 当前节点展示的文字的属性名
          label:"authName"
        },
        // 树形结构的数据
        rightsList:[],
        // tree组件中被选中的权限
        checkRights:[],
        currentEditRoleId:-1
      }
    },
    created(){
      this.getRolesData()
    },
    methods: {
     async getRolesData(){
       let res = await this.$http({
         url:"roles"
       })
       console.log(res);
       this.tableData = res.data.data;
     },
     async showAssignRolesDialog(row){
       this.currentEditRoleId = row.id
       this.dialogFormVisible = true;
       let res = await this.$http({
         url:"rights/tree"
       })
       console.log(res);
       this.rightsList = res.data.data;

        let level1Ids = [];
        let level2Ids = [];
        let level3Ids = [];

        row.children.forEach(level1 => {
          level1Ids.push(level1.id)
          level1.children.forEach(level2 => {
            level2Ids.push(level2.id);
            level2.children.forEach(level3 => {
              level3Ids.push(level3.id)
            })
          })
        })

        this.checkRights = [...level1Ids,...level2Ids,...level3Ids]

     },
     async updateRole(){
       let ids = [
         ...this.$refs.rightTree.getCheckedKeys(),
         ...this.$refs.rightTree.getHalfCheckedKeys()
       ].join(",");
       let res = await this.$http({
         url:`roles/${this.currentEditRoleId}/rights`,
         method:"post",
         data:{
           rids:ids
         }
       })
       this.$message({
         type:"success",
         message:res.data.meta.msg,
         duration:1000
       })
       this.getRolesData();
       this.dialogFormVisible = false
     },
     async deleteRight(row,id){
       let level1Ids = [];
        let level2Ids = [];
        let level3Ids = [];

        row.children.forEach(level1 => {
        level1Ids.push(level1.id)
        level1.children.forEach(level2 => {
          level2Ids.push(level2.id);
          level2.children.forEach(level3 => {
            level3Ids.push(level3.id)
          })
        })
      })
      let result = [...level1Ids,...level2Ids,...level3Ids];
      let ids = result.filter( v => v != id).join();
      let res = await this.$http({
        url:`roles/${row.id}/rights`,
        method:"post",
        data:{
          rids:ids
        }
      })
      this.$message({
        type:"success",
        message:res.data.meta.msg,
        duration:1000
      })
     }
    }
}
</script>

<style>
.el-breadcrumb{
  background-color: #D4DAE0;
  height: 50px;
  font-size: 20px;
  padding-left: 10px;
}
.el-breadcrumb .el-breadcrumb__item{
  line-height: 50px;
  
}
.level1{
  border-bottom: 1px dashed #ccc;
  padding: 10px 0;
}
.level1:last-child{
  border-bottom: none;
}
.level2{
  margin-bottom: 15px;
}
.level3{
  margin-right: 10px;
  margin-bottom: 10px;
  float: left;
}
</style>