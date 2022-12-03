import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { projectApi } from '../../services/modules/project';
import { listUserInfo } from '../user/userSettingSlice';
import { userApi } from '../../services/modules/user';
import { fetchAllBoard } from '../board/boardSlice';

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

export const renameProject = createAsyncThunk(
  'project/renameProject',
  async (params: any, thunkAPI) => {
    const res = await projectApi.renameProject(params);
    thunkAPI.dispatch(
      fetchAllBoard({
        projectowner: params.idProject,
        owner: params.idUser,
      }),
    );
    return res;
  },
);

export const deleteProject = createAsyncThunk(
  'project/deleteProject',
  async (params: any) => {
    const res = await projectApi.deleteProject(params);
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

    builder
      .addCase(deleteProject.pending, state => {
        state.loading = true;
      })
      .addCase(deleteProject.rejected, state => {
        state.loading = false;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      });

    builder
      .addCase(renameProject.pending, state => {
        state.loading = true;
      })
      .addCase(renameProject.rejected, state => {
        state.loading = false;
      })
      .addCase(renameProject.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      });
  },
});

export default projectSlice.reducer;
