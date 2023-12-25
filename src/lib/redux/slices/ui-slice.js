import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {
  invalidAnswer: false,
  answerCorrect: false,
  randomBoxOpened: false,
  randomBoxNum: null,
  randomBoxResultDesc: null,
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
    setRandomBoxOpened(state, action) {
      state.randomBoxOpened = action.payload;
    },
    setRandomBoxNum(state, action) {
      state.randomBoxNum = action.payload;
    },
    setRandomBoxResultDesc(state, action) {
      state.randomBoxResultDesc = action.payload;
    },
  },
});

export default uiSlice;
