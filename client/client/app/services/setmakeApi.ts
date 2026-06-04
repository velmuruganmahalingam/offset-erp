import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const setmakeApi = createApi({
    reducerPath:"setmakeApi",
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:4001/setmake',
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
        })
    })


})
export const {useGetSetMakeQueueQuery,useUpdateSetMakeMutation} = setmakeApi