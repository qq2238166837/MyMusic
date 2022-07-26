import config from './config'
export default (url,data={},method='GET')=>{
     return new Promise((resolve,reject)=>{
      
      wx.request({
        url:config.host+url,
        data,
        method,
        header:{cookie:wx.getStorageSync('cooikes')?wx.getStorageSync('cooikes').find(item => item.indexOf('MUSIC_U')!== -1):''},
        success:(res)=>{
          // console.log('请求成功：',res)
         if (data.tologin) {
          let cookies = res.cookies
          wx.setStorageSync('cooikes', cookies)
          console.log(wx.getStorageSync('cooikes'))
         }
          resolve(res.data)
        },
        fail:(err)=>{
          // console.log('请求失败',err)
          reject(err)
        }
      })
     })
    
}
