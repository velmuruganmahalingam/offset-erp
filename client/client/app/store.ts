import { configureStore } from "@reduxjs/toolkit";
import { paperApi } from "./services/paperApi";
import { projectApi } from "./services/projectApi";

export const store = configureStore({
    reducer:{
        [paperApi.reducerPath]:paperApi.reducer,
        [projectApi.reducerPath]:projectApi.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(
            paperApi.middleware,
            projectApi.middleware
        )
})

export type RootState = 
ReturnType<typeof store.getState>

export type AppDispatch =
typeof store.dispatch