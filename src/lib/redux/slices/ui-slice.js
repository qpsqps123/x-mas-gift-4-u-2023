import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {
  invalidAnswer: false,
  answerCorrect: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    setAnswerInvalid(state, action) {
      state.invalidAnswer = action.payload;
    },
    setAnswerCorrect(state, action) {
      state.answerCorrect = action.payload;
    },
  },
});

export default uiSlice;
