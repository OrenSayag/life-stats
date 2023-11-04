import { ComponentPropsWithoutRef, FC } from "react";
import { classNames } from "../../../services/utilities.service";

interface Props extends ComponentPropsWithoutRef<"button"> {
  className?: string;
}

const Button: FC<Props> = ({ className, ...props }) => {
  return (
    <>
      <button className={classNames(className)} {...props} />
    </>
  );
};

export default Button;
