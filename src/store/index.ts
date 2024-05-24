import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import bookingSlice from "./slices/bookingSlice";
import timeFrameSlice from "./slices/timeFrameSlice";
import { vehicleSlice } from "./slices/vehicleSlice";
import availableSlotSlice from "./slices/availableSlotSlice";
import ticketSlice from "./slices/ticketSlice";
import { userSlice } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    booking: bookingSlice.reducer,
    timeFrame: timeFrameSlice.reducer,
    vehicles: vehicleSlice.reducer,
    availableSlot: availableSlotSlice.reducer,
    ticket: ticketSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
