<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="afterUpload">
            <img v-if="model.icon" :src="model.icon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="类型">
         <el-select v-model="model.categories" multiple>
              <el-option 
                v-for="item of categories" 
                :key="item._id"
                :label="item.name" :value="item._id"></el-option>
            </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name:"ItemEdit",
    props: {
      id: {}
    },
    data() {
      return {
        model:{},
        categories:[]
      }
    },
    methods: {
      afterUpload(res){
        this.$set(this.model,'icon',res.url)
      },
      async save(){
        //请求接口，提交数据
        if(this.id) {
          await this.$http.put(`rest/items/${this.id}`,this.model)
        }else {
          await this.$http.post('rest/items',this.model)
        }
        // console.log(res)
        this.$router.push('/items/list')
        this.$message({
          type:'sucess',
          message:'保存成功'
        })
      },
      async fetch() {
        const res  = await this.$http.get(`rest/items/${this.id}`)
        this.model = res.data
      },
      async fetchCategories() {
        const res  = await this.$http.get(`rest/categories`)
        this.categories = res.data.filter(item=>{
          return item.parent&&item.parent.name=="物品"
        })
      }

    },
    created() {
      this.id && this.fetch()
      this.fetchCategories()
    },
  }
</script>

<style>
</style>