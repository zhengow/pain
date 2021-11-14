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
    if (detail.length > 0) {
      this.setData({
        curThought: this.data.pains[detail[0]].thought
      })
    }
  },

  renderList: function () {
    try {
      const value = wx.getStorageSync('pain_size')
      if (value) {
        const pains: Pain[] = []
        for (let i = 1; i < value; i++) {
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
  updateClick(e: any) {
    const index = e.currentTarget.dataset.index
    const pain = this.data.pains[index]
    const thought = e.currentTarget.dataset.thought
    pain.thought = thought
    setPainMain(index + 1, pain)
    // this.set
    // console.log(e)
  },
  onShow() {
    console.log('onshow')
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