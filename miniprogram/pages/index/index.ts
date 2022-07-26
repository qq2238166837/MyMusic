// index.ts
// 获取应用实例
// const app = getApp<IAppOption>()
//引入数据请求
import request from '../../unit/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],//轮播图数据
    aboutMusic: [],//歌曲推荐数据
    topList: []//排行榜数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //请求轮播图数据
  async result(id){
  let result = await request('/banner', { type: id })
  this.setData({
    bannerList: result.banners
  })
},
//请求推荐数据
  async aboutMusic(num){
    let aboutMusic = await request('/personalized', { limit:num})
    this.setData({
      aboutMusic: aboutMusic.result
    })
  },
//请求排行榜数据
async topList(){
  let index = 0;
  let topListData = await request('/toplist/detail');
  let arr = topListData.list.slice(0, 5)
  while(index<4){
    this.data.topList.push(arr[index++])
  }
  this.setData({
    topList:this.data.topList
  })
},
   onLoad() {
    this.result(1)
    // 请求推荐数据
    this.aboutMusic(5)
    //请求排行榜数据
   this.topList()
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
  onShareAppMessage(opts): WechatMiniprogram.Page.ICustomShareContent {
    console.log(opts.target)
    return {}
  }
})