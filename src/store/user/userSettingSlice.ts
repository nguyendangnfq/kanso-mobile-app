import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../../services/modules/user';

export const listUserInfo = createAsyncThunk(
  'user/listUserInfo',
  async (params: any) => {
    const res = await userApi.userInfo(params);
    return res;
  },
);

export const editUser = createAsyncThunk(
  'user/editUser',
  async (params: any, thunkAPI) => {
    const res = await userApi.editUser(params);
    await thunkAPI.dispatch(listUserInfo(params.owner));
    return res;
  },
);

const initialState = {
  name: '',
  bio: '',
  display_name: '',
  company: '',
  location: '',
  email: '',
  avatarURL: '',
  projects: [
    {
      idProject: 1,
      title: '',
      members: [''],
    },
  ],
  loading: false,
  tasks: [],
  allTask: [],
};

export const userSettingSlice = createSlice({
  name: 'userSetting',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(listUserInfo.pending, state => {
        state.loading = true;
      })
      .addCase(listUserInfo.rejected, state => {
        state.loading = false;
      })
      .addCase(listUserInfo.fulfilled, (state, action) => {
        let payload = action.payload;
        state.loading = false;
        if (payload) {
          let userInfo = payload[0]?.userInfo;
          state.name = userInfo?.user_name;
          state.display_name = userInfo?.display_name;
          state.bio = userInfo?.bio;
          state.company = userInfo?.company;
          state.location = userInfo?.address;
          state.email = userInfo?.email;
          state.avatarURL = userInfo?.avatar;
          state.projects = [];
          //   sessionStorage.setItem('avatarURL', userInfo?.avatar);
          //   sessionStorage.setItem('name', userInfo?.display_name);
          //   sessionStorage.setItem('user_name', userInfo?.user_name);

          payload[1]?.allProject.forEach((project: any) => {
            state.projects.push({
              ...project,
              totalTask: project.totalTaskInProject,
              completedTask: project.totalTaskComplete,
            });
          });
          state.allTask = payload[1]?.allTask;
        }
      });

    builder
      .addCase(editUser.pending, state => {
        state.loading = true;
      })
      .addCase(editUser.rejected, state => {
        state.loading = false;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      });
  },
});

export default userSettingSlice.reducer;
