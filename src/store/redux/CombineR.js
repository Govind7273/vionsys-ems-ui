import { combineReducers } from "@reduxjs/toolkit";
import AddtoStoreSlice from "./userLeaveSlice";

export default combineReducers({
  addtoStore: AddtoStoreSlice,
});
