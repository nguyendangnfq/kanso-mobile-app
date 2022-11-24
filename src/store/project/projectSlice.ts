import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { projectApi } from '../../services/modules/project';
import { listUserInfo } from '../user/userSettingSlice';

export const createProject = createAsyncThunk(
  'project/createProject',
  async (params: any, thunkAPI) => {
    thunkAPI.dispatch(listUserInfo(params.owner));
    const res = await projectApi.createProject(params);
    return res;
  },
);

type projectStateType = {
  loading: boolean;
  projectOwner: string;
};

const initialState: projectStateType = {
  loading: false,
  projectOwner: '',
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
  },
});

export default projectSlice.reducer;
