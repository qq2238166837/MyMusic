import request from "../../unit/request"

// pages/vieo/vieo.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group: [],//获取视频标签的数据
    navid: '',//获取被点击的视频标签的id
    vieoData: []//视频数据
  },
  goIndex() {
    wx.reLaunch({
      url: '../index/index'
    })
  },

  async group() {
    let group = await request('/video/group/list');
    this.setData({
      group: group.data.slice(0, 14),
      navid: group.data[0].id
    })
    //页面刚加载时获取id后获取数据
    this.groupData(this.data.navid)
  },
  async groupData(navid) {
    //请求列表标签内的数据
    let groupData = await request('/video/group', { id: navid })
    //关闭消息提示
    wx.hideLoading()
    this.setData({
      vieoData: groupData.datas
    })
  },
  getNavid(event) {
    let navid = event.currentTarget.id
    this.setData({
      //获取被点击的id，然后进行判断，如果id与被点击id相等那么就给他加上样式
      navid: navid,
      //页面完全加载前不显示页面的内容
      vieoData:[]
    })
    //由于异步的原因，导致我们拿到的this.data.navid为初始值（‘也就是为空’），所以我们将方法放入其中，等待赋值完毕后再运行
    wx.showLoading({
      title:'正在加载'
    })
    //点击按钮之后切换另外标签的内容
    this.groupData(this.data.navid)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.group();//获取视频的标签
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