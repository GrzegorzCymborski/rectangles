import { configureStore } from '@reduxjs/toolkit';
import projectDataReducer from './project';

const store = configureStore({
  reducer: {
    projectData: projectDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
