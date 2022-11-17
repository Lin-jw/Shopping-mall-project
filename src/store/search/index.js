import { reqGetSearchInfo } from "@/api"
// search模块的小仓库
// state:仓库存储数据的地方
const state = {
    searchList: {}
}
// mutations:修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
// action: 处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 获取search模块数据
    async getSearchList({ commit }, params = {}) {
        // 用户派发action时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
// getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    // state,当前仓库（search）
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList
    },
    attrsList(state) {
        return state.searchList.attrsList
    }

}

export default {
    state,
    mutations,
    actions,
    getters
}