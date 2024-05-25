import axiosClient from "./axiosClient";

const ticketApi = {
  getOneWithExtend: async (idTicket: any) => {
    const res = await axiosClient.get(
      "/ticket/get-one-with-extend/" + idTicket,
    );
    return res.data;
  },
  procedure: async (ticketId: any, type: string) => {
    const res = await axiosClient.post("/ticket/procedure", {
      ticketId: ticketId,
      type: type,
    });
    return res;
  },
};

export default ticketApi;
