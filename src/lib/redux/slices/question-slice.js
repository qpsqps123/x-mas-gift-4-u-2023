import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {
  inputValue: null,
  questionPassed: [
    ["verifyName", false],
    ["verifyPhonePwd", false],
    ["question1", false],
  ],
};

const questionSlice = createSlice({
  name: "question",
  initialState: initialUiState,
  reducers: {
    changeInputValue(state, action) {
      state.inputValue = action.payload;
    },
    changeNamePassed(state, action) {
      state.questionPassed[0][1] = action.payload;
    },
    changePhonePwdPassed(state, action) {
      state.questionPassed[1][1] = action.payload;
    },
  },
});

export default questionSlice;
