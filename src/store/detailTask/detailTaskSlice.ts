import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { detailTaskApi } from '../../services/modules/detailTask';

export const fetchDetailTask = createAsyncThunk(
  'detailTask/fetchDetailTask',
  async (params: any) => {
    const res = await detailTaskApi.fetchDetailTask(params);
    return res;
  },
);

export const createDetailTask = createAsyncThunk(
  'detailTask/createDetailTask',
  async (params: any, thunkAPI) => {
    const res = await detailTaskApi.createDetailTask(params);
    thunkAPI.dispatch(fetchDetailTask({ taskOwner: params.idTask }));
    return res;
  },
);

export const deleteDetailTask = createAsyncThunk(
  'detailTask/deleteDetailTask',
  async (params: any, thunkAPI) => {
    const res = await detailTaskApi.deleteDetailTask(params);
    thunkAPI.dispatch(fetchDetailTask({ taskOwner: params.idTask }));
    return res;
  },
);

export const editDetailTask = createAsyncThunk(
  'detailTask/editDetailTask',
  async (params: any, thunkAPI) => {
    const res = await detailTaskApi.editDetailTask(params);
    thunkAPI.dispatch(fetchDetailTask({ taskOwner: params.idTask }));
    return res;
  },
);

export const changeCompletedDetailTaskAsync = createAsyncThunk(
  'detailTask/change-completed-detail-task',
  async (params: any) => {
    const res = await detailTaskApi.changeCompletedDetailTask(params);
    return res;
  },
);

type detailTaskType = {
  loading: boolean;
  infoAllDetailTask: any;
  isUploadFileSuccess: boolean;
  infoTask: any;
  memberInTask: any;
};

const initialState: detailTaskType = {
  loading: false,
  infoAllDetailTask: [],
  isUploadFileSuccess: false,
  infoTask: {},
  memberInTask: [],
};

export const detailTaskSlice = createSlice({
  name: 'detailTask',
  initialState,
  reducers: {
    setProgress: (state, action) => {
      state.infoTask.progress = action.payload;
    },
    setIsCompleted: (state, action) => {
      state.infoTask.is_complete = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDetailTask.pending, state => {
        state.loading = true;
      })
      .addCase(fetchDetailTask.rejected, state => {
        state.loading = false;
      })
      .addCase(fetchDetailTask.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.infoAllDetailTask = action.payload.infoAllDetailTask.map(
            (task: any) => {
              return {
                ...task,
                key: task.id,
                assignOn: moment(task.assignOn).format('YYYY-MM-DD'),
              };
            },
          );
          state.infoTask = {
            ...action.payload.infoTask,
            start_time: moment(action.payload.infoTask.start_time).format(
              'YYYY-MM-DD',
            ),
            end_time: moment(action.payload.infoTask.end_time).format(
              'YYYY-MM-DD',
            ),
          };
          state.memberInTask = action.payload.memberInTask;
        }
      });

    // Create Detail Task
    builder
      .addCase(createDetailTask.pending, state => {
        state.loading = true;
      })
      .addCase(createDetailTask.rejected, state => {
        state.loading = false;
      })
      .addCase(createDetailTask.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      });

    // Delete Detail Task
    builder
      .addCase(deleteDetailTask.pending, state => {
        state.loading = true;
      })
      .addCase(deleteDetailTask.rejected, state => {
        state.loading = false;
      })
      .addCase(deleteDetailTask.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      });

    //Edit Detail Task
    builder
      .addCase(editDetailTask.pending, state => {
        state.loading = true;
      })
      .addCase(editDetailTask.rejected, state => {
        state.loading = false;
      })
      .addCase(editDetailTask.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      });

    builder
      .addCase(changeCompletedDetailTaskAsync.pending, state => {
        state.loading = true;
      })
      .addCase(changeCompletedDetailTaskAsync.rejected, state => {
        state.loading = false;
      })
      .addCase(changeCompletedDetailTaskAsync.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      });
  },
});

export const { setProgress, setIsCompleted } = detailTaskSlice.actions;
export default detailTaskSlice.reducer;
