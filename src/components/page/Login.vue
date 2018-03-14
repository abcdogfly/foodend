<template>
    <div class="login-wrap"  >
        <div class="login" >
            <p><img src="../../../static/img/LOGO.png" alt=""/><span>仔仔零食后台管理</span></p>
            <ul>
                <li>
                    <input type="text" name="login_Id" placeholder="User" v-model="ruleForm.login_Id"/>
                </li>
                <li>
                    <input type="password" name="admin_Pwd" placeholder="Password" @keyup.enter="submitForm()" v-model="ruleForm.admin_Pwd"/>
                </li>
                <li>
                    <a @click="submitForm()" style="color: #fff">Enter</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { Message } from 'element-ui'
    import { postAjax,getmd5 } from 'src/public/js/config'
    export default {
        data: function(){
            return {
                flag:true,
                ruleForm: {
                    login_Id: '',
                    admin_Pwd: ''
                }
            }
        },
        methods: {
            regLogin(value){
                if(new RegExp(/^[a-zA-Z0-9]{4,16}$/).test(value)){
                    return true;
                }else{
                    if(value==""){
                        Message.error("请输入用户名！");
                    }else {
                        Message.error("用户名由4-16位数字或英文组成！");
                    }
                    return false;
                }
            },
            regPassword(value){
                if(new RegExp(/^[0-9a-zA-Z!@#$._+-\^]{6,18}$/).test(value)){
                    return true;
                }else{
                    if(value==""){
                        Message.error("请输入密码！");
                    }else{
                        Message.error("密码由6-18位数字或英文或特殊字符组成！")
                    }
                    return false;
                }
            },
            submitForm() {
                if(this.regLogin(this.ruleForm.login_Id)){
                    if(this.regPassword(this.ruleForm.admin_Pwd)){
                        if(this.flag){
                            let that = this;
                            that.flag = !that.flag;
                            postAjax('/api/admin/login',{
                                name:this.ruleForm.login_Id,
                                password:getmd5(this.ruleForm.admin_Pwd)
                            }).then(function (res) {
                                that.$router.push({path:'/userCommon'});
                            }).catch(function () {
                                that.flag = !that.flag;
                            })
                        }
                    }
                }
            }
        }
    }
</script>

<style lang="less" type="text/less">
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
</style>
