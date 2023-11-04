import { ComponentPropsWithoutRef, FC } from "react";
import { classNames } from "../../services/utilities.service";

interface Props extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  message: string;
  type: "error" | "success" | "warning";
}

const FloatingMessage: FC<Props> = ({ className, message, type, ...props }) => {
  return (
    <>
      <div
        className={classNames(
          className,
          type === "error" && "bg-error",
          type === "success" && "bg-success",
          "p-2 rounded-md fixed bottom-2 left-2 text-white bg-opacity-70"
        )}
        {...props}
      >
        {message}
      </div>
    </>
  );
};

export default FloatingMessage;
