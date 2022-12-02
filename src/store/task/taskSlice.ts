import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { taskApi } from './../../services/modules/task';

export const fetchTask = createAsyncThunk(
  'task/fetchTask',
  async (params: any) => {
    let res = await taskApi.fetch(params);
    return res;
  },
);

export const automateChangeColAsync = createAsyncThunk(
  'task/automateChangeColAsync',
  async params => {
    let res = await taskApi.autoChangeColumn(params);
    return res;
  },
);

export const createTask = createAsyncThunk(
  'task/createTask',
  async (params: any, thunkAPI) => {
    let res = await taskApi.createTask(params);
    await thunkAPI.dispatch(fetchTask({ jobowner: params.idBoard }));
    return res;
  },
);

export const editTask = createAsyncThunk(
  'task/editTask',
  async (params: any, thunkAPI) => {
    let res = await taskApi.editTask(params.editTask);
    await thunkAPI.dispatch(fetchTask({ jobowner: params.idBoard }));
    return res;
  },
);

export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async (params: any, thunkAPI) => {
    let res = await taskApi.deleteTask(params);
    await thunkAPI.dispatch(fetchTask({ jobowner: params.jobowner }));
    return res;
  },
);

type taskStateType = {
  loading: boolean;
  loadingCompleted: boolean;
  changeColumnDone: boolean;
  jobInfo: any;
  listTask: any;
  memberInJob: any;
};

const initialState: taskStateType = {
  loading: false,
  loadingCompleted: false,
  changeColumnDone: false,
  jobInfo: {},
  listTask: [
    {
      id_column: 0,
      eachColumnTask: [],
    },
    {
      id_column: 1,
      eachColumnTask: [],
    },
    {
      id_column: 2,
      eachColumnTask: [],
    },
    {
      id_column: 3,
      eachColumnTask: [],
    },
  ],
  memberInJob: [],
};

export const taskSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    automaticallyUpdateColumn: (state, action) => {
      const { columnId, task, index } = action.payload;

      if (task.is_complete) return;

      if (task.progress === 100) {
        const indexTaskNeedChangePreview = state.listTask[
          columnId
        ].eachColumnTask.findIndex(
          (item: any) => item.progress === 100 && item.is_complete === false,
        );
        state.listTask[2].eachColumnTask.push(task);
        state.listTask[columnId].eachColumnTask.splice(
          indexTaskNeedChangePreview,
          1,
        );
      } else if (
        columnId === 0 &&
        moment().isBetween(
          moment(task.start_time).format('YYYY-MM-DD'),
          moment(task.end_time).format('YYYY-MM-DD'),
        )
      ) {
        // change in progress
        state.listTask[0].eachColumnTask.splice(index, 1);
        state.listTask[1].eachColumnTask.push(task);
      } else if (moment().isAfter(task.end_time)) {
        // change overdue
        if (columnId !== 3 && state.listTask[columnId].eachColumnTask[index]) {
          state.listTask[columnId].eachColumnTask[index].isOverdue = true;
        }
        switch (columnId) {
          case 1: {
            state.listTask[0].eachColumnTask.push(
              ...state.listTask[1].eachColumnTask.filter((item: any) => {
                return item.id === task.id;
              }),
            );
            state.listTask[1].eachColumnTask =
              state.listTask[1].eachColumnTask.filter((item: any) => {
                return item.id !== task.id;
              });

            break;
          }
          case 2: {
            state.listTask[0].eachColumnTask.push(
              ...state.listTask[2].eachColumnTask.filter((item: any) => {
                return item.id === task.id;
              }),
            );
            state.listTask[2].eachColumnTask =
              state.listTask[2].eachColumnTask.filter((item: any) => {
                return item.id !== task.id;
              });
            break;
          }
          default:
            break;
        }
      }
    },
  },
  extraReducers: builder => {
    // ------- Fetch Board Data ------------>
    builder
      .addCase(fetchTask.pending, state => {
        state.loading = true;
      })
      .addCase(fetchTask.rejected, state => {
        state.loading = false;
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.loading = false;
        state.jobInfo = action.payload.jobInfo;
        state.listTask = action.payload.ListTask;
        state.memberInJob = action.payload.memberInJob;
        state.changeColumnDone = true;
      });

    // -------- Auto Change Column ------------->
    builder
      .addCase(automateChangeColAsync.pending, state => {
        state.loading = true;
      })
      .addCase(automateChangeColAsync.rejected, state => {
        state.loading = false;
      })
      .addCase(automateChangeColAsync.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      });

    // ------------ Delete Board --------------->
    builder
      .addCase(deleteTask.pending, state => {
        state.loading = true;
      })
      .addCase(deleteTask.rejected, state => {
        state.loading = false;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      });
    // ------------- Create Board ------------->
    builder
      .addCase(createTask.pending, state => {
        state.loading = false;
      })
      .addCase(createTask.rejected, state => {
        state.loading = false;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      });
    // -------------- Edit Board ------------->
    builder
      .addCase(editTask.pending, state => {
        state.loading = false;
      })
      .addCase(editTask.rejected, state => {
        state.loading = false;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.loading = false;
        state.changeColumnDone = true;
        console.log(action.payload);
      });
  },
});

export const { automaticallyUpdateColumn } = taskSlice.actions;
export default taskSlice.reducer;
