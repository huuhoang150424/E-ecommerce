// import { createAsyncThunk } from "@reduxjs/toolkit"
// import {loginUser} from "../../data/Api"

// //rejectWithValue hàm trả về giá trị lỗi
// export const login=createAsyncThunk("auth/login",async (payload,{rejectWithValue})=>{
//     try {
//         const response = await loginUser(payload)
//         if (response.status === 200) {
//             return response.data
//         } else {
//             return rejectWithValue(response.data)
//         }
//     } catch(err:any) {
//         return rejectWithValue(err.response.data)
//     }
// })
