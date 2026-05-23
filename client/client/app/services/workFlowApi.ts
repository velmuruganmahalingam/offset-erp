import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const workflowApi = createApi({
  reducerPath: "workflowApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4001",
    credentials: "include",
  }),

  tagTypes: ["workflow"],

  endpoints: (builder) => ({

    getSystemAssignQueue:
      builder.query<any, void>({
        query: () => "/workflow/system-assign",

        providesTags: ["workflow"],
      }),

    assignSystem:
      builder.mutation({
        query: ({ id, data }) => ({
          url: `/workflow/system-assign/${id}/assign`,
          method: 'PATCH',
          body: data,
        }),

        invalidatesTags: ['workflow']
      })

  }),
});

export const {
  useGetSystemAssignQueueQuery,
  useAssignSystemMutation,
} = workflowApi;