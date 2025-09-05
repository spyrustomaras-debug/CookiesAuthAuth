// src/features/projects/projectSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";
import { RootState } from "../../store";

// Types
interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  worker: number;
}

interface WorkerProjects {
  worker: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
  projects: Project[];
}

interface ProjectState {
  workersProjects: WorkerProjects[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProjectState = {
  workersProjects: [],
  loading: false,
  error: null,
};

// Async thunk to fetch workers and their projects
export const fetchWorkersProjects = createAsyncThunk<
  WorkerProjects[],
  void,
  { state: RootState }
>("projects/fetchWorkersProjects", async (_, { getState, rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/api/admin/workers-projects/");
    return response.data; // array of { worker, projects }
  } catch (err: any) {
    return rejectWithValue(err.response?.data || "Failed to fetch projects");
  }
});

// Slice
const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkersProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchWorkersProjects.fulfilled,
        (state, action: PayloadAction<WorkerProjects[]>) => {
          state.loading = false;
          state.workersProjects = action.payload;
        }
      )
      .addCase(fetchWorkersProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Selector
export const selectWorkersProjects = (state: RootState) => state.projects.workersProjects;
export const selectProjectsLoading = (state: RootState) => state.projects.loading;

export default projectSlice.reducer;
