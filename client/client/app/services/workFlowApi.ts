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

    getWorkFlow:
      builder.query<any, void>({
        query: () => "/workflow/system-assign",

        providesTags: ["workflow"],
      }),

  }),
});

export const {
  useGetWorkFlowQuery,
} = workflowApi;