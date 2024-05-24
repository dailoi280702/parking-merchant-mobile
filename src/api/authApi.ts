import axiosClient from "./axiosClient";

const authApi = {
  signInAccount: async (username: string, password: string) => {
    const res = await axiosClient.post("/user/login", {
      user_name: username,
      password,
    });
    return res;
  },
  resetPassword: async (newPassword: string, phoneNumber: string) => {
    return await axiosClient.post("/user/reset-password", {
      password: newPassword,
      user_name: phoneNumber,
    });
  },
  sendOtp: async (phoneNumber: string) => {
    const res = await axiosClient.post("/user/send-otp", {
      phone_number: phoneNumber,
    });
    return res;
  },
  verifyOtp: async (phoneNumber: string, otp: string) => {
    return await axiosClient.post("/user/verify-otp", {
      phone_number: phoneNumber,
      opt: otp,
    });
  },
};
export default authApi;
