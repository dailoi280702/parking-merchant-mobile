import { Spinner } from "@nghinv/react-native-loading";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  cancelTicket,
  createTicket,
  getTicketsCanceled,
  getTicketsCompleted,
  getTicketsOngoing,
  getTicketsScheduled,
} from "../actions/ticketAction";

export type TicketState = Partial<{
  newBooking: Ticket[];
  ongoingBooking: Ticket[];
  completedBooking: Ticket[];
  cancelBooking: Ticket[];
}>;

const initialState: TicketState = {
  newBooking: [],
  ongoingBooking: [],
  completedBooking: [],
  cancelBooking: [],
};

const actions = [
  createTicket,
  getTicketsScheduled,
  getTicketsCompleted,
  getTicketsCanceled,
  getTicketsOngoing,
  cancelTicket,
];

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {},
  extraReducers(builder) {
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
    builder.addCase(
      getTicketsScheduled.fulfilled,
      (state, { payload }: PayloadAction<Ticket[]>) => {
        state.newBooking = payload;
        Spinner.hide();
      },
    );
    builder.addCase(
      getTicketsOngoing.fulfilled,
      (state, { payload }: PayloadAction<Ticket[]>) => {
        state.ongoingBooking = payload;
        Spinner.hide();
      },
    );
    builder.addCase(
      getTicketsCompleted.fulfilled,
      (state, { payload }: PayloadAction<Ticket[]>) => {
        state.completedBooking = payload;
        Spinner.hide();
      },
    );
    builder.addCase(
      getTicketsCanceled.fulfilled,
      (state, { payload }: PayloadAction<Ticket[]>) => {
        state.cancelBooking = payload;
        Spinner.hide();
      },
    );
    builder.addCase(
      createTicket.fulfilled,
      (state, { payload }: PayloadAction<Ticket>) => {
        Spinner.hide();
      },
    );
    builder.addCase(
      cancelTicket.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        switch (payload.state) {
          case "new":
            const dataChange1 = state.newBooking.find(
              (e) => e.id == payload.id,
            );
            state.newBooking = state.newBooking.filter(
              (e) => e.id != payload.id,
            );
            if (dataChange1) {
              dataChange1.state = "cancel";
              state.cancelBooking.push(dataChange1);
            }
            break;
          case "ongoing":
            const dataChange2 = state.ongoingBooking.find(
              (e) => e.id == payload.id,
            );
            state.ongoingBooking = state.ongoingBooking.filter(
              (e) => e.id != payload.id,
            );
            if (dataChange2) {
              dataChange2.state = "cancel";
              state.cancelBooking.push(dataChange2);
            }
            break;
        }
        Spinner.hide();
      },
    );
  },
});

export const ticketActions = {
  ...ticketSlice.actions,
  createTicket,
  getTicketsScheduled,
  getTicketsCompleted,
  getTicketsOngoing,
  getTicketsCanceled,
  cancelTicket,
};

export default ticketSlice;
