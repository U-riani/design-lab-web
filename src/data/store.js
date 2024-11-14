import { configureStore } from "@reduxjs/toolkit";

import newsReducer from "./newsSlice";
import partnersReducer from "./partnerSlice";
import designersReducer from "./designersSlice";
import { apiVisitsSlice } from "./visitsSlice";

import { apiNewsSlice } from "./newsSlice2";
import { heroApiSlice } from "./heroSlice";
import { partnersApiSlice } from "./partnersSlice";
import { designersApiSlice } from "./designersSlice2";
import { projectsApiSlice } from "./projectsSlice.js";
import { projectContentApiSlice } from "./projectContentSlice.js";

const store = configureStore({
  reducer: {
    news: newsReducer,
    partners: partnersReducer,
    designers: designersReducer,
    [apiNewsSlice.reducerPath]: apiNewsSlice.reducer,
    [apiVisitsSlice.reducerPath]: apiVisitsSlice.reducer,
    [partnersApiSlice.reducerPath]: partnersApiSlice.reducer,
    [heroApiSlice.reducerPath]: heroApiSlice.reducer,
    // [heroApiSlice.reducerPath]:  heroApiSlice.reducer,
    [designersApiSlice.reducerPath]: designersApiSlice.reducer,
    [projectsApiSlice.reducerPath]: projectsApiSlice.reducer,
    [projectContentApiSlice.reducerPath]: projectContentApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiNewsSlice.middleware,
      apiVisitsSlice.middleware,
      heroApiSlice.middleware,
      partnersApiSlice.middleware,
      designersApiSlice.middleware,
      projectsApiSlice.middleware,
      projectContentApiSlice.middleware,
    ),
});

export default store;
