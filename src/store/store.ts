import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from "@redux-saga/core";
import logger from "redux-logger";

import rootsaga from "store/root-saga";
const sagaMiddleware = createSagaMiddleware();
const middleware: any[] = [sagaMiddleware];


const isDev = process.env.NODE_ENV === "development";

if (isDev) middleware.push(logger);

export const store = configureStore({
    reducer: {
    
    },
    devTools: isDev,
    middleware: middleware,
  });
  
  sagaMiddleware.run(rootsaga);
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  