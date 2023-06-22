import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = "http://localhost:9000";

export const noteSlice = createApi({
  // Set Up
  reducerPath: "notes",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),

  tagTypes: ["notes"],
  // Endpoints
  endpoints: (builder) => ({
    fetchNotes: builder.query({
      query: () => ({
        url: "notes",
        method: "GET"
      }),
      providesTags: ["notes"]
    }),

    addNote: builder.mutation({
      query: (newNote) => ({
        url: "create_note",
        method: "POST",
        body: newNote
      }),
      invalidatesTags: ["notes"],
    }),

    updateNote: builder.mutation({
        query: ({id, updatedNote}) => ({
            url: `update_note/${id}`,
            method: "PUT",
            body: updatedNote
        }),
        invalidatesTags: ["notes"],
    }),

    deleteNote: builder.mutation({
      query: ({id}) => ({
        url: `delete_note/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["notes"],
    })

  })
});

export const { useFetchNotesQuery, useAddNoteMutation, useUpdateNoteMutation, useDeleteNoteMutation } = noteSlice;

export default noteSlice.reducer;