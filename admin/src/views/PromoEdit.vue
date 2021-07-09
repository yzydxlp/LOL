<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}活动</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="活动">
        <el-button size="small" @click="model.items.push({})"><i class="el-icon-plus"></i> 添加活动</el-button>
        <el-row type="flex" style="flex-wrap:wrap">
          <el-col class="cardCol" :span="24" v-for="(item,i) in model.items" :key="i">
            <el-card class="cards" shadow="hover">
              <el-form-item label="活动名称">
                <el-input v-model="item.title"></el-input>
              </el-form-item>
              <el-form-item label="跳转链接(URL)">
                <el-input v-model="item.url"></el-input>
              </el-form-item>
              <el-form-item label="图片" style="margin-top:1rem">
                <el-upload
                  :headers="getAuthHeaders()"
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :on-success="res => $set(item,'image',res.url)">
                  <img v-if="item.image" :src="item.image" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" class="button" size="small" @click="model.items.splice(i,1)">删除活动</el-button>
              </el-form-item>
            </el-card>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name:"PromoEdit",
    props: {
      id: {}
    },
    data() {
      return {
        model:{
          items:[{
            url:'',
            image:'',
            title:''
          }]
        },
      }
    },
    methods: {
     async save(){
        //请求接口，提交数据
        let res
        if(this.id) {
          res = await this.$http.put(`rest/promos/${this.id}`,this.model)
        }else {
          res = await this.$http.post('rest/promos',this.model)
        }
        
        console.log(res)
        this.$router.push('/promos/list')
        this.$message({
          type:'sucess',
          message:'保存成功'
        })
      },
      async fetch() {
        const res  = await this.$http.get(`rest/promos/${this.id}`)
        this.model = Object.assign({},this.model,res.data)
      }
    },
    created() {
      this.id && this.fetch()
    },
  }
</script>

<style>

</style>