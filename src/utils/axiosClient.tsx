import axios from "axios";
import { auth } from "./firebaseConfig";

const firebaseAxios = axios.create({
  baseURL:
    "https://task-manager-116de-default-rtdb.europe-west1.firebasedatabase.app/",
});

firebaseAxios.interceptors.request.use(async (config) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No logged-in user");
    const token = await user.getIdToken();
    if (!config.params) {
      config.params = {};
    }
    config.params.auth = token; // Add auth token as query param
    return config;
  } catch (error) {
    return Promise.reject(error);
  }
});

export default firebaseAxios;
