import { Spinner } from "@nghinv/react-native-loading";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getVehicleAction } from "../actions/vehicleAction";

type VehicleState = Partial<{
  entities: Vehicle[];
}>;

const initialState: VehicleState = {
  entities: [],
};

const actions = [getVehicleAction];

export const vehicleSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getVehicleAction.fulfilled,
      (state, { payload }: PayloadAction<Vehicle[]>) => {
        state.entities = payload;
        Spinner.hide();
      },
    );
    actions.forEach((thunk) =>
      builder.addCase(thunk.pending, () => {
        Spinner.show();
      }),
    );
    actions.forEach((thunk) =>
      builder.addCase(thunk.rejected, () => {
        Spinner.hide();
      }),
    );
  },
});
export const vehicleActions = {
  ...vehicleSlice.actions,
  getVehicleAction,
};
