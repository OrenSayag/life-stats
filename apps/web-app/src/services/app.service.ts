import UtilitiesService from "../services/utilities.service";
import { useState } from "react";
import { DisplayMobileNavbarControl } from "../types/app.type";
import { useRouter } from "next/router";

class AppService {
  public static redirectNotFound() {}

  public static useDisplayMobileNavbar = (): DisplayMobileNavbarControl => {
    const isMobileScreen = UtilitiesService.useIsMobileView();
    const [displayMobileNavbar, setDisplayMobileNavbar] =
      useState<boolean>(false);
    const toggleMobileNavbar = () =>
      setDisplayMobileNavbar(!displayMobileNavbar);
    if (!isMobileScreen) {
      return { displayMobileNavbar: false, toggleMobileNavbar };
    }
    return { displayMobileNavbar, toggleMobileNavbar };
  };

  public static useIsNavBarPageLinkSelected = (pageName: string): boolean => {
    const router = useRouter();
    return router.pathname.split("/")[1] === pageName;
  };

  public static usePageName = (): string => {
    const router = useRouter();
    return UtilitiesService.capitalizeFirstLetter(
      router.pathname.replace("/", "")
    );
  };
}

export default AppService;
