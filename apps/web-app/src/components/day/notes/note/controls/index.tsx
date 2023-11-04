import { ComponentPropsWithoutRef, FC } from "react";
import { classNames } from "../../../../../services/utilities.service";
import { Note } from "shared-types/shared.type";
import Button from "../../../../ui/button";
import SaveIcon from "../../../../../assets/icons/day/save.svg";
import InfoIcon from "../../../../../assets/icons/day/info.svg";
import EditIcon from "../../../../../assets/icons/day/edit.svg";
import PreviousButton from "../../../../atoms/PreviousButton";
import Switch from "@mui/material/Switch";

interface Props extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  onBack: () => void;
  onSaveNote: () => void;
  editMode: boolean;
  setEditMode: () => void;
  note: Note;
  dir: "rtl" | "ltr";
  onToggleDir: () => void;
  onChangeNoteData: (data: Note) => void;
}

const Controls: FC<Props> = ({
  className,
  onBack,
  note,
  dir,
  onToggleDir,
  onChangeNoteData,
  editMode,
  onSaveNote,
  setEditMode,
  ...props
}) => {
  const onInfo = () => console.warn("onInfo not implemented yet");

  return (
    <>
      <div className={classNames(className, "flex flex-col gap-2")} {...props}>
        <div className={"flex justify-between items-center"}>
          <PreviousButton onClick={onBack} />
          <div className={"flex items-center gap-2"}>
            {editMode && (
              <div className={"flex items-center"}>
                <div>LTR</div>
                <Switch checked={dir === "rtl"} onChange={onToggleDir} />
                <div>RTL</div>
              </div>
            )}
            <Button onClick={onInfo}>
              <InfoIcon className={"fill-white hover:fill-success"} />
            </Button>
            <Button onClick={onSaveNote}>
              {editMode && (
                <SaveIcon className={"fill-white hover:fill-success"} />
              )}
            </Button>
            <Button onClick={setEditMode}>
              {!editMode && (
                <EditIcon className={"fill-white hover:fill-success"} />
              )}
            </Button>
          </div>
        </div>
        <div className={"flex items-center gap-2"}>
          {editMode && (
            <input
              onChange={(e) => {
                onChangeNoteData({ ...note, title: e.target.value });
              }}
              value={note.title}
              type={"text"}
              dir={dir}
              className={
                "flex-grow outline-none border-none bg-dark-200 p-2 rounded-md my-2"
              }
            />
          )}
          {!editMode && (
            <h2 className={"flex-grow text-3xl"} dir={dir}>
              {note.title}
            </h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Controls;
