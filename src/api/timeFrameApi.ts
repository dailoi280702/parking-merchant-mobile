import axiosClient from "./axiosClient";

const timeFrameApi = {
  getAll: async (idParkingLot: any) => {
    var url = `/time-frame/get-all?parkingLotId=${idParkingLot}`;
    const res = await axiosClient.get(url);
    return res;
  },
};

export default timeFrameApi;
