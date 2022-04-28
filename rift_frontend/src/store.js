import { configureStore } from "@reduxjs/toolkit";

import blogsSlice from "./reducers/blogsSlice";
import userReducer from "./reducers/userReducer";

const store = configureStore({
    reducer: {
        blogsSlice,
        user: userReducer
    }
})

export default store