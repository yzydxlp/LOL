<template>
  <div class="about">
    <h1>活动列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="name" label="活动名称"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button 
            type="primary" 
            size="small"
            @click="$router.push(`/promos/edit/${scope.row._id}`)">编辑</el-button>
          <el-button 
            type="primary" 
            size="small"
            @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name:'PromoList',
  data() {
    return {
      items:[]
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('rest/promos')
      this.items = res.data
    },
    async remove(row) {
      this.$confirm(`是否确定删除"${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          //const res = await this.$http.delete(`categories/${row._id}`)
          await this.$http.delete(`rest/promos/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch()
        })
    }
  },
  created() {
    this.fetch()
  },
}
</script>