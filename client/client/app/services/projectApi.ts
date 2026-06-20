import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectApi = createApi({
    reducerPath: 'projectApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'process.env.NEXT_PUBLIC_API_URL',
        credentials: 'include',
    }),
    tagTypes: ["Project"],
    endpoints: (builder) => ({
        getProject:
            builder.query<any, void>({
                query: () => '/project',
                providesTags: ["Project"],
            }),

        getProjectById:
            builder.query({
                query: (id) => `/project/${id}`,
            }),

        createProject: builder.mutation<any, any>({
            query: (data) => ({
                url: "/project",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Project"],
        }),

        updateProjectById:
            builder.mutation<any, { id: number | string; data: any }>({
                query: ({ id, data }) => ({
                    url: `/project/update/${id}`,
                    method: 'PATCH',
                    body: data
                }),
                invalidatesTags: ["Project"],
            }),

        recoverWorkflow:
            builder.mutation({
                query: () => ({
                    url: '/workflow/seed',
                    method: 'POST'
                })
            })
    })
})


export const { 
    useGetProjectQuery, 
    useGetProjectByIdQuery, 
    useCreateProjectMutation, 
    useUpdateProjectByIdMutation, 
    useRecoverWorkflowMutation 
} = projectApi