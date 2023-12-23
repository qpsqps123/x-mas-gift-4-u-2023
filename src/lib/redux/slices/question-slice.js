import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {
  inputValue: null,
  questionPassed: [
    ["verifyName", false],
    ["verifyPhonePwd", false],
    ["question1", false],
    ["question2", false],
    ["question3", false],
    ["question4", false],
    ["question5", false],
    ["question6", false],
    ["question7", false],
    ["question8", false],
    ["question9", false],
    ["question10", false],
  ],
};

const questionSlice = createSlice({
  name: "question",
  initialState: initialUiState,
  reducers: {
    changeInputValue(state, action) {
      state.inputValue = action.payload;
    },
    nameVerificationPassed(state, action) {
      state.questionPassed[0][1] = action.payload;
    },
    phonePwdVerificationPassed(state, action) {
      state.questionPassed[1][1] = action.payload;
    },
    question1Passed(state, action) {
      state.questionPassed[2][1] = action.payload;
    },
    question2Passed(state, action) {
      state.questionPassed[3][1] = action.payload;
    },
    question3Passed(state, action) {
      state.questionPassed[4][1] = action.payload;
    },
    question4Passed(state, action) {
      state.questionPassed[5][1] = action.payload;
    },
    question5Passed(state, action) {
      state.questionPassed[6][1] = action.payload;
    },
    question6Passed(state, action) {
      state.questionPassed[7][1] = action.payload;
    },
    question7Passed(state, action) {
      state.questionPassed[8][1] = action.payload;
    },
    question8Passed(state, action) {
      state.questionPassed[9][1] = action.payload;
    },
    question9Passed(state, action) {
      state.questionPassed[10][1] = action.payload;
    },
    question10Passed(state, action) {
      state.questionPassed[11][1] = action.payload;
    },
  },
});

export default questionSlice;
