import React from "react";
import { CardParams } from "../../types/app.type";

const Card: React.FC<CardParams> = ({ className, children }) => {
  return (
    <div
      className={["rounded-lg bg-secondary", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
};

export default Card;
