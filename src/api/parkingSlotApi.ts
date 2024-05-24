import axiosClient from "./axiosClient";

const parkingSlotApi = {
  getAvailableSlots: async (start: any, end: any, idParkingLot: string) => {
    var url = `/parking-slot/available?`;
    if (idParkingLot) {
      url += `parkingLotId=${idParkingLot}&`;
    }
    if (start && end) {
      url += `start=${start}&end=${end}`;
    }
    const res = await axiosClient.get(url);
    return res;
  },
};

export default parkingSlotApi;
