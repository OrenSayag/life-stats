import { ComponentPropsWithoutRef, FC } from "react";
import { classNames } from "../../../services/utilities.service";

interface Props extends ComponentPropsWithoutRef<"div"> {
  className?: string;
}

const Popup: FC<Props> = ({ className, ...props }) => {
  return (
    <>
      <div
        className={classNames(
          "h-screen w-full bg-black bg-opacity-90 flex items-center justify-center fixed top-0 left-0  rounded-md",
          className
        )}
        {...props}
      >
        {props.children}
      </div>
    </>
  );
};

export default Popup;
