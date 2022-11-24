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
      .addCase(fetchAllBoard.pending, state => {
        state.loading = true;
        console.log('pending');
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
  },
});

export default boardSlice.reducer;
