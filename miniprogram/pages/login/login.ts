import request from "../../unit/request"

// pages/login/login.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:''
  },
  input(){},
  async login(){
    let {phone,password} = this.data
    let phoneReg =/^1(3|4|5|6|7|8|9)\d{9}$/
    if(!phone){
      wx.showToast({
        title:'电话号码不能为空',
        icon:'error'
      })
    }
     if(!password){
      wx.showToast({
        title:'密码不能为空',
        icon:'error'
      })
      return;
    }
     if(!phoneReg.test(phone)){
      wx.showToast({
        title:'电话号码格式错误',
        icon:'error'
      })
      return;
    }
    let req = await request('/login/cellphone',{phone,password,tologin:true})
    if(req.code===200){
      wx.showToast({
        title:'登录成功' ,
        icon:'success'
      })
      wx.setStorageSync('userInfo',JSON.stringify(req.profile))
      wx.reLaunch({
        url:'../personal/personal'
      })
    }else if(req.data.code === 501 && req.data.code === 502){
      wx.showToast({
        title:'登录失败，请检查你的账号或密码',
        icon:'none'
      })
    }else{
      wx.showToast({
        title:'网络开小差咯，请稍后再试',
        icon:'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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