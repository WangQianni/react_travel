import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ProductDetailState {
    loading: boolean
    error: string | null
    data: any
}

const initialState: ProductDetailState = {
    loading: true,
    error: null,
    data: null
}

export const getProductDetail = createAsyncThunk( // 异步处理的方法，返回一个promise
    "productDetail/getProductDetail",
    async (touristRouteId: string, thunkAPI) => {
        const res = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`)
        return res
    }
)

export const productDetailSlice = createSlice({
    name: "productDetail",
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
        [getProductDetail.pending.type]: (state) => {
            state.loading = true
        },
        [getProductDetail.fulfilled.type]: (state, action) => {
            state.data = action.payload
            state.loading = false
            state.error = null
        },
        // PayloadAction 自己指定类型定义
        [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
            state.loading = false
        }
    }
})