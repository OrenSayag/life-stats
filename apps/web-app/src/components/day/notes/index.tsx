import {
  ComponentPropsWithoutRef,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import UtilitiesService, {
  classNames,
} from "../../../services/utilities.service";
import Card from "../../atoms/Card";
import strings from "../../../assets/strings";

import AddIcon from "../../../assets/icons/Add.svg";
import Button from "../../ui/button";
import Divider from "../../atoms/Divider";
import { Note as INote } from "shared-types/shared.type";
import NotesList from "./notes-list";
import Note from "./note";
import { useAddNote } from "../../../services/note.service";
import QueryMessageListener from "../../molecules/QueryMessageListener";

interface Props extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  notes: INote[];
  date: string;
}

export const NEW_NOTE_NAME = "Untitled";

const createDefaultNote = (date: string): INote => ({
  rtl: false,
  content: "",
  objectId: UtilitiesService.createObjectId(),
  title: NEW_NOTE_NAME,
  creationTime: "",
  date: UtilitiesService.getDateString(
    "computer",
    UtilitiesService.dateStringToDate(date, "israel")
  ),
});

const Notes: FC<Props> = ({ className, notes, date, ...props }) => {
  const [selectedNote, setSelectedNote] = useState<INote | null>(null);

  const getComputerDate = useCallback(
    () =>
      UtilitiesService.getDateString(
        "computer",
        UtilitiesService.dateStringToDate(date, "israel")
      ),
    [date]
  );

  useEffect(() => {
    setSelectedNote(null);
  }, [date]);

  const { mutate, reset, isSuccess, error } = useAddNote(
    getComputerDate(),
    (note: INote) => setSelectedNote(note)
  );
  const onNewNote = () => mutate(createDefaultNote(date));
  const onUnselectNote = () => setSelectedNote(null);

  return (
    <>
      <Card
        className={classNames(
          "xl:w-1/2 w-full mt-6 mx-6 flex flex-col items-start gap-6 h-full min-h-[60vh] p-4 lg:p-12",
          className
        )}
        {...props}
      >
        {!selectedNote && (
          <>
            <div className={"flex justify-between w-full"}>
              <h1 className={"text-5xl"}>{strings.notes.LIST_TITLE}</h1>
              <Button onClick={onNewNote}>
                <AddIcon className={"hover:fill-success"} fill={"#fff"} />
              </Button>
            </div>
            <Divider />
            <NotesList
              date={getComputerDate()}
              setSelectedNote={setSelectedNote}
              notes={notes}
            />
          </>
        )}
        {selectedNote && (
          <Note note={selectedNote} onUnselectNote={onUnselectNote} />
        )}
        <QueryMessageListener
          errorMessage={error?.toString()}
          resetFn={reset}
        />
      </Card>
    </>
  );
};

export default Notes;
