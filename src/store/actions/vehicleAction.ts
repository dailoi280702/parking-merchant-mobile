import { createAsyncThunk } from "@reduxjs/toolkit";
import vehicleApi from "@src/api/vehicleApi";

const getVehicleAction = createAsyncThunk(
  "vehicles/get",
  async (idUser: string) => {
    const res = await vehicleApi.getByIdUser(idUser);
    return res.data.data;
  },
);

export { getVehicleAction };
