<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button type="success" plain @click="addCategory">添加分类</el-button>

    <el-table
      :data="categoryData"
      stripe
      style="width: 100%">
      <el-table-tree-column 
      file-icon="icon el-icon-document-copy" 
      folder-icon="icon el-icon-folder" 
      prop="cat_name" label="分类名称" treeKey="cat_id" level-key="cat_level" :indentSize="30"  parentKey="cat_pid" width="220">
      </el-table-tree-column>
      
    
      <el-table-column
        prop="cat_deleted"
        label="是否有效"
        width="180">
        <template v-slot="{row}">
          <span>{{ row.cat_deleted ? "否":"是" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cat_level"
        label="层级">
      </el-table-column>
       <el-table-column
      property="operate"
      label="操作"
      >
       <template v-slot="{row}">
        <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
    background
    layout="prev, pager, next"
    :total="total"
    :current-page="currentpage"
    :page-size="pagesize"
    @current-change="currentChange">
  </el-pagination>

  <el-dialog title="收货地址" :visible.sync="addCategoryDialog">
    <el-form :model="addCategoryForm">
      <el-form-item label="分类名称" label-width="100px" >
        <el-input v-model="addCategoryForm.cat_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="父级名称" label-width="100px" >
        <el-cascader
          v-model="addCategoryForm.parentArr"
          :options="addCategoryOptions"
          :props="defaultProps"
          ></el-cascader>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addCategoryDialog = false">取 消</el-button>
      <el-button type="primary" @click="addCateSubmit">确 定</el-button>
    </div>
  </el-dialog>

  </div>
</template>

<script>
  const ElTreeGrid = require("element-tree-grid");

  export default {
    components:{
       [ElTreeGrid.name]:ElTreeGrid
    },
    data() {
      return {
        categoryData: [],
        type:1,
        total:0,
        currentpage:1,
        pagesize:5,
        pagenum:1,
        addCategoryDialog:false,
        addCategoryForm:{
          cat_name:"",
          parentArr:[],
          // cat_pid:""
        },
        addCategoryOptions:[],
        defaultProps:{
          value:"cat_id",
          label:"cat_name",
          // 可以只选一级
          checkStrictly:true
        }

      }
      
    },
    created(){
      this.getCategoryData()
    },
    methods:{
      async getCategoryData(){
        let res = await this.$http({
          url:"categories",

          params:{
            type:3,
            pagenum:this.currentpage,
            pagesize:this.pagesize
          }
        });
        // console.log(res);
        this.categoryData = res.data.data.result
        this.total = res.data.data.total
      },
      currentChange(currentpage){
        this.currentpage = currentpage;
        this.getCategoryData()
      },
      async addCategory(){
        
         let res = await this.$http({
          url:"categories",
          params:{
            type:2
          }
        });
        console.log(res);
        this.addCategoryOptions = res.data.data;
        this.addCategoryDialog = true;
        
      },
      async addCateSubmit(){
        let cat_name = this.addCategoryForm.cat_name;
        let cat_level = this.addCategoryForm.parentArr.length;
        let cat_pid = this.addCategoryForm.parentArr.pop();
        let res = await this.$http({
          url:"categories",
          method:"post",
          data:{
            cat_pid,
            cat_name,
            cat_level
          }
        })
        console.log(res);
      }
    }
  }
</script>