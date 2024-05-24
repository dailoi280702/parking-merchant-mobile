import { createAsyncThunk } from "@reduxjs/toolkit";
import { ticketApi } from "@src/api";
import {
  CANCEL_STATE,
  COMPLETED_STATE,
  NEW_STATE,
  ONGOING_STATE,
} from "@src/utils/constant";

const getTicketsScheduled = createAsyncThunk(
  "ticket/getScheduled",
  async (idUser: string) => {
    const res = await ticketApi.getAllByIdUser(idUser, NEW_STATE);
    return res.data;
  },
);
const getTicketsOngoing = createAsyncThunk(
  "ticket/getOngoing",
  async (idUser: string) => {
    const res = await ticketApi.getAllByIdUser(idUser, ONGOING_STATE);
    return res.data;
  },
);
const getTicketsCanceled = createAsyncThunk(
  "ticket/getCanceled",
  async (idUser: string) => {
    const res = await ticketApi.getAllByIdUser(idUser, CANCEL_STATE);
    return res.data;
  },
);
const getTicketsCompleted = createAsyncThunk(
  "ticket/getCompleted",
  async (idUser: string) => {
    const res = await ticketApi.getAllByIdUser(idUser, COMPLETED_STATE);
    return res.data;
  },
);
const createTicket = createAsyncThunk("ticket/create", async (data: any) => {
  const res = await ticketApi.create(data);
  return res.data;
});
const cancelTicket = createAsyncThunk(
  "ticket/cancel",
  async ({ id, state }: any) => {
    const res = await ticketApi.cancel(id);
    return {
      id: res.data,
      state,
    };
  },
);

export {
  getTicketsScheduled,
  createTicket,
  getTicketsCompleted,
  getTicketsOngoing,
  getTicketsCanceled,
  cancelTicket,
};
