import React from "react";
import TargetIcon from "../../../public/icons/Target.svg";

export const DEFAULT_TARGET_ICON_DIMENSION = 30;

const TargetButton: React.FC<{ onClick: () => void; targetMode: boolean }> = ({
  onClick,
  targetMode,
}) => {
  return (
    <button onClick={onClick}>
      <TargetIcon
        fill={targetMode ? "#D32F2F" : "#fff"}
        height={DEFAULT_TARGET_ICON_DIMENSION}
        width={DEFAULT_TARGET_ICON_DIMENSION}
      />
    </button>
  );
};

export default TargetButton;
