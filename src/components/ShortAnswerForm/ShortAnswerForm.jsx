"use client";
import classes from "./ShortAnswerForm.module.scss";
import questionSlice from "@/lib/redux/slices/question-slice";
import { useDispatch } from "react-redux";
import NextPageButton from "../NextPageButton/NextPageButton";

const ShortAnswerForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    dispatch(questionSlice.actions.setInputValue(e.target.value));
  };

  return (
    <form id="shortAnswerForm" onSubmit={handleSubmit} className={classes.form}>
      <label htmlFor="shortAnswer" className={classes.label}>
        답을 작성하고 다음 버튼을 눌러주세요!
      </label>
      <input
        id="shortAnswer"
        className={classes.input}
        onChange={handleInputChange}
      />
      <NextPageButton form={"shortAnswerForm"} />
    </form>
  );
};

export default ShortAnswerForm;
