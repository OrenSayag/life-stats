import { ComponentPropsWithoutRef, FC } from "react";
import { classNames } from "../../../../../services/utilities.service";
import { Note } from "shared-types/shared.type";
import Form from "./form";
import Display from "./display";

interface Props extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  note: Note;
  onChangeNoteData: (data: Note) => void;
  editMode: boolean;
}

const Content: FC<Props> = ({
  className,
  note,
  editMode,
  onChangeNoteData,
  ...props
}) => {
  return (
    <>
      <div className={classNames(className)} {...props}>
        {editMode && (
          <Form
            className={"flex-grow"}
            note={note}
            onChangeNoteData={onChangeNoteData}
          />
        )}
        {!editMode && <Display note={note} />}
      </div>
    </>
  );
};

export default Content;
