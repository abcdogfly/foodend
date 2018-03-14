<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>特殊内容</el-breadcrumb-item>
            <el-breadcrumb-item>每日秒杀</el-breadcrumb-item>
        </el-breadcrumb>
        <el-tabs v-model="activeName" >
            <div class="table">
                <el-form class="handle-box mr10"   :inline="true">
                    <el-form-item label="商品名">
                        <el-input v-model="select_word"></el-input>
                    </el-form-item>
                    <el-button type="warning" class="handle-del mr10">查询</el-button>
                    <el-button type="primary" class="handle-del mr10" @click="dialogFormVisible = true">添加</el-button>
                </el-form>
                <el-table :data="filterdata" border style="width: 100%" ref="multipleTable" size="mini">
                    <el-table-column prop="achievement_Id" label="序号" width="50"></el-table-column>
                    <el-table-column prop="achievement_Year" label="商品id" ></el-table-column>
                    <el-table-column prop="achievement_Month" label="商品名"></el-table-column>
                    <el-table-column prop="achievement_Admin" label="商品数量" ></el-table-column>
                    <el-table-column prop="achievement_Amount" label="商品价格"></el-table-column>
                    <el-table-column prop="achievement_Amount" label="到货时间"></el-table-column>
                    <el-table-column label="商品图片" width="90">
                        <template slot-scope="scope">
                            <el-button type="warning" size="mini" @click="handleEdit(scope.$index)">
                                查看
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品上架状态" width="200">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handleEdit(scope.$index)">
                                {{isjia}}
                            </el-button>
                            <el-button type="danger" size="mini" @click="handleEdit(scope.$index)">
                                下架
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80">
                        <template slot-scope="scope">
                            <el-button type="warning" size="mini" @click="handleEdit(scope.$index)">
                                修改
                            </el-button>
                            <el-button type="danger" size="mini" @click="handleEdit(scope.$index)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[10, 20, 30, 50]"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="allCount">
                    </el-pagination>
                </div>
                <!--修改表格中的数据-->
                <el-dialog title="修改信息" :visible.sync="dialogFormVisible2" center width="35%">
                    <el-form :model="editform" size="mini" label-width="80px"  :rules="rules" ref="editform">
                        <el-form-item  label="金额 / 万" prop="achievement_Amount">
                            <el-input type="number" v-model="updataAmount"></el-input>
                        </el-form-item>
                        <el-form-item size="small">
                            <el-button type="primary" @click="modifyForm('editform')">修改</el-button>
                            <el-button @click="dialogFormVisible2 = false">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
                <!--添加显示表格-->
                <el-dialog  title="添加"  :visible.sync="dialogFormVisible" center width="35%" >
                    <el-form class="demo-ruleForm" :model="form" ref="form" :rules="rules"  label-position="left" size="mini">
                        <el-form-item label="商品名" :label-width="formLabelWidth" prop="money">
                            <el-input v-model="form.money" type="number" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量" :label-width="formLabelWidth" prop="money">
                            <el-input v-model="form.money" type="number" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格" :label-width="formLabelWidth" prop="money">
                            <el-input v-model="form.money" type="number" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="到货时间"  :label-width="formLabelWidth" prop="day">
                            <el-date-picker
                                v-model="form.day"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="是否上架" :label-width="formLabelWidth" prop="money">
                            <el-input v-model="form.money" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="上传图片" :label-width="formLabelWidth" prop="money">
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </el-tabs>
    </div>
</template>

<script>
    import { Message } from 'element-ui'
    import { postAjax , getAjax } from 'src/public/js/config'
    export default {
        data() {
            return {
                activeName: 'first',
                tableData:[],
                select_word: '',
                page:1,
                size:10,
                allCount:0,
                isjia:'',
                dialogFormVisible: false,
                dialogFormVisible2: false,
                form: {
                    day:"",
                    person:"",
                    money:""
                },
                editform:{
                    list:{

                    }
                },
                updataAmount:'',
                formLabelWidth: '110px',
                rules: {
                    day: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    money: [
                        { required: true, message: '请填写目标金额', trigger: 'blur' }
                    ],
                },
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        created(){
            this.getData();
        },
        computed: {
            filterdata(){
                const that = this;
                return that.tableData.filter(function(d){
                    d.achievement_Year = new Date(d.achievement_Time).Format("yyyy");
                    d.achievement_Month = new Date(d.achievement_Time).Format("MM");
                    return d;
                })
            }
        },
        methods: {
            /*每页显示的条数*/
            handleSizeChange(val) {
                this.size = val;
                this.getData();
            },
            /*切换页码*/
            handleCurrentChange(val) {
                this.page = val;
                this.getData();
            },
            //展示列表
            getData(){
                let that = this;
                getAjax('/api/achi/show',{
                    params:{
                        page:that.page,
                        size:that.size
                    }
                }).then(function (res) {
                    that.tableData = res.body.list;
                    that.allCount = res.body.allCount;
                }).catch(function () {

                })
            },
            //提交添加数据
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let that = this;
                        postAjax('/api/achi/add',{
                            achievement_Time:this.form.day,
                            achievement_Admin:"1",
                            achievement_Amount:this.form.money,
                        }).then(function (res) {
                            that.dialogFormVisible = false;
                            that.getData();
                        }).catch(function () {

                        })
                    } else {

                        return false;
                    }
                });
            },
            //修改编辑
            handleEdit(index) {
                this.editform = this.tableData[index];
                this.updataAmount = this.editform.achievement_Amount;
                this.dialogFormVisible2 = true;
            },
            //更新修改数据
            modifyForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let that = this;
                        postAjax('/api/achi/update',{
                            achievement_Id:this.editform.achievement_Id,
                            achievement_Amount:this.updataAmount,
                        }).then(function (res) {
                            that.dialogFormVisible2 = false;
                            that.getData();
                        }).catch(function () {

                        })
                    } else {

                        return false;
                    }
                });
            },
            //点击添加按钮
            handleAdd(){
                this.dialogFormVisible = true;
            },
            //添加图片
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            //删除功能
            delAll(){
                const self = this,
                    length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                }
                self.$message.error('删除了'+str);
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
        }
    }
</script>

<style slang="less" type="text/less" scoped>
    .el-breadcrumb{
        margin-bottom:20px;
    }
    .handle-box{
        margin-bottom: 20px;

    }
    .handle-box .el-input{
        margin-right:10px;
    }
    .handle-select{
        width: 120px;
    }
    .handle-input{
        width: 300px;
        display: inline-block;
    }
    .el-dialog__wrapper {
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: fixed;
        overflow: auto;
        margin: 0;
    }
    .el-dialog--small {
        width: 50%;
    }
    .el-dialog {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        background: #fff;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0,0,0,.3);
        box-sizing: border-box;
        margin-bottom: 50px;
    }
    .el-dialog__header {
        padding: 20px 20px 0;
    }
    .el-dialog__body {
        padding: 30px 20px;
        color: #48576a;
        font-size: 14px;
    }
    .el-dialog__footer {
        padding: 10px 20px 15px;
        text-align: right;
        box-sizing: border-box;
    }
</style>
