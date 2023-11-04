import { ComponentPropsWithoutRef, FC, useState } from "react";
import { classNames } from "../../../../services/utilities.service";
import { Note as INote } from "shared-types/shared.type";
import Controls from "./controls";
import Divider from "../../../atoms/Divider";
import Content from "./content";
import { useUpdateNote } from "../../../../services/note.service";
import QueryMessageListener from "../../../molecules/QueryMessageListener";
import { NEW_NOTE_NAME } from "../index";

interface Props extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  note: INote;
  onUnselectNote: () => void;
}

const Note: FC<Props> = ({ className, note, onUnselectNote, ...props }) => {
  const [editMode, setEditMode] = useState<boolean>(
    note.title === NEW_NOTE_NAME
  );
  const { mutate, error, reset, isSuccess } = useUpdateNote(note.date, () =>
    setEditMode(false)
  );
  const [noteData, setNoteData] = useState<INote>(note);
  const onSaveNote = () => {
    if (JSON.stringify(noteData) === JSON.stringify(note)) {
      return setEditMode(false);
    }
    mutate({
      rtl: noteData.rtl,
      content: noteData.content,
      title: noteData.title,
      id: noteData.objectId,
    });
  };
  const onToggleDir = () => setNoteData({ ...noteData, rtl: !noteData.rtl });

  return (
    <>
      <div
        className={classNames(className, "flex flex-col w-full flex-grow")}
        {...props}
      >
        <Controls
          setEditMode={() => setEditMode(true)}
          onBack={onUnselectNote}
          onSaveNote={onSaveNote}
          editMode={editMode}
          note={noteData}
          dir={noteData.rtl ? "rtl" : "ltr"}
          onToggleDir={onToggleDir}
          onChangeNoteData={setNoteData}
        />
        <Divider className={"my-4"} />
        <Content
          note={noteData}
          onChangeNoteData={setNoteData}
          editMode={editMode}
          className={"flex-grow"}
        />
        <QueryMessageListener
          errorMessage={error?.toString()}
          resetFn={reset}
        />
      </div>
    </>
  );
};

export default Note;
