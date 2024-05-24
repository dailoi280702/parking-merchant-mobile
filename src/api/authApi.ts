import axiosClient from "./axiosClient";

const authApi = {
  login: ({ email, password }: any) => {
    const url = `/api/v1/employee/login`;
    return axiosClient.post(url, { email, password });
  },
};
export default authApi;
