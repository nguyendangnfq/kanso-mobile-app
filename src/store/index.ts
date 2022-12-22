import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './pokemon/pokemonSlice';
import loginReducer from './user/loginSlice';
import registerReducer from './user/registerSlice';
import userSettingReducer from './user/userSettingSlice';
import projectReducer from './project/projectSlice';
import boardReducer from './board/boardSlice';
import taskReducer from './task/taskSlice';
import detailTaskReducer from './detailTask/detailTaskSlice';

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    login: loginReducer,
    register: registerReducer,
    userSetting: userSettingReducer,
    project: projectReducer,
    board: boardReducer,
    task: taskReducer,
    detailTask: detailTaskReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
