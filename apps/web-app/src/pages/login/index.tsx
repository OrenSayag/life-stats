import AppLogo from "../../components/atoms/AppLogo";
import LoginButton from "../../components/atoms/LoginButton";
import AuthService from "../../services/auth.service";
import { GetServerSidePropsContext } from "next";

export default function LoginView() {
  return (
    <div
      className={
        "flex min-h-screen flex-col items-center justify-center gap-48 p-24 bg-primary"
      }
    >
      <AppLogo />
      <LoginButton provider="google" />
    </div>
  );
}

export const getServerSideProps = (context: GetServerSidePropsContext) =>
  AuthService.routeGuardMiddleware(context, true);
