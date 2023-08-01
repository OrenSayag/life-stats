import React from "react";
import { LayoutParams } from "../../types/component-params/app.type";
import HeaderBar from "../../components/organisms/HeaderBar";
import AppService from "../../services/app.service";
import UtilitiesService from "../../services/utilities.service";
import NavBar from "../../components/organisms/NavBar";
import PageTitle from "../../components/molecules/PageTitle";

const Layout: React.FC<LayoutParams> = ({ profilePicUrl, view }) => {
  const { toggleMobileNavbar, displayMobileNavbar } =
    AppService.useDisplayMobileNavbar();
  const isMobileView = UtilitiesService.useIsMobileView();
  return (
    <div className={"font-abel flex flex-col h-screen"}>
      <HeaderBar
        profilePicUrl={profilePicUrl}
        isBurgerOpen={displayMobileNavbar}
        toggleDisplayMobileNavbar={toggleMobileNavbar}
      />
      {isMobileView && displayMobileNavbar && <NavBar />}
      {isMobileView && (
        <div className={displayMobileNavbar ? "hidden" : ""}>
          <PageTitle />
        </div>
      )}
      {isMobileView && (
        <div className={displayMobileNavbar ? "hidden" : ""}>{view}</div>
      )}
      {!isMobileView && (
        <div className={"flex grow"}>
          <div className={"w-5/6"}>{view}</div>
          <div className={"w-1/6 grow  border-l-[.2px] border-white"}>
            <NavBar />
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
