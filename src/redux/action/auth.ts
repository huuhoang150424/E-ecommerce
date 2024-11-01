import { handleApi } from '@/service';
import { createAsyncThunk } from '@reduxjs/toolkit';
interface LoginPayload {
  email: string;
  password: string;
}



//rejectWithValue hàm trả về giá trị lỗi
export const loginAuth = createAsyncThunk('auth/login', async (payload : LoginPayload, { rejectWithValue }) => {
  try {
    const response = await handleApi('/auth/login', payload, 'POST');
    if (response.status === 200) {
      return response.data;
    } else {
      return rejectWithValue(response.data);
    }
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});
