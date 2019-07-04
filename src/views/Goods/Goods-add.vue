<template>
  <div>
     <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 步骤条 -->
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1" description="基本信息"></el-step>
      <el-step title="步骤 2" description="商品图片"></el-step>
      <el-step title="步骤 3" description="商品内容"></el-step>
    </el-steps>
    <!-- 标签页 -->
    <el-tabs :tab-position="tabPosition" v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="基本信息" name="1">

        <el-form ref="proInfo" :model="proInfo" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="proInfo.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="proInfo.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="proInfo.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="proInfo.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              v-model="proInfo.goods_cat"
              :options="addCategoryOptions"
              :props="defaultProps"
              ></el-cascader>
          </el-form-item>
          <el-form-item label="是否促销">
            <template v-slot="{row}" >
              <el-radio v-model="proInfo.is_promote" label="1">是</el-radio>
              <el-radio v-model="proInfo.is_promote" label="2">否</el-radio>
            </template>
          </el-form-item>
        </el-form>
        <el-button type="primary"  @click="next">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="商品图片" name="2">
       <el-upload
        class="upload-demo"
        action="http://localhost:8888/api/private/v1/upload"
        :headers="headers"
        list-type="picture-card"
        :on-success="uploadFile">
        <el-button size="small" type="primary" >点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        
      </el-upload>
      <el-button type="primary"  @click="next">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="3" >
        <!-- Or manually control the data synchronization（或手动控制数据流） -->
        <quill-editor v-model="proInfo.content" >
        </quill-editor>
        <div></div>
       <el-button type="primary" @click="submitAddPro">确认</el-button>
      </el-tab-pane>
     
    </el-tabs>

  </div>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor'

  export default {
    components:{
      quillEditor
    },
    data() {
      return {
        active: 0,
        tabPosition: 'left',
        activeName:'1',
        proInfo:{
          goods_name:"",
          goods_price:"",
          goods_number:"",
          goods_weight:"",
          goods_cat:[],
          is_promote:"",
          pics:[],
          content:""
        },
        addCategoryOptions:[],
        defaultProps:{
          value:"cat_id",
          label:"cat_name",
          // 可以只选一级
          checkStrictly:true
        },
         dialogImageUrl: '',
        dialogVisible: false,
        content: '',
        editorOption: {
          // some quill options
        },
        headers:{
           Authorization:localStorage.getItem("token")
        },
        


      };
    },
    created(){
      this.getAddProduction()
    },
    methods: {
      next(tag) {
        if (this.active++ > 2) this.active = 0;
        
        if(this.activeName++ > 2) this.activeName = 1;
        this.activeName = this.activeName+'';
      },
      async getAddProduction(){
         let res = await this.$http({
          url:"categories",
          params:{
            type:3
          }
        });
        console.log(res);
        this.addCategoryOptions = res.data.data;
      },
      tabClick(tag){
        this.active = +tag.index
      },
      async uploadFile(res,file){
        this.proInfo.pics.push ({
          pic:res.data.tmp_path
        })
        // console.log(res,file);
      },  
      async submitAddPro(){
        let goods_cat = this.proInfo.goods_cat.join();
        
        let res = await this.$http({
          url:"goods",
          method:"post",
          data:{
            goods_name:this.proInfo.goods_name,
            goods_weight:this.proInfo.goods_weight,
            goods_cat:goods_cat,
            goods_price:this.proInfo.goods_price,
            goods_number:this.proInfo.goods_number,
            goods_introduce:this.proInfo.content,
            is_promote:this.proInfo.is_promote,
            pics:this.proInfo.pics
          }
        })
        console.log(res);
      }
    }
  }
</script>


<style>
  .el-form{
    padding-top: 0px;
  }

 
</style>