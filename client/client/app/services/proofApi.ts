import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const proofApi = createApi({
    reducerPath: "proofApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4001',
        credentials: 'include'
    }),
    tagTypes: ["proofApi"],
    endpoints: (builder) => ({

        getApprovalQueue:builder.query<any,void>({
            query:() => "/proof/approval-queue",
            providesTags:["proofApi"]
        }),

        sendApproval:builder.mutation({
            query:({id}) =>({
            url:`/proof/${id}/send-for-approval`,
            method:'PATCH',
        }),
            invalidatesTags:["proofApi"]
        }),

        getProofQueue: builder.query<any, void>({
            query: () => "/proof/queue",
            providesTags: ["proofApi"],
        }),

        getProofById:builder.query({
            query:(workflowId) =>`/proof/${workflowId}`,
            providesTags:['proofApi']
        }),

        updateCorrection:builder.mutation({
            query:({id,data})=>({
                url:`/proof/${id}/correction`,
                method:'PATCH',
                body:data
            }),
            invalidatesTags:['proofApi']
        }),

        finalApprove:builder.mutation({
            query:({id,data})=>({
               url:'/proof/${id}/final-approve',
               method:"PATCH",
               body:data 
            }),
            invalidatesTags:["proofApi"]
        })

    })
})

export const {
    useGetProofQueueQuery,
    useUpdateCorrectionMutation,
    useFinalApproveMutation,
    useGetApprovalQueueQuery,
    useSendApprovalMutation,
    useGetProofByIdQuery
} = proofApi