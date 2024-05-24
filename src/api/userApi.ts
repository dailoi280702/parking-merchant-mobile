import axiosClient from "./axiosClient";

const userApi = {
  getUserById: async (id: string) => {
    const res = await axiosClient.get(`/user/${id}`);
    return res;
  },
  checkDuplicatePhone: async (phoneNumber: any) => {
    const res = await axiosClient.post("/user/check-phone", {phone_number: phoneNumber });
    return res.data;
  },
  createUser: async (user: any) => {
    var body = {
      phone_number: user.phoneNumber,
      email: user.email,
      display_name: user.name,
      password: user.password
    }
    const res = await axiosClient.post("/user/create", body);
    return res;
  },

  updateUser: async (updatedUser: User) => {
    return await axiosClient.put(`/user/update/${updatedUser.id}`, updatedUser);
  },

  deleteUser: async (id: string) => {
    const res = await axiosClient.delete(`/user/${id}`);
    return res;
  },
};

export default userApi;
