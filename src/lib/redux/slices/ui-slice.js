import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {
  invalidAnswer: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    answerIsInvalid(state, action) {
      state.invalidAnswer = action.payload;
    },
  },
});

export default uiSlice;
