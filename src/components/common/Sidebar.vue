<template>
    <div class="sidebar" id="sidebar">
        <el-scrollbar>
            <div class="sidebardiv" :style="styleSidebar">
                <el-menu :default-active="onRoutes" class="el-menu-vertical-demo"
                         background-color="#324157"
                         text-color="#bfcbd9"
                         active-text-color="#20a0ff"
                         theme="dark" unique-opened router>
                    <template v-for="item in items">
                        <template v-if="item.subs">
                            <el-submenu :index="item.index">
                                <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                                <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                                </el-menu-item>
                            </el-submenu>
                        </template>
                        <template v-else>
                            <el-menu-item :index="item.index">
                                <i :class="item.icon"></i>{{ item.title }}
                            </el-menu-item>
                        </template>
                    </template>
                </el-menu>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                styleSidebar:{
                    height:'300px',
                    background:'#324157',
                },
                items: [
                    {
                        icon: 'manage-shezhi',
                        index: 'home',
                        title: '统计',
                        subs:[
                            {
                                index:'userCommon',
                                title:'用户统计'
                            },
                        ]
                    },
                    {
                        icon: 'manage-renshiguanli',
                        index: 'foodList',
                        title: '商品内容',
                        subs:[
                            {
                                index:'cake',
                                title:'饼干糕点'
                            },
                            {
                                index:'meat',
                                title:'肉类制品'
                            },
                            {
                                index:'candy',
                                title:'糖果巧克力'
                            },
                            {
                                index:'honey',
                                title:'蜜饯果干'
                            },
                            {
                                index:'nuts',
                                title:'坚果炒货'
                            },
                            {
                                index:'milk',
                                title:'饮料/罐头/牛奶'
                            },
                            {
                                index:'sea',
                                title:'海味零食'
                            },
                            {
                                index:'puffed',
                                title:'膨化零食'
                            },
                            {
                                index:'bean',
                                title:'豆菌笋类'
                            }
                        ]
                    },
                    {
                        icon: 'manage-shuji',
                        index: 'special',
                        title: '特殊内容',
                        subs:[
                            {
                                index:'dailySale',
                                title:'每日秒杀'
                            },
                            {
                                index:'hotSale',
                                title:'热卖推荐'
                            },
                        ]
                    },
//                    {
//                        icon: 'manage-xiaoshouqushi',
//                        index: 'manageSales',
//                        title: '销售管理',
//                        subs:[
//                            {
//                                index:'mansalHome',
//                                title:'销售管理'
//                            },
//                            {
//                                index:'mansalCourse',
//                                title:'课程管理'
//                            },
//                            {
//                                index:'mansalPerfor',
//                                title:'业绩考核'
//                            }
//                        ]
//                    },
//                    {
//                        icon: 'manage-pinpai',
//                        index: 'manageBrand',
//                        title: '品牌管理',
//                        subs:[
//                            {
//                                index:'manbraClient',
//                                title:'客户管理'
//                            },
//                            {
//                                index:'manbraActivity',
//                                title:'活动管理'
//                            },
//                            {
//                                index:'manbraStar',
//                                title:'明星学员'
//                            }
//                        ]
//                    },
//                    {
//                        icon: 'manage-caiwu',
//                        index: 'manageFinance',
//                        title: '财务管理',
//                        subs:[
//                            {
//                                index:'manfinHome',
//                                title:'财务管理'
//                            },
//                            {
//                                index:'manfinMoney',
//                                title:'费用管理'
//                            }
//                        ]
//                    },
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        mounted(){
            this.styleSidebar.height = `${document.getElementById("sidebar").clientHeight}px`;
            // 然后监听window的resize事件．在浏览器窗口变化时再设置
            const that = this;
            window.onresize = function temp() {
                that.styleSidebar.height = `${document.getElementById("sidebar").clientHeight}px`;
            };
        }
    }
</script>

<style lang="less" type="text/less" >
    .sidebar{
        display: block;
        box-sizing: border-box;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        border-right: 1px solid #e6e6e6;
        /*background: #2E363F;*/
        background: #ffffff;
        .sidebardiv{
            &>ul{
                border-right: 0;
            }
        }
    }
    /*重定义侧边栏样式*/
    .el-submenu__title i {
        color: #bfcbd9;
    }
    .el-menu-item i {
        color: #bfcbd9;
    }
    .el-submenu .el-menu{
        background-color: #1f2d3d !important;
    }
    .el-submenu .el-menu li{
        background-color: #1f2d3d !important;
        &:hover{
            background-color:#48576a !important;
        }
    }
    .el-menu-item:hover{
        background-color: #48576a !important;
    }
    .el-submenu__title:hover{
        background-color: #48576a !important;
    }
</style>
