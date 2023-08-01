import React from "react";
import NavBarPageLink from "../../components/atoms/NavBarPageLink";

export const pages = {
  DAY: {},
  FORM: {},
  ANALYTICS: {},
  FINANCE: {},
  CALENDAR: {},
  REPORTS: {},
  SETTINGS: {},
};

const NavBar: React.FC = () => {
  return (
    <ul className={"pt-6 p-2 pl-8"}>
      {Object.keys(pages).map((p) => (
        <li key={p} className={"my-6"}>
          <NavBarPageLink pageName={p.toLowerCase()} />
        </li>
      ))}
    </ul>
  );
};

export default NavBar;
