import axios from 'axios'
import {Message} from 'element-ui'
import crypto from 'crypto' /*md5加密*/
const getstate = state => {
    switch (state){
        case 0:Message.error("系统异常");break;
        case 1:break;
        case 2:Message.error("参数为空");break;
        case 3:Message.error("新增失败");break;
        case 4:Message.error("删除失败");break;
        case 5:Message.error("参数错误");break;
        case 7:Message.error("数据已存在");break;
        case 8:Message.error("未知错误");break;
        case 9:Message.error("数据错误");break;
        case 10:Message.error("数据不存在");break;
        case 1012:Message.error("缓存数据不存在");break;
        case 1023:Message.error("相同CODE字段已存在");break;
        case 1024:Message.error("相同的NAME字段已存在");break;
        default:break;
    }
}
/*公共方法*/
/*ajax post请求*/
export function postAjax (url,data){
        return new Promise((resolve, reject)=>{
            axios.post(url,data)
                .then((res)=>{
                    console.log(res.data)
                    getstate(res.data.code);/*显示状态消息*/
                    if(res.data.code==1){
                        return resolve(res.data);
                    }else{
                        return reject(res.data);
                    }
                })
                .catch((err)=>{
                    Message.error("请求失败！")
                    return reject(err);
                })
        })
    }
/*ajax GET 请求*/
export function getAjax (url,data){
    return new Promise((resolve, reject)=>{
        axios.get(url,data)
            .then((res)=>{
                console.log(res.data)
                getstate(res.data.code);/*显示状态消息*/
                if(res.data.code==1){
                    return resolve(res.data);
                }else{
                    return reject(res.data);
                }
            })
            .catch((err)=>{
                Message.error("请求失败！")
                return reject(err);
            })
    })
}
/*md5加密*/
export function getmd5 (value) {
    let hash = crypto.createHash('md5')
        .update(value)
        .digest('hex');
    return hash;
}
/*时间格式化*/
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
Date.prototype.toLocaleString = function(){
    var fmt  = "yyyy-MM-dd hh:mm:ss";
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
