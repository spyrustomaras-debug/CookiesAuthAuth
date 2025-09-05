import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import projectReducer from "./features/projects/projectSlice";
import workerProjectReducer from "./features/projects/workerProjectSlice";
import errorReducer from "./features/error/errorSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    workerProjects: workerProjectReducer,
    error: errorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
