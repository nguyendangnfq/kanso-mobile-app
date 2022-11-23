import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userApi } from '../../services/modules/user';

export const register = createAsyncThunk(
  'user/register',
  async (params: any) => {
    const res = await userApi.register(params);
    return res;
  },
);

export type RegisterState = {
  loading: boolean;
  error: string;
  token: string;
};

const initialState: RegisterState = {
  loading: false,
  error: '',
  token: '',
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(register.pending, state => {
      state.loading = true;
    });
    builder.addCase(register.rejected, state => {
      state.loading = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.id;
      const setStorage = async () => {
        try {
          await AsyncStorage.setItem(
            'access_token',
            JSON.stringify(action.payload.id),
          );
        } catch (error) {
          console.log(error);
        }
      };
      if (action.payload && !action.payload.isSuccess) {
        console.log('Login Failed');
      } else {
        setStorage();
      }
    });
  },
});

export default registerSlice.reducer;
