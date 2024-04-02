import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [{ name: "sagar" }],
};

export const AddtoStoreSlice = createSlice({
  name: "leaveData",
  initialState,
  reducers: {
    AddtoStore: (state, action) => {
      state.value.push(action);
    },
  },
});

export const { AddtoStore } = AddtoStoreSlice.actions;

export default AddtoStoreSlice.reducer;
