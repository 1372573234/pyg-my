<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button type="success" plain >添加商品</el-button>

    <el-table
    ref="singleTable"
    :data="goodsData"
    highlight-current-row
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      property="goods_name"
      label="商品名称"
      width="120">
    </el-table-column>
    <el-table-column
      property="goods_price"
      label="商品价格"
     >
    </el-table-column>
    <el-table-column
      property="goods_weight"
      label="商品重量">
    </el-table-column>
    <el-table-column
      property="add_time"
      label="创建时间"
     >
    </el-table-column>
    <el-table-column
      property="name"
      label="操作"
      width="120">
    </el-table-column>
  </el-table>
  
  <el-pagination
    background
    layout="prev, pager, next"
    :total="total">
  </el-pagination>

  </div>
</template>

<script>
 export default {
    data() {
      return {
        goodsData: [],
        pagenum:1,
        pagesize:5,
        currentRow: null,
        total:0
      }
    },
    created(){
      this.getGoodsData()
    },
    methods: {
      async getGoodsData(){
        let res = await this.$http({
          url:"goods",
          params:{
            pagenum:this.pagenum,
            pagesize:this.pagesize
          }
        })
        console.log(res);
        this.goodsData = res.data.data.goods
        this.total = res.data.data.total
      },
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      }
    }
 }
</script>
<style >
 .breadcrumb{
   margin-bottom:10px;
 }
</style>