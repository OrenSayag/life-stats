import React from "react";
import Image from "next/image";
import { BurgerParams } from "../../types/component-params/app.type";
import BurgerIcon from "../../assets/icons/Burger.svg";

const Burger: React.FC<BurgerParams> = ({
  toggleDisplayMobileNavbar,
  isOpen,
}) => {
  return (
    <button onClick={toggleDisplayMobileNavbar}>
      <BurgerIcon width={40} height={40} fill={isOpen ? "green" : "white"} />
    </button>
  );
};

export default Burger;
