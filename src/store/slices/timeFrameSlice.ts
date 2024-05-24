import { Spinner } from "@nghinv/react-native-loading";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTimeFrames } from "../actions/timeFrameAction";

export type TimeFrameState = Partial<{
  entities: TimeFrame[];
  valid: TimeFrame[];
  errorMessage: string;
}>;

const initialState: TimeFrameState = {
  entities: [],
  valid: [],
  errorMessage: "",
};

export const timeFrameSlice = createSlice({
  name: "timeFrame",
  initialState,
  reducers: {
    updateValid: (
      state: TimeFrameState,
      { payload }: PayloadAction<TimeFrame[]>,
    ) => {
      state.valid = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTimeFrames.pending, () => {
      Spinner.show();
    }),
      builder.addCase(
        getTimeFrames.fulfilled,
        (state, { payload }: PayloadAction<TimeFrame[]>) => {
          state.entities = payload;
          state.valid = payload;
          Spinner.hide();
        },
      );
    builder.addCase(getTimeFrames.rejected, (state, { payload }) => {
      state.errorMessage = "";
      Spinner.hide();
    });
  },
});

export const timeFrameActions = {
  ...timeFrameSlice.actions,
  getTimeFrames,
};

export default timeFrameSlice;
