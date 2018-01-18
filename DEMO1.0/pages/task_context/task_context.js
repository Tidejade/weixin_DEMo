// pages/task_context/task_context.js
var app = getApp();
const AV = require('../../lib/av-weapp-min');
const Todo = require('../../model/Todo');
Page({
  data:{
    userInfo: {},
    title:"",
    content:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });
    var result=JSON.parse(options.res);
    this.setData({
      title: result[0],
      content:result[1]
    });
    console.log(result);
    wx.showShareMenu({
      withShareTicket:true
    })
    if(options.scence==1044){
      wx.getShareInfo({
        shareTicket: options.shareTicket,
        success: function(res){
          var encryptedData=res.encryptedData;
          var iv=res.iv;
        }
      })
    }
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  onShareAppMessage:function(res){
    if(res.from==='button'){
      console.log("Button share");
    }
    var result=[];
    reuslt[0]=this.data.title;
    reuslt[1]=this.data.content;
    return{
      title:"好友邀请你加入",
      path: '/pages/task_context/task_context?res=' + JSON.stringify(result),
      success:function(res){
         console.log("Success");
         var shareTickets=res.shareTickets;
         if(shareTickets.lenth==0){
           return false;
         }
         wx.getShareInfo({
           shareTicket: shareTickets[0],
           success: function(res){
            var encryptedData=res.encreyptedData;
            var iv=res.iv;
           }
         })
      },
      fail:function(res){
        console.log("Faild")
      }
    }
  }
})