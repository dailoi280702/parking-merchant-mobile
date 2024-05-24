import axiosClient from "./axiosClient";

const vehicleApi = {
  getById: async (idVehicle: string) => {
    const res = await axiosClient.get(`/vehicle/get-one/${idVehicle}`);
    return res;
  },
  getByIdUser: async (idUser: string) => {
    return await axiosClient.get(`/vehicle/get-list?user_id=${idUser}`);
  },
};

export default vehicleApi;
