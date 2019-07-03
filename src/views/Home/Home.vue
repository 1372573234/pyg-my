<template>
  <el-container>
    <el-header>
      <el-row type="flex" class="row-bg" justify="center" align="middle">
        <el-col :span="6">
          <img src="../../assets/logo.png"/>
        </el-col>
        <el-col>
          <h1>品优购后台管理系统</h1>
        </el-col>
        <el-col :span="6">
          <p>欢迎39期星耀<a @click="logout" style="cursor: pointer;">退出</a></p>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <el-aside width="200px">
        
         <!-- @open="handleOpen"
            @close="handleClose" -->

        <el-row class="tac">
         <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            :unique-opened="true"
            :router="true"
            active-text-color="#ffd04b">
            <el-submenu v-for="item1 in menuData" :key="item1.id" :index="item1.id+''" >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item1.authName}}</span>
              </template> 
              <el-menu-item v-for="item2 in item1.children" :index="'/'+item2.path" :key="item2.id">
                <i class="el-icon-menu"></i>
                <span slot="title">{{item2.authName}}</span>
              </el-menu-item>
            </el-submenu>

               <!-- <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>权限管理</span>
                </template> 
                <el-menu-item index="/roles">
                  <i class="el-icon-menu"></i>
                  <span slot="title">角色列表</span>
                </el-menu-item>
                <el-menu-item index="/rights">
                <i class="el-icon-menu"></i>
                <span slot="title">权限列表</span>
              </el-menu-item>
              </el-submenu>
               <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>商品管理</span>
                </template> 
                <el-menu-item index="6">
                  <i class="el-icon-menu"></i>
                  <span slot="title">商品列表</span>
                </el-menu-item>
                <el-menu-item index="4">
                <i class="el-icon-menu"></i>
                <span slot="title">分类参数</span>
              </el-menu-item>
                <el-menu-item index="4">
                <i class="el-icon-menu"></i>
                <span slot="title">商品分类</span>
              </el-menu-item>
              </el-submenu>
              <el-submenu index="7">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template> 
              <el-menu-item index="8">
                <i class="el-icon-menu"></i>
                <span slot="title">订单列表</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="9">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template> 
            <el-menu-item index="10">
              <i class="el-icon-menu"></i>
              <span slot="title">数据报表</span>
            </el-menu-item>
          </el-submenu> -->

            </el-menu>
        
        </el-row>

      </el-aside>


      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </el-container>

</template>


<script>

  export default {
    data(){
      return {
        menuData:[]
      }
    },
    methods:{
      logout(){
        localStorage.removeItem("token")
        this.$router.push("/login"); 
      },
      async getMenu(){
        let res = await this.$http({
          url:"menus"
        })
        console.log(res);
        this.menuData = res.data.data;
        console.log(this.menuData);
      }
    },
    created(){
      this.getMenu()
    }
  }
</script>

<style lang="less">
header.el-header{
  padding: 0;
}
.row-bg{
  background-color: #b3c1cd;
}
.el-col{
  text-align: center;
  font-weight: bolder;
  h1{
    color: #fff;
    font-size: 28px;
  }
  a{
    color: #f60;
  
  }
}
.el-container.el-container{
  height: 100%;
  .el-aside{
     div.tac.el-row{
       height: 100% !important;
        .el-menu{
          height: 100%;
        }
     }
       
        
      
  }
  
}

</style>
