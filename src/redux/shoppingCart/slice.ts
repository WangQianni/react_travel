import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ShoppingCartState {
    loading: boolean
    error: string | null
    items: any[]
}

const initialState: ShoppingCartState = {
    loading: true,
    error: null,
    items: []
}

// 获取购物车信息
export const getShoppingCart = createAsyncThunk( // 异步处理的方法，返回一个promise
    "shoppingCart/getShoppingCart",
    async (jwt: string, thunkAPI) => {
        const res = await axios.get(`http://123.56.149.216:8080/api/shoppingCart`, {
            headers: {
                Authorization: `bearer ${jwt}`
            }
        })
        // return res.shoppingCartItems
    }
)

// 添加购物车
export const addShoppingCart = createAsyncThunk( // 异步处理的方法，返回一个promise
    "shoppingCart/addShoppingCart",
    async (parameters: {
        jwt: string,
        touristRouteId: string
    }, thunkAPI) => {
        // const res = await axios.post(`http://123.56.149.216:8080/api/shoppingCart/items`, {
        //     headers: {
        //         touristRouteId: `bearer ${parameters.jwt}`
        //     }
        // })
        // return res.shoppingCartItems

        return parameters.touristRouteId
    }
)

// 删除购物车信息
export const clearShoppingCart = createAsyncThunk( // 异步处理的方法，返回一个promise
    "shoppingCart/clearShoppingCart",
    async (parameters: {
        jwt: string,
        itemIds: number[]
    }, thunkAPI) => {
        // 删除没有返回主体直接可以return / 有主体的返回一个 promise
        return await axios.delete(`http://123.56.149.216:8080/api/shoppingCart/items/(${parameters.itemIds.join(',')})`)
    }
)

// 购物车下单
export const checkout = createAsyncThunk( // 异步处理的方法，返回一个promise
    "shoppingCart/checkout",
    async (jwt: string, thunkAPI) => {
        const { data } = await axios.post(`http://123.56.149.216:8080/api/shoppingCart/checkout`,null, {
            headers: {
                Authorzation: `bearer ${jwt}`
            }
        })
        return data
    }
)

export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: { // 正常处理数据的地方
        // fetchStart: (state) => {
        //     state.loading = true
        // },
        // fetchSuccess: (state, action) => {
        //     state.data = action.payload
        //     state.loading = false
        //     state.error = null
        // },
        // // PayloadAction 自己指定类型定义
        // fetchFail: (state, action: PayloadAction<string | null>) => {
        //     state.error = action.payload
        //     state.loading = false
        // }
    },
    extraReducers: { // 异步处理数据的地方
        // 获取购物车信息
        [getShoppingCart.pending.type]: (state) => {
            state.loading = true
        },
        [getShoppingCart.fulfilled.type]: (state, action) => {
            state.items = action.payload
            state.loading = false
            state.error = null
        },
        // PayloadAction 自己指定类型定义
        [getShoppingCart.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
            state.loading = false
        },
        // 添加购物车
        [addShoppingCart.pending.type]: (state) => {
            state.loading = true
        },
        [addShoppingCart.fulfilled.type]: (state, action) => {
            // state.items = action.payload
            state.items = [...state.items, action.payload] // mock 数据
            state.loading = false
            state.error = null
        },
        // PayloadAction 自己指定类型定义
        [addShoppingCart.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
            state.loading = false
        },
        // 删除购物车信息
        [clearShoppingCart.pending.type]: (state) => {
            state.loading = true
        },
        [clearShoppingCart.fulfilled.type]: (state) => {
            state.items = []
            state.loading = false
            state.error = null
        },
        // PayloadAction 自己指定类型定义
        [clearShoppingCart.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
            state.loading = false
        },
        // 购物车下单信息
        [checkout.pending.type]: (state) => {
            state.loading = true
        },
        [checkout.fulfilled.type]: (state) => {
            state.items = []
            state.loading = false
            state.error = null
        },
        // PayloadAction 自己指定类型定义
        [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
            state.loading = false
        },
    }
})