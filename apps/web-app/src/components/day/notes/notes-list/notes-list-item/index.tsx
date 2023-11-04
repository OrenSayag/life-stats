import { ComponentPropsWithoutRef, FC } from "react";
import { Note } from "shared-types/shared.type";
import {
  classNames,
  isoToTimeString,
} from "../../../../../services/utilities.service";
import Button from "../../../../ui/button";
import TrashButton from "../../../../atoms/TrashButton";

interface Props extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  note: Note;
  onSelect: () => void;
  onDelete: () => void;
}

const NoteListItem: FC<Props> = ({
  className,
  note,
  onSelect,
  onDelete,
  ...props
}) => {
  return (
    <>
      <div className={classNames(className, "flex gap-3")} {...props}>
        <Button
          onClick={onSelect}
          className={
            "flex justify-between items-center flex-grow rounded-lg p-4 bg-dark-300 bg-opacity-10 hover:bg-opacity-20"
          }
        >
          <h3 className={"text-2xl"}>{note.title}</h3>
          <h5>{isoToTimeString(note.creationTime)}</h5>
        </Button>
        <TrashButton
          className={"fill-white hover:fill-error"}
          onClick={onDelete}
        />
      </div>
    </>
  );
};

export default NoteListItem;
