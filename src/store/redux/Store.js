import { configureStore } from "@reduxjs/toolkit";
import rootreducer from "./CombineR";

export const store = configureStore({
  reducer: rootreducer,
});
