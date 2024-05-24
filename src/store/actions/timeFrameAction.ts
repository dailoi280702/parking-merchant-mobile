import { createAsyncThunk } from "@reduxjs/toolkit";
import { timeFrameApi } from "@src/api";

const getTimeFrames = createAsyncThunk(
  "timeFrame/get",
  async (idParkingLot: string) => {
    const res = await timeFrameApi.getAll(idParkingLot);
    return res.data.data.data;
  },
);

export { getTimeFrames };
