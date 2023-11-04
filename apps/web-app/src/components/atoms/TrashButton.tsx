import React from "react";
import TrashIcon from "../../assets/icons/Trash.svg";
import { Dimensions } from "../../types/utilities.type";

const DEFAULT_DIMENSIONS = 30;

const TrashButton: React.FC<{
  onClick: () => void;
  className?: string;
  fill?: string;
  dimension?: Dimensions;
}> = ({ onClick, className, fill, dimension }) => {
  return (
    <button onClick={onClick} className={className}>
      <TrashIcon
        fill={fill}
        height={dimension ? dimension.height : DEFAULT_DIMENSIONS}
        width={dimension ? dimension.width : DEFAULT_DIMENSIONS}
      />
    </button>
  );
};

export default TrashButton;
