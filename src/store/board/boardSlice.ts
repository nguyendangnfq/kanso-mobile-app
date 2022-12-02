import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { boardApi } from '../../services/modules/board';

export const fetchAllBoard = createAsyncThunk(
  'board/fetchAllBoard',
  async (params: any) => {
    const res = await boardApi.fetchAllBoard(params);
    return res;
  },
);

export const deleteBoard = createAsyncThunk(
  'board/deleteBoard',
  async (params: any, thunkAPI) => {
    const res = await boardApi.deleteBoard(params);
    await thunkAPI.dispatch(
      fetchAllBoard({
        projectowner: params.projectowner,
        owner: params.owner,
      }),
    );
    return res;
  },
);

export const createBoard = createAsyncThunk(
  'board/createBoard',
  async (params: any, thunkAPI) => {
    const res = await boardApi.createBoard(params);
    await thunkAPI.dispatch(
      fetchAllBoard({
        projectowner: params.projectowner,
        owner: params.owner,
      }),
    );
    return res;
  },
);

export const editBoard = createAsyncThunk(
  'board/editBoard',
  async (params: any, thunkAPI) => {
    const res = await boardApi.editBoard(params);
    await thunkAPI.dispatch(
      fetchAllBoard({
        projectowner: params.projectowner,
        owner: params.owner,
      }),
    );
    return res;
  },
);

type boardStateType = {
  loading: boolean;
  listJobs: Array<any>;
  membersInProject: Array<any>;
};

const initialState: boardStateType = {
  loading: false,
  listJobs: [],
  membersInProject: [],
};

export const boardSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ------- Fetch Board Data ------------>
      .addCase(fetchAllBoard.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAllBoard.rejected, state => {
        state.loading = false;
      })
      .addCase(fetchAllBoard.fulfilled, (state, action) => {
        state.loading = false;

        let jobList = action.payload;
        if (jobList) {
          state.listJobs = [];
          jobList.ListJob.map((job: any) => {
            let members: Array<any> = [];
            job.members.map((member: any) => {
              members.push(member);
            });
            state.listJobs.push({
              id_job: job._id,
              title: job.title,
              progress: job.progess,
              priority: job.priority,
              is_completed: job.is_completed || false,
              start_time: moment(job.start_time).format('YYYY-MM-DD'),
              end_time: moment(job.end_time).format('YYYY-MM-DD'),
              members: members,
            });
          });
          state.membersInProject = jobList.memberInProject;
        }
      });

    // ----------- Delete Board ------------>
    builder
      .addCase(deleteBoard.pending, state => {
        state.loading = true;
      })
      .addCase(deleteBoard.rejected, state => {
        state.loading = false;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      });

    // ------------- Create Board ------------->
    builder
      .addCase(createBoard.pending, state => {
        state.loading = true;
      })
      .addCase(createBoard.rejected, state => {
        state.loading = false;
      })
      .addCase(createBoard.fulfilled, state => {
        state.loading = false;
      });
    // -------------- Edit Board ------------->
    builder
      .addCase(editBoard.pending, state => {
        state.loading = true;
      })
      .addCase(editBoard.rejected, state => {
        state.loading = false;
      })
      .addCase(editBoard.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      });
  },
});

export default boardSlice.reducer;
