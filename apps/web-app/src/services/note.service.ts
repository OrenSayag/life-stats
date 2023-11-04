import {
  CreateNoteRequestBody,
  UpdateNoteRequestBody,
} from "../types/note.type";
import { backendApi } from "./api";
import { useMutation, useQueryClient } from "react-query";
import { DayViewDateData } from "../types/day.type";
import { Note } from "shared-types/shared.type";

const addNote = (params: CreateNoteRequestBody) =>
  backendApi.post("note", params);
const updateNote = (params: UpdateNoteRequestBody & { id: string }) =>
  backendApi.patch(`note/${params.id}`, params);
const deleteNote = (params: { id: string }) =>
  backendApi.delete(`note/${params.id}`);

export const useAddNote = (date, successCb: (note: Note) => void) => {
  const queryClient = useQueryClient();
  const queryKey = ["day-view-data", date];

  return useMutation(["day-view-data", date], addNote, {
    onMutate: async (requestBody: CreateNoteRequestBody) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const dayViewData = await queryClient.getQueryData<DayViewDateData>(
        queryKey
      );

      if (dayViewData) {
        const { notes } = dayViewData;
        const newNote = {
          ...requestBody,
          creationTime: new Date().toISOString(),
        };
        notes.push(newNote);
        queryClient.setQueriesData<DayViewDateData>(
          queryKey,
          () => dayViewData
        );
        successCb(newNote);
      }

      return { dayViewData };
    },
  });
};

export const useUpdateNote = (date, successCb: () => void) => {
  const queryClient = useQueryClient();
  const queryKey = ["day-view-data", date];

  return useMutation(["day-view-data", date], updateNote, {
    onSuccess: () => successCb(),
    onMutate: async (requestBody: UpdateNoteRequestBody & { id: string }) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const dayViewData = await queryClient.getQueryData<DayViewDateData>(
        queryKey
      );

      if (dayViewData) {
        const { title, rtl, id, content } = requestBody;
        queryClient.setQueriesData<DayViewDateData>(queryKey, () => ({
          ...dayViewData,
          notes: dayViewData.notes.map((note) => {
            if (note.objectId !== id) {
              return note;
            }
            return { ...note, title, rtl, content };
          }),
        }));
      }

      return { dayViewData };
    },
  });
};
export const useDeleteNote = (date) => {
  const queryClient = useQueryClient();
  const queryKey = ["day-view-data", date];

  return useMutation(["day-view-data", date], deleteNote, {
    onMutate: async (requestBody: { id: string }) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const dayViewData = await queryClient.getQueryData<DayViewDateData>(
        queryKey
      );

      if (dayViewData) {
        const { id } = requestBody;
        queryClient.setQueriesData<DayViewDateData>(queryKey, () => ({
          ...dayViewData,
          notes: dayViewData.notes.filter((note) => note.objectId !== id),
        }));
      }

      return { dayViewData };
    },
  });
};
