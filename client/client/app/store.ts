import { configureStore } from "@reduxjs/toolkit";
import { paperApi } from "./services/paperApi";
import { projectApi } from "./services/projectApi";
import { workflowApi } from "./services/workFlowApi";
import { proofApi } from "./services/proofApi";
import { setmakeApi } from "./services/setmakeApi";
export const store = configureStore({
    reducer:{
        [paperApi.reducerPath]:paperApi.reducer,
        [projectApi.reducerPath]:projectApi.reducer,
        [workflowApi.reducerPath]:workflowApi.reducer,
        [proofApi.reducerPath]:proofApi.reducer,
        [setmakeApi.reducerPath]:setmakeApi.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(
            paperApi.middleware,
            projectApi.middleware,
            workflowApi.middleware,
            proofApi.middleware,
            setmakeApi.middleware
        )
})

export type RootState = 
ReturnType<typeof store.getState>

export type AppDispatch =
typeof store.dispatch