import { configureStore } from "@reduxjs/toolkit";

import blogsSlice from "./reducers/blogsSlice";
import usersSlice from "./reducers/usersSlice";

const store = configureStore({
    reducer: {
        blogsSlice,
        usersSlice
    }
})

export default store