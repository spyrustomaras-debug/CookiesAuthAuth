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

// Create project thunk
export const createWorkerProject = createAsyncThunk<
  Project,
  { name: string; description: string },
  { state: RootState }
>("workerProjects/createWorkerProject", async (projectData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/api/projects/", projectData);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || "Failed to create project");
  }
});

// Async thunk to update project status
export const updateProjectStatus = createAsyncThunk<
  Project,
  { projectId: number; status: string },
  { state: RootState }
>("workerProjects/updateProjectStatus", async ({ projectId, status }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch(`/api/projects/${projectId}/update_status/`, { status });
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || "Failed to update project status");
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
      })

      // Create project
      .addCase(createWorkerProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWorkerProject.fulfilled, (state, action: PayloadAction<Project>) => {
        state.loading = false;
        state.projects.push(action.payload); // add newly created project to state
      })
      .addCase(createWorkerProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateProjectStatus.fulfilled, (state, action: PayloadAction<Project>) => {
        const index = state.projects.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.projects[index] = action.payload;
      });
  },
});

export const selectWorkerProjects = (state: RootState) => state.workerProjects.projects;
export const selectWorkerProjectsLoading = (state: RootState) => state.projects.loading;

export default workerProjectSlice.reducer;
