import { ComponentPropsWithoutRef, FC } from "react";
import { classNames } from "../../../../../../services/utilities.service";
import { MDEditor } from "react-markdown-rtl";
import { Note } from "shared-types/shared.type";

interface Props extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  note: Note;
  onChangeNoteData: (data: Note) => void;
}

const Form: FC<Props> = ({ className, note, onChangeNoteData, ...props }) => {
  return (
    <>
      <div className={classNames(className, "mt-4 h-full")} {...props}>
        <MDEditor
          isRtl={note.rtl}
          value={note.content}
          className={
            "w-full h-96 bg-dark-200 outline-none rounded-md p-2 resize-none"
          }
          onChange={(e) =>
            onChangeNoteData({ ...note, content: e.target.value })
          }
        />
      </div>
    </>
  );
};

export default Form;
