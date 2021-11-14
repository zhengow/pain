// index.ts
// 获取应用实例
// const app = getApp<IAppOption>()
import { formatTime, Pain, setPainMain } from '../../utils/util'

Page({
  data: {
    painTitle: '',
    disabled: true
  },
  // 事件处理函数
  bindKeyInput: function (e: any) {
    const painTitle = e.detail.value;
    this.setData({
      painTitle: painTitle
    })
    if (painTitle === '') {
      this.setData({
        disabled: true
      })
    } else {
      this.setData({
        disabled: false
      })
    }
  },
  setPainSize(value: number) {
    wx.setStorage({
      key: 'pain_size',
      data: value
    })
  },
  submitPain: function () {
    const title = this.data.painTitle;
    const pain: Pain = {
      id: -1,
      title: title,
      thought: '',
      time: formatTime(new Date())
    }
    try {
      const value = wx.getStorageSync('pain_size')
      if (value) {
        pain.id = value + 1
        setPainMain(value + 1, pain)
        this.setPainSize(value + 1)
      } else {
        this.setPainSize(1)
        pain.id = 1
        setPainMain(1, pain)
      }
    } catch (e) {
      console.error(e)
    }
    this.setData({
      disabled: true
    })
    this.setData({
      painTitle: ''
    })
    setTimeout(() => {
      if (this.data.painTitle !== ''){
        this.setData({
          disabled: false
        })
      }
    }, 1000)
  }
})
