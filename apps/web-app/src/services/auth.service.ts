import { SocialProviderLoginType } from "../types/auth.type";
import config from "../config";
import { GetServerSidePropsContext } from "next";
import { UserData } from "shared-types/shared.type";
import UserService from "./user.service";

class AuthService {
  public getLoginUrl(provider: SocialProviderLoginType) {
    const { API_HOST, GOOGLE_LOGIN_ENDPOINT } = config;
    if (provider === "google") {
      return `${API_HOST}${GOOGLE_LOGIN_ENDPOINT}`;
    }
  }

  public static routeGuardMiddleware = async (
    context: GetServerSidePropsContext,
    validateNotLoggedIn?: boolean
  ) => {
    const cookie = context.req.headers.cookie;

    let userData: UserData;

    try {
      userData = await UserService.getUserData(cookie);
    } catch (e) {
      if (validateNotLoggedIn) {
        return { props: {} };
      }
      return {
        redirect: {
          destination: "/login",
          permanent: true,
        },
      };
    }

    if (validateNotLoggedIn) {
      return {
        redirect: {
          destination: "/day",
          permanent: true,
        },
      };
    }

    return {
      props: {
        ...userData,
      },
    };
  };
}

export default AuthService;
