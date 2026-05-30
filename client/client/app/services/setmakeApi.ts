import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const setmakeApi = createApi({
    reducerPath:"setmakeApi",
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:4001/setmake',
    }),
    tagTypes:["setmakeApi"],
    endpoints:(builder)=>({
        getSetMakeQueue:builder.query<any,void>({
            query:()=>`/merge`,
            providesTags:['setmakeApi']
        })
    })


})
export const {useGetSetMakeQueueQuery} = setmakeApi