// pages/history/index.ts
import { Pain, setPainMain } from '../../utils/util'

Page({
  data: {
    pains: <Pain[]>[],
    activeNames: ['2'],
    curThought: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onChange(event: any) {
    let detail = event.detail
    if (this.data.activeNames.length > 0) {
      const active = this.data.activeNames[0]
      detail.splice(detail.indexOf(active), 1)
    }
    this.setData({
      activeNames: detail,
    });
  },
  thoughtChange(event: any) {
    this.setData({
      curThought: event.detail
    })
  },

  renderList: function () {
    console.log("render")
    try {
      const value = wx.getStorageSync('pain_size')
      if (value) {
        const pains: Pain[] = []
        for (let i = 1; i <= value; i++) {
          pains.push(wx.getStorageSync(i.toString()))
        }
        this.setData({
          pains: pains
        })
      } 
    } catch (e) {
      console.error(e)
    }
  },

  onLoad() {
    this.setData({
      pains: []
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
  update(e: any) {
    const index = e.currentTarget.dataset.index
    const pain = this.data.pains[index]
    const thought = this.data.curThought
    pain.thought = thought
    setPainMain(index + 1, pain)
    // this.set
    // console.log(e)
  },
  deleteAll() {
    try {
      wx.clearStorageSync()
      this.setData({
        pains: []
      })
    } catch(e) {
      console.error(e)
    }
  },
  onShow() {
    this.renderList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    this.setData({
      pains: []
    })
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