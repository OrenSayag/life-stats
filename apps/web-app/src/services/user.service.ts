import axios from "axios";
import config from "../config";
import { UserData } from "shared-types/shared.type";

class UserService {
  public static async getUserData(cookie?: string): Promise<UserData> {
    const res = await axios.get(config.API_HOST + "user/data", {
      withCredentials: true,
      headers: {
        cookie,
      },
    });
    return res?.data.data as UserData;
  }
}

export default UserService;
