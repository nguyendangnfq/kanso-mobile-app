import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { projectApi } from '../../services/modules/project';
import { listUserInfo } from '../user/userSettingSlice';
import { userApi } from '../../services/modules/user';

export const createProject = createAsyncThunk(
  'project/createProject',
  async (params: any, thunkAPI) => {
    thunkAPI.dispatch(listUserInfo(params.owner));
    const res = await projectApi.createProject(params);
    return res;
  },
);

export const checkRoleUser = createAsyncThunk(
  'project/checkRoleUser',
  async (params: any) => {
    const res = await userApi.checkRole(params);
    return res;
  },
);

type projectStateType = {
  loading: boolean;
  projectOwner: string;
  role: any;
};

const initialState: projectStateType = {
  loading: false,
  projectOwner: '',
  role: false,
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createProject.pending, state => {
        state.loading = true;
        console.log('pending');
      })
      .addCase(createProject.rejected, state => {
        state.loading = false;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projectOwner = action.payload.idProject;
      });

    builder
      .addCase(checkRoleUser.pending, state => {
        state.loading = true;
      })
      .addCase(checkRoleUser.rejected, state => {
        state.loading = false;
      })
      .addCase(checkRoleUser.fulfilled, (state, action) => {
        state.role = action.payload.result[0].tag;
      });
  },
});

export default projectSlice.reducer;
