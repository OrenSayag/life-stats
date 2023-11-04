import React from "react";
import { HeaderBarParams } from "../../types/component-params/app.type";
import AppLogo from "../../components/atoms/AppLogo";
import Burger from "../../components/atoms/Burger";
import UserAvatar from "../../components/atoms/UserAvatar";
import UtilitiesService from "../../services/utilities.service";
import { Dimensions } from "../../types/utilities.type";
import Divider from "../../components/atoms/Divider";

const APP_LOGO_DIMENSIONS: Dimensions = { width: 100, height: 10 };
const HeaderBar: React.FC<HeaderBarParams> = ({
  profilePicUrl,
  toggleDisplayMobileNavbar,
  isBurgerOpen,
}) => {
  const isMobileView = UtilitiesService.useIsMobileView();

  return (
    <>
      <div
        className={
          "flex justify-between items-center p-6 bg-dark-200 bg-opacity-40 shadow-3xl"
        }
      >
        <AppLogo dimensions={APP_LOGO_DIMENSIONS} />
        <div className={"flex gap-6 items-center"}>
          {isMobileView && (
            <Burger
              isOpen={isBurgerOpen}
              toggleDisplayMobileNavbar={toggleDisplayMobileNavbar}
            />
          )}
          <UserAvatar profilePicUrl={profilePicUrl} />
        </div>
      </div>
    </>
  );
};

export default HeaderBar;
