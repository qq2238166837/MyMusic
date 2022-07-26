// pages/personal/personal.ts
let touchStart = 0;
let touchMount = 0;
let touchEnd = 0;

import request from '../../unit/request'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    trans: 'translateY(0)',
    tran:'',
    userInfo:{},//排行榜数据
    recent:{}//最近播放数据
  },
  touchStart(event) {
    this.setData({
      tran:''
    })
    touchStart = event.touches[0].clientY;
  },
  touchMove(event) {
    touchMount = event.touches[0].clientY;
    touchEnd = touchMount - touchStart;
    if(touchEnd <= 0){
      return;
    }
    if(touchEnd>=80){
      touchEnd=80
    }
    this.setData({
      trans: `translateY(${touchEnd}rpx)`
    })
  },
  touchEnd() {
   this.setData({
     trans:'translateY(0)',
     tran:'transform 1s linear'
   })
  },
  
  //获取最近播放信息
  async getsome(userid) {
    let requestes = await request('/user/record',{uid:userid})
    this.setData({
      recent:requestes.allData.slice(0,10)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let userInfo = wx.getStorageSync('userInfo');
    if(userInfo){ // 用户登录
      // 更新userInfo的状态
      this.setData({
        userInfo: JSON.parse(userInfo)
      })
    }
  },
  tologin(){
    wx.navigateTo({
      url:'/pages/login/login'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})