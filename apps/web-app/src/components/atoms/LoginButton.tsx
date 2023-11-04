import Image from "next/image";
import React from "react";
import { SocialProviderLoginType } from "../../types/auth.type";
import { useRouter } from "next/router";
import AuthService from "../../services/auth.service";

import Google from "../../assets/icons/Google.svg";

export const LoginButton: React.FC<{
  provider: SocialProviderLoginType;
}> = ({ provider }) => {
  const router = useRouter();
  const authService = new AuthService();
  const loginUrl = authService.getLoginUrl(provider) as string;
  const onClick = () => {
    router.push(loginUrl);
  };
  if (provider === "google") {
    return (
      <button onClick={onClick}>
        <Google width={80} height={80} />
      </button>
    );
  }
  return null;
};

export default LoginButton;
