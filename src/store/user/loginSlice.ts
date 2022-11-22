import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userApi } from '../../services/modules/user';

export const login = createAsyncThunk('user/login', async (params: any) => {
  const res = await userApi.login(params);
  return res;
});

export type LoginState = {
  loading: boolean;
};

const initialState: LoginState = {
  loading: false,
};

export const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
      })
      .addCase(login.rejected, state => {
        state.loading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
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
        if (action.payload.isSuccess) {
          setStorage();
        } else {
          console.log('Login Failed');
        }
      });
  },
});

export default LoginSlice.reducer;
