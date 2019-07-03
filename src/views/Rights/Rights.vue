<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>


    <el-table
    :data="tableData"
    stripe
    style="width: 100%">
     <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径"
      width="120">
    </el-table-column>
    <el-table-column
      prop="level"
      label="层级">
      <template v-slot="{row}">
        <span>{{ row.level | filter }}</span>
      </template>
    </el-table-column>
  </el-table>
  </div>

</template>

<script>
  export default {
    filters:{
      filter(value){
        switch(value){
          case "0":
            return "一级";
          case "1":
            return "二级";
          case "2":
            return "三级";
        }
      }
    },
    data() {
      return {
        tableData: []
      }
    },
    created(){
      this.getRightsData()
    },
    methods:{
      async getRightsData(){
        let res = await this.$http({
          url:"rights/list"
        })
        console.log(res);
        this.tableData = res.data.data;
      }
    }
  }
</script>