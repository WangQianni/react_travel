import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store'
import axios from 'axios'
export const FETCH_RECOMMEND_PRODUCTS_START = "FETCH_RECOMMEND_PRODUCTS_START" // 正在调用推荐信息的api
export const FETCH_RECOMMEND_RPODUCTS_SUCCESS = "FETCH_RECOMMEND_RPODUCTS_SUCCESS" // 推荐信息api 调用成功
export const FETCH_RECOMMEND_RPODUCTS_FAIL = "FETCH_RECOMMEND_RPODUCTS_FAIL" // 推荐信息api 调用失败

interface FetchRecommendProductsStartAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_START
}

interface FetchRecommendProductsSuccessAction {
    type: typeof FETCH_RECOMMEND_RPODUCTS_SUCCESS,
    paylaod: any
}

interface FetchRecommendProductsFailAction {
    type: typeof FETCH_RECOMMEND_RPODUCTS_FAIL,
    paylaod: any
}

export type RecommendProductsAction = FetchRecommendProductsStartAction | FetchRecommendProductsSuccessAction | FetchRecommendProductsFailAction

export const fetchRecommendProductsStartActionCreator = (): FetchRecommendProductsStartAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_START
    }
}

export const fetchRecommendProductsSuccessActionCreator = (state): FetchRecommendProductsSuccessAction => {
    return {
        type: FETCH_RECOMMEND_RPODUCTS_SUCCESS,
        paylaod: state
    }
}

export const fetchRecommendProductsFailActionCreator = (state): FetchRecommendProductsFailAction => {
    return {
        type: FETCH_RECOMMEND_RPODUCTS_FAIL,
        paylaod: state
    }
}

// redux-thunk异步处理请求数据
// thunk可以返回一个函数，不一定是js对象
// 在一个thun action中可以完成一系列连续的action操作
// 可以处理异步逻辑
// 业务逻辑可以从ui层面挪到这里，代码分成会更清晰
export const giveMeDataActionCreator = (): ThunkAction<void, RootState, unknown, RecommendProductsAction> => async (dispatch, getState) => {
    dispatch(fetchRecommendProductsStartActionCreator())
    try {
        const res = await axios.get("http://123.56.149.216:8080/api/productCollections")
        dispatch(fetchRecommendProductsSuccessActionCreator(res.data))
    } catch (err) {
        dispatch(fetchRecommendProductsFailActionCreator(err.message))
    }
}