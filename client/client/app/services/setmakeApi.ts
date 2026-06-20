import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const setmakeApi = createApi({
    reducerPath:"setmakeApi",
    baseQuery:fetchBaseQuery({
        baseUrl:'process.env.NEXT_PUBLIC_API_URL',
        credentials:'include'
    }),
    tagTypes:["setMake"],
    endpoints:(builder)=>({
        getSetMakeQueue:builder.query<any,void>({
            query:()=>`/merge`,
            providesTags:['setMake']
        }),

        updateSetMake:builder.mutation({
            query:({id})=>({
            url:`/${id}/set-make`,
            method:'PATCH'
        }),
        invalidatesTags:["setMake"]
        }),
        getJobList:builder.query<any,void>({
            query:()=>({
                url:`/job-list`,
                providesTags:['setMake']
            })
        })
    })


})
export const {useGetSetMakeQueueQuery,useUpdateSetMakeMutation,useGetJobListQuery} = setmakeApi