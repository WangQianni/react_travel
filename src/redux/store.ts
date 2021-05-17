import { createStore, applyMiddleware } from 'redux'
import languageReducer from './language/languageReducer';
import recommendProdctsReducer from './recommendProducts/recommendProdctsReducer';
import thunk from 'redux-thunk';
import { actionLog } from './middlewares/actionLog';
import { productDetailSlice } from './productDetail/slice';
import { productSearchSlice } from './productSearch/slice';
import { shoppingCartSlice } from './shoppingCart/slice';
import { userSlice } from './user/slice';
import { orderSlice } from './order/slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'; // 登录状态持久化
import storage from 'redux-persist/lib/storage'; // 登录状态持久化信息储存空间

const persistConfig = {
    key: "root",
    storage, // redux-persist默认使用 localStorage 作为储存空间
    whitelist: ["user"] // 白名单 / 这里的user指的是redux中的user，代表把user中的所有数据都保存起来，其他的不保存 / 不写这个字段就代表把所有的数据都保存起来
}

// 使用 redux-toolkit 中的 combineReducers 才可以这么使用 productDetail: productDetailSlice.reducer
const rootReducer = combineReducers({ // 所有reducer的集合
    language: languageReducer,
    recommendProdcts: recommendProdctsReducer, // 正常的 react-redux 调用 reducer
    productDetail: productDetailSlice.reducer, // 通过 redux-toolkit 调用 reducer
    productSearch: productSearchSlice.reducer,
    user: userSlice.reducer,
    shoppingCart: shoppingCartSlice.reducer,
    order: orderSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer) // 强化登录信息储存了的reducer，可以直接替换store中reducer

// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog)) // 第一个参数创建并处理所有的reducer返回行的数据，第二个参数高阶函数
const store = configureStore({ // redux-toolkit 中的store 写法
    reducer: persistedReducer, // reducer 集合
    middleware: getDefaultMiddleware => [...getDefaultMiddleware(), actionLog], // 中间件使用
    devTools: true // 打开浏览器的 devTools 调试
})

const persistor = persistStore(store) // 强化登录信息储存了的store

export type RootState = ReturnType<typeof store.getState>

export default { store, persistor }