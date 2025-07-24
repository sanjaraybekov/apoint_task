import api from ".";

export const signIn = async (data: object) => {
  return await api.post("/hr/user/sign-in?include=token", data);
};
