import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { checkout } from '../shoppingCart/slice';

interface OrderState {
    loading: boolean
    error: string | null
    currentOrder: any
}

const initialState: OrderState = {
    loading: false,
    error: null,
    currentOrder: null
}

export const placeOrder = createAsyncThunk( // 异步处理的方法，返回一个promise
    "order/placeOrder",
    async (parameters: {
        jwt: string,
        orderId: string
    }, thunkAPI) => {
        const { data } = await axios.post(`http://123.56.149.216:8080/api/orders/${parameters.orderId}/placeOrder`, null, {
            headers: {
                Authorzation: `bearer ${parameters.jwt}`
            }
        })
        return data
    }
)

export const orderSlice = createSlice({
    name: "order",
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
        [placeOrder.pending.type]: (state) => {
            state.loading = true
        },
        [placeOrder.fulfilled.type]: (state, action) => {
            state.currentOrder = action.payload
            state.loading = false
            state.error = null
        },
        // PayloadAction 自己指定类型定义
        [placeOrder.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
            state.loading = false
        },
        // 直接从checkout中获取
        [checkout.pending.type]: (state) => {
            state.loading = true
        },
        [checkout.fulfilled.type]: (state, action) => {
            state.currentOrder = action.payload
            state.loading = false
            state.error = null
        },
        // PayloadAction 自己指定类型定义
        [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
            state.loading = false
        }
    }
})