"use client";

import React from "react";
import { useDispatch } from "react-redux";
import classes from "./MultipleChoiceForm.module.scss";
import NextPageButton from "../NextPageButton/NextPageButton";
import questionSlice from "@/lib/redux/slices/question-slice";

const MultipleChoiceForm = ({ handleSubmit, ...rest }) => {
  const dispatch = useDispatch();

  const choicesObj = { ...rest };

  const handleInputChange = (e) => {
    dispatch(questionSlice.actions.setInputValue(e.target.value));
  };

  return (
    <React.Fragment>
      <form
        id="multipleChoiceForm"
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <fieldset className={classes.fieldset}>
          <legend>답을 선택하고 다음 버튼을 누르세요.</legend>
          <div className={classes.inputAndLabelContainer}>
            <input
              type="radio"
              id="choice1"
              name="choices"
              onChange={handleInputChange}
              value={choicesObj.choice1}
            />
            <label htmlFor="choice1">{choicesObj.choice1}</label>
          </div>
          <div className={classes.inputAndLabelContainer}>
            <input
              type="radio"
              id="choice2"
              name="choices"
              onChange={handleInputChange}
              value={choicesObj.choice2}
            />
            <label htmlFor="choice2">{choicesObj.choice2}</label>
          </div>
          <div className={classes.inputAndLabelContainer}>
            <input
              type="radio"
              id="choice3"
              name="choices"
              onChange={handleInputChange}
              value={choicesObj.choice3}
            />
            <label htmlFor="choice3">{choicesObj.choice3}</label>
          </div>
          <div className={classes.inputAndLabelContainer}>
            <input
              type="radio"
              id="choice4"
              name="choices"
              onChange={handleInputChange}
              value={choicesObj.choice4}
            />
            <label htmlFor="choice4">{choicesObj.choice4}</label>
          </div>
        </fieldset>
      </form>
      <NextPageButton form={"multipleChoiceForm"} />
    </React.Fragment>
  );
};

export default MultipleChoiceForm;
