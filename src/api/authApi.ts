import axiosClient from "./axiosClient";

const authApi = {
  login: ({ email, password }: any) => {
    const url = `/employee/login`;
    return axiosClient.post(url, { email, password });
  },
};
export default authApi;
