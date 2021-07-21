<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="basic" type="border-card">
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="英雄名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option 
                v-for="item of categories" 
                :key="item._id"
                :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物理攻击">
            <el-rate style="margin-top:0.6rem" :max="10" show-score v-model="model.scores.physicalDamage"></el-rate>
          </el-form-item>
          <el-form-item label="魔法攻击">
            <el-rate style="margin-top:0.6rem" :max="10" show-score v-model="model.scores.magicDamage"></el-rate>
          </el-form-item>
          <el-form-item label="防御能力">
            <el-rate style="margin-top:0.6rem" :max="10" show-score v-model="model.scores.defensiveCapability"></el-rate>
          </el-form-item>
          <el-form-item label="上手难度">
            <el-rate style="margin-top:0.6rem" :max="10" show-score v-model="model.scores.difficult"></el-rate>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
                :headers="getAuthHeaders()"
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="res => model.avatar = res.url">
                <img v-if="model.avatar" :src="model.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="皮肤">
            <el-upload
              class="uploadimgs"
              :headers="getAuthHeaders()"
              :multiple="true"
              :action="uploadUrl"
              :file-list="filelist"
              :show-file-list="false"
              :on-success="afterUpload">
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="imgs-wrap">
                <el-card 
                class="showSkins"
                v-for="(item, index) in model.skins" :key="index"
                >
                  <img class="p-2" :src="item" alt="" style="height:120px">
                  <el-form-item>
                  <el-button type="danger" class="button" size="small" @click="model.skins.splice(index,1)">删除皮肤</el-button>
                  </el-form-item>
                </el-card>
              </div>
          </el-form-item>
          <el-form-item label="背景故事">
            <el-input type="textarea" v-model="model.background"></el-input>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.allyTip"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.enemyTip"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button size="small" @click="model.skills.push({})"><i class="el-icon-plus"></i> 添加技能</el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col class="cardCol" :span="12" v-for="(item,i) in model.skills" :key="i">
              <el-card class="cards" shadow="hover">
                <el-form-item label="名称">
                  <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="图标">
                  <el-upload
                    class="avatar-uploader"
                    :headers="getAuthHeaders()"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :on-success="res => $set(item,'icon',res.url)">
                    <img v-if="item.icon" :src="item.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="键位类型">
                  <el-input v-model="item.position"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input v-model="item.description" type="textarea"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" class="button" size="small" @click="model.skills.splice(i,1)">删除技能</el-button>
                </el-form-item>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top:1rem">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name:"HeroEdit",
    props: {
      id: {}
    },
    data() {
      return {
        filelist:[],
        categories:[],
        model:{
          name:'',
          avatar:'',
          title:'',
          scores:{
            physicalDamage:0,
            magicDamage:0,
            defensiveCapability:0,
            difficult:0
          },
          background:'',
          skills:[{
            icon:'',
            name:'',
            description:'',
            position:''
          }],
          allyTip:'',
          enemyTip:'',
          skins:[]
        },
      }
    },
    methods: {
      testLoader(res){
        this.model.banner = res.url
      },
      afterUpload(res){
        this.filelist.push({name:res.originalname,url:res.url});
        console.log(this.filelist)
        this.model.skins.push(this.filelist[this.filelist.length-1].url)
        //this.model.skins.push({name:res.originalname,url:res.url})
        console.log(this.model.skins)
      },
      // async handleRemove(file, fileList){
      //   const IMG = file._id
      //   const INDEX = this.model.skins.indexOf(IMG)
      //   await this.$http.delete(``)
      // },
      async save(){
        //请求接口，提交数据
        let res
        if(this.id) {
          res = await this.$http.put(`rest/heroes/${this.id}`,this.model)
        }else {
          res = await this.$http.post('rest/heroes',this.model)
        }
        console.log(res)
        this.$router.push('/heroes/list')
        this.$message({
          type:'sucess',
          message:'保存成功'
        })
      },
      async fetch() {
        const res  = await this.$http.get(`rest/heroes/${this.id}`)
        this.model = Object.assign({},this.model,res.data)
      },
      async fetchCategories() {
        const res  = await this.$http.get(`rest/categories`)
        this.categories = res.data
      }
    },
    created() {
      this.fetchCategories()
      this.id && this.fetch()
    },
  }
</script>

<style>
  
  .cards{
    margin-bottom: 1rem;
  }
  .uploadimgs {
    display:block;
  }
  .uploadimgs .el-upload {
    display:block;
  }
  .img-wrap{
    display: inline-block;
    
  }
  .picturebtn{
    position: relative;
    top: -10px;
    left:-30px;
  }
  .showSkins {
    display: inline-block;
    margin: 0px 20px;

  }


</style>