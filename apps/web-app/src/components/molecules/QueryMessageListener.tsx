import { ComponentPropsWithoutRef, FC, useEffect } from "react";
import { classNames } from "../../services/utilities.service";
import FloatingMessage from "./FloatingMessage";

interface Props extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  errorMessage?: string;
  successMessage?: string;
  resetFn?: () => void;
}

const QueryMessageListener: FC<Props> = ({
  className,
  successMessage,
  errorMessage,
  resetFn,
  ...props
}) => {
  useEffect(() => {
    if (errorMessage || successMessage) {
      setTimeout(() => {
        resetFn?.();
      }, 5_000);
    }
  }, [errorMessage, successMessage, resetFn]);
  return (
    <>
      <div className={classNames(className)} {...props}>
        {errorMessage && (
          <FloatingMessage message={errorMessage} type={"error"} />
        )}
        {successMessage && (
          <FloatingMessage message={successMessage} type={"success"} />
        )}
      </div>
    </>
  );
};

export default QueryMessageListener;
