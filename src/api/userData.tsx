import { auth } from "../utils/firebaseConfig";
import firebaseAxios from "../utils/axiosClient";
export const StoreUserData = async (data: any) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No logged-in user");
    const response = await firebaseAxios.put(`/Users/${user.uid}.json`, data);
    return response.data;
  } catch (error: any) {
    alert(error.message);
  }
};

export const FetchUserData = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No logged-in user");
    if (!user.uid) throw new Error("No user ID provided!");
    const { data } = await firebaseAxios.get(`/Users/${user.uid}.json`);
    return data;
  } catch (error: any) {
    alert(error.message);
  }
};
