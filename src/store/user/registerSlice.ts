import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userApi } from '../../services/modules/user';
import { Alert } from 'react-native';

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
  status: boolean;
};

const initialState: RegisterState = {
  loading: false,
  error: '',
  token: '',
  status: false,
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
        Alert.alert('Account is existed!', 'Please try another');
      }
    });
  },
});

export default registerSlice.reducer;
