import axiosClient from "./axiosClient";

type ParkingLotReq = {
  name: string | null;
  lat?: number;
  long?: number;
  distance?: number;
};

const parkingLotApi = {
  getAll: async (params: ParkingLotReq) => {
    var url = "/parking-lot/get-list?";
    if (params.name) {
      url += `name=${params.name}&`;
    }
    if (params.lat && params.long && params.distance) {
      url += `lat=${params.lat}&long=${params.long}&distance=${params.distance}`;
    }
    return await axiosClient.get(url);
  },
  getOne: async (idParkingLot: string) => {
    return await axiosClient.get(`/parking-lot/get-one/${idParkingLot}`);
  },
};

export default parkingLotApi;
