import { createSlice } from "@reduxjs/toolkit";
import { login } from "../actions/authAction";

export type AuthState = Partial<{
  auth: Company;
  loading: boolean;
  error: any;
}>;

const initialState: AuthState = {
  auth: undefined,
  loading: false,
  error: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.auth = payload.data;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

const { logout } = authSlice.actions;

export const AuthAction = { login, logout };

export default authSlice.reducer;
