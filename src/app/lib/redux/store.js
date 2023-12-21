import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./slices/ui-slice";
import questionSlice from "./slices/question-slice";

const store = () => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
      question: questionSlice.reducer,
    },
  });
};

export default store;
