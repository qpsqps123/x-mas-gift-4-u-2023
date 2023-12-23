import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {
  invalidAnswer: false,
  answerCorrect: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    answerIsInvalid(state, action) {
      state.invalidAnswer = action.payload;
    },
    answerIsCorrect(state, action) {
      state.answerCorrect = action.payload;
    },
  },
});

export default uiSlice;
