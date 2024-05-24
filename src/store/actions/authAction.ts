import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "@src/api";
import axios from "axios";

const login = createAsyncThunk(
  "auth/login",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await authApi.login(data);
      console.log(res);
      return res.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data);
      }
    }
  },
);
export { login };
