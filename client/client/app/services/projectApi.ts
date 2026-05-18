import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectApi = createApi({
    reducerPath:'projectApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:4001',
        credentials: 'include',
    }),
    endpoints:(builder)=>({
        getProject:
        builder.query<any,void>({
            query:()=>'/project'
        })
    })
})
export const {useGetProjectQuery} = projectApi