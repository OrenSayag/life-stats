import { ComponentPropsWithoutRef, FC } from "react";
import { classNames } from "../../../services/utilities.service";

interface Props extends ComponentPropsWithoutRef<"button"> {
  className?: string;
}

const NoteModeToggle: FC<Props> = ({ className, ...props }) => {
  return (
    <>
      <button className={classNames(className)} {...props}>
        Hello World from NoteModeToggle
      </button>
    </>
  );
};

export default NoteModeToggle;
