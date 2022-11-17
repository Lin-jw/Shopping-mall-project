import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'
// 登录与注册模块
const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    // 清除本地token
    CLEAR(state) {
        // 仓库中相关数据清空
        state.token = ''
        state.userInfo = ''
        // 本地存储token清空
        removeToken()
    }
}
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        // 获取验证码这个接口，把验证码返回，但正常情况下，会返回验证码到用户手机上
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('该手机号已被注册'))
        }
    },
    // 用户登录
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        // 服务器下发token，用户唯一标识符
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
            // 持久化存储token
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('账号或密码错误'))
        }
    },
    // 登录成功，获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async userLogout({ commit }) {
        // 只是向服务器发送一次请求，通知服务器清除token
        let result = await reqLogout()
        // actions里面不能操作state，要提交到mutations去修改state
        if (result.code == 200) {
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }

}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}