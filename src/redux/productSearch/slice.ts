import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ProductSearchState {
    loading: boolean
    error: string | null
    data: any
    pagination: any
}

const initialState: ProductSearchState = {
    loading: true,
    error: null,
    data: null,
    pagination: null
}

export const searchProduct = createAsyncThunk( // 异步处理的方法，返回一个promise
    "productSearch/searchProduct",
    async (paramsters: {
        keywords: string,
        pageSize: string | number
        nextPage: string | number
    }, thunkAPI) => {
        let url = `http://123.56.149.216:8080/api/touristRoutes?pageNumber=${paramsters.nextPage}&pageSize=${paramsters.pageSize}`
        if (paramsters.keywords) {
            url += `&keywords=${paramsters.keywords}`
        }
        const res = await axios.get(url)
        return {
            date: res.data,
            pagination: JSON.parse(res.headers['x-pagination'])
        }
    }
)

export const productSearchSlice = createSlice({
    name: "productSearch",
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
        [searchProduct.pending.type]: (state) => {
            state.loading = true
        },
        [searchProduct.fulfilled.type]: (state, action) => {
            state.data = action.payload.data
            state.pagination = action.payload.pagination
            state.loading = false
            state.error = null
        },
        // PayloadAction 自己指定类型定义
        [searchProduct.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
            state.loading = false
        }
    }
})