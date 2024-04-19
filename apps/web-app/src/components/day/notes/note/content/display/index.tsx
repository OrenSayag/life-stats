import { ComponentPropsWithoutRef, FC } from "react";
import {
  classNames,
  isoToTimeString,
} from "../../../../../../services/utilities.service";
import { MDRenderer } from "react-markdown-rtl/src";
import { Note } from "shared-types/shared.type";

interface Props extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  note: Note;
}

const Display: FC<Props> = ({ className, note, ...props }) => {
  return (
    <>
      <div className={classNames(className)} {...props}>
        <MDRenderer dir={note.rtl ? "rtl" : "ltr"} content={note.content} />
        <h5 className={"mt-12"}>{isoToTimeString(note.creationTime)}</h5>
      </div>
    </>
  );
};

export default Display;
