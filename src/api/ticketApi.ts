import axiosClient from "./axiosClient";

const ticketApi = {
  create: async (data: any) => {
    const res = await axiosClient.post("/ticket/create", data);
    return res.data;
  },
  cancel: async (idTicket: any) => {
    const res = await axiosClient.put("/ticket/cancel", { ticketId: idTicket });
    return res.data;
  },
  getAllByIdUser: async (idUser: string, state: string) => {
    var url = `/ticket/get-all?userId=${idUser}`;
    if (state) {
      url += `&state=${state}`;
    }
    const res = await axiosClient.get(url);
    return res.data;
  },
  extendTicket: async (data: any) => {
    const res = await axiosClient.post("/ticket/extend", data);
    return res.data;
  },
  getOneWithExtend: async (idTicket: any) => {
    const res = await axiosClient.get(
      "/ticket/get-one-with-extend/" + idTicket,
    );
    return res.data;
  },
};

export default ticketApi;
