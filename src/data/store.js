import { configureStore } from "@reduxjs/toolkit";

import newsReducer from "./newsSlice";
import partnersReducer from "./partnerSlice";
import designersReducer from "./designersSlice";

import { apiNewsSlice } from "./newsSlice2";

const store = configureStore({
  reducer: {
    news: newsReducer,
    partners: partnersReducer,
    designers:  designersReducer,
    [apiNewsSlice.reducerPath]: apiNewsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiNewsSlice.middleware), 
});

export default store;
