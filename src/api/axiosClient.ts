// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// import { Alert } from "react-native";
import Config from "@src/config";

const c = () => {
  console.log(Config);
  return axios.create({
    baseURL: Config.API_BASE_URL + "/api/v1",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const axiosClient = c();

// axiosClient.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem("accessToken");
//   if (token) {
//     config.headers["x-access-token"] = JSON.parse(token);
//   }
//   const userID = await AsyncStorage.getItem("idUser");
//   if (userID) {
//     config.headers["x-user-id"] = `${userID}`;
//   }
//   return config;
// });
//
// axiosClient.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     const originalConfig = err.config;
//     if (
//       originalConfig &&
//       originalConfig.url !== "/api/v1/user/login" &&
//       err.response
//     ) {
//
//       // Access Token was expired
//       if (err.response.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true;
//
//         try {
//           const rs = await axiosClient.post("/auths/refreshtoken", {
//             refreshToken: await AsyncStorage.getItem("refreshToken"),
//           });
//
//           const { accessToken } = rs.data;
//
//           if (accessToken) {
//             await AsyncStorage.setItem(
//               "accessToken",
//               JSON.stringify(accessToken)
//             );
//           }
//
//           // location.href = "/";
//           return axiosClient(originalConfig);
//         } catch (_error) {
//           return Promise.reject(_error);
//         }
//       }
//
//       // Refresh Token was expired
//       if (err.response.status === 403) {
//         Alert.alert("Your session has been expired. Please log in again!");
//         await AsyncStorage.clear();
//       }
//     }
//     return Promise.reject(err);
//   }
// );

export default axiosClient;
