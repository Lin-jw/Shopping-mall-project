// 先引入mockjs模块
import Mock, { mock } from 'mockjs'
// 引入json格式数据[json 数据格式默认对外暴露]
// webpack默认对外暴露：图片，Json数据格式
import banner from './banner.json'
import floor from './floor.json'

// mock数据 第一个参数：请求地址 第二个参数：请求数据 
Mock.mock("/mock/banner", { code: 200, data: banner }) //模拟首页轮播图
Mock.mock("/mock/floor", { code: 200, data: floor })