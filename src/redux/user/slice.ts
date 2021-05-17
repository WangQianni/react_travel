import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
    loading: boolean
    error: string | null
    token: string | null
    mockData: any
}

const initialState: UserState = {
    loading: false,
    error: null,
    token: null,
    mockData: null
}

// export const signIn = createAsyncThunk( // 异步处理的方法，返回一个promise
//     "user/signIn",
//     async (paramaters: {
//         username: string,
//         password: string
//     }, thunkAPI) => {
//         const res = await axios.post("/login", {
//             username: paramaters.username,
//             password: paramaters.password
//         })
//         return res
//     }
// )

export const signIn = createAsyncThunk( // mock 数据
    "user/signIn",
    async (data: Object, thunkAPI) => {
        return data
    }
)
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logOut: (state) => {
            state.token = null
            state.error = null
            state.loading = false
        },
        mockups: (state, action) => { // mock 数据
            state.mockData = action.payload
        }
    },
    extraReducers: { // 异步处理数据的地方 
        [signIn.pending.type]: (state) => {
            state.loading = true
        },
        [signIn.fulfilled.type]: (state, action) => {
            // state.token = action.payload
            state.token = JSON.stringify(action.payload) // mock 数据
            state.loading = false
            state.error = null
        },
        // PayloadAction 自己指定类型定义
        [signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
            state.loading = false
        }
    }
})