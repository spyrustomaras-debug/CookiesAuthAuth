import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";
import * as Sentry from "@sentry/react";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  loggedIn: boolean;
  role: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  loggedIn: false,
  role: null,
};

// Login thunk
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/api/login/", credentials);

      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      const { access, refresh, ...userInfo } = response.data;
      return userInfo;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.loggedIn = false;
      state.error = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    restoreLogin: (state) => {
      // Attempt to restore login from localStorage
      const access = localStorage.getItem("accessToken");
      const refresh = localStorage.getItem("refreshToken");
      const user = localStorage.getItem("user");

      if (access && refresh && user) {
        state.user = JSON.parse(user);
        state.loggedIn = true;
        state.role = JSON.parse(user).role;
      }
    },
    setUserInLocalStorage: (state, action) => {
      state.user = action.payload;
      state.loggedIn = true;
      state.role = action.payload.role;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.loggedIn = true;
        state.role = action.payload.role;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.loggedIn = false;
        state.user = null;
        state.role = null;
      });
  },
});

export const { logout, restoreLogin, setUserInLocalStorage } = authSlice.actions;
export default authSlice.reducer;
