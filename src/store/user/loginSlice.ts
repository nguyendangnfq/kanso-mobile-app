import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userApi } from '../../services/modules/user';
import { Alert } from 'react-native';

export const login = createAsyncThunk('user/login', async (params: any) => {
  const res = await userApi.login(params);
  return res;
});

export type LoginState = {
  loading: boolean;
  token: string;
  message: string;
  status: boolean;
};

const initialState: LoginState = {
  loading: false,
  token: '',
  message: '',
  status: false,
};

export const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: () => initialState,
  },
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

        if (action.payload?.isSuccess) {
          state.token = action.payload.id;
          state.status = true;
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
          setStorage();
        } else if (action.payload?.error) {
          state.status = false;
          Alert.alert('Account is invalid!', 'Please try again');
        }
      });
  },
});

export const { logout } = LoginSlice.actions;
export default LoginSlice.reducer;
