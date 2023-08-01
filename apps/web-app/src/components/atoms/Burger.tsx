import React from "react";
import { BurgerParams } from "../../types/component-params/app.type";
import BurgerIcon from "../../../public/icons/Burger.svg";

const Burger: React.FC<BurgerParams> = ({
  toggleDisplayMobileNavbar,
  isOpen,
}) => {
  return (
    <button onClick={toggleDisplayMobileNavbar}>
      <BurgerIcon
        alt={"Burger"}
        height={40}
        width={40}
        fill={isOpen ? "green" : "white"}
      />
    </button>
  );
};

export default Burger;
