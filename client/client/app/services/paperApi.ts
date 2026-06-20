import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paperApi = createApi({
    reducerPath:'paperApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'process.env.NEXT_PUBLIC_API_URL',
    }),
    endpoints:(builder)=>({

        getSizes:
            builder.query<any, void>({
                query:()=>`/paper`
            }),

        getOptionBySize:
           builder.query<any, number>({
            query:(sizeId)=>`/paper/option/${sizeId}`
           })
    })
})

export const {
    useGetSizesQuery,
    useGetOptionBySizeQuery,
} = paperApi