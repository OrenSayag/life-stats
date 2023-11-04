import {
  ComponentPropsWithoutRef,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Note } from "shared-types/shared.type";
import { classNames } from "../../../../services/utilities.service";
import NoteListItem from "./notes-list-item";
import { useDeleteNote } from "../../../../services/note.service";
import QueryMessageListener from "../../../molecules/QueryMessageListener";
import Popup from "../../../ui/popup";
import Button from "../../../ui/button";

interface Props extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  notes: Note[];
  setSelectedNote: (note: Note) => void;
  date: string;
}

const NotesList: FC<Props> = ({
  className,
  notes,
  setSelectedNote,
  date,
  ...props
}) => {
  const { mutate, reset, error } = useDeleteNote(date);
  const [itemStagedForDelete, setItemStagedForDelete] = useState<string>(null);
  useEffect(() => {}, [itemStagedForDelete]);
  const deleteItem = useCallback(() => {
    mutate({ id: itemStagedForDelete });
    setItemStagedForDelete(null);
  }, [itemStagedForDelete]);
  const cancelDelete = () => {
    setItemStagedForDelete(null);
  };
  return (
    <>
      <div
        className={classNames(className, "w-full flex flex-col gap-2")}
        {...props}
      >
        {notes.map((n) => (
          <NoteListItem
            onSelect={() => setSelectedNote(n)}
            onDelete={() => setItemStagedForDelete(n.objectId)}
            key={n.objectId}
            note={n}
          />
        ))}
        <QueryMessageListener
          errorMessage={error?.toString()}
          resetFn={reset}
        />
        {itemStagedForDelete && (
          <Popup>
            <div>
              <div>Are you sure you want to delete this note?</div>
              <div className={"flex justify-between items-center mt-24"}>
                <Button
                  className={"text-error p-1 px-2 border-2 rounded-md w-16"}
                  onClick={deleteItem}
                >
                  Yes
                </Button>
                <Button
                  className={"p-1 px-2 border-2 rounded-md w-16"}
                  onClick={cancelDelete}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Popup>
        )}
      </div>
    </>
  );
};

export default NotesList;
