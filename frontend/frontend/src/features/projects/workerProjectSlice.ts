// src/features/projects/workerProjectSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axiosInstance from "../../api/axios";
import { stat } from "fs";

interface Worker {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  worker: Worker;
}

interface WorkerProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: WorkerProjectState = {
  projects: [],
  loading: false,
  error: null,
};

// Async thunk to fetch projects for the logged-in worker
export const fetchWorkerProjects = createAsyncThunk<
  Project[],
  void,
  { state: RootState }
>("workerProjects/fetchWorkerProjects", async (_, { getState, rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/api/projects/");
    console.log(response.data)
    return response.data; // should be the array of projects
  } catch (err: any) {
    return rejectWithValue(err.response?.data || "Failed to fetch worker projects");
  }
});

const workerProjectSlice = createSlice({
  name: "workerProjects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkerProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkerProjects.fulfilled, (state: WorkerProjectState, action: PayloadAction<Project[]>) => {
        state.loading = false;
        console.log(action.payload)
        state.projects =action.payload;
        console.log(state.projects)
      })
      .addCase(fetchWorkerProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectWorkerProjects = (state: RootState) => state.workerProjects.projects;
export const selectWorkerProjectsLoading = (state: RootState) => state.projects.loading;

export default workerProjectSlice.reducer;
