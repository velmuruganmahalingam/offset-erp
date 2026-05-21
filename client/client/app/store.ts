import { configureStore } from "@reduxjs/toolkit";
import { paperApi } from "./services/paperApi";
import { projectApi } from "./services/projectApi";
import { workflowApi } from "./services/workFlowApi";
export const store = configureStore({
    reducer:{
        [paperApi.reducerPath]:paperApi.reducer,
        [projectApi.reducerPath]:projectApi.reducer,
        [workflowApi.reducerPath]:workflowApi.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(
            paperApi.middleware,
            projectApi.middleware,
            workflowApi.middleware
        )
})

export type RootState = 
ReturnType<typeof store.getState>

export type AppDispatch =
typeof store.dispatch