"use client";
import classes from "./NextPageButton.module.scss";
const NextPageButton = ({ handleClick, form }) => {
  return (
    <button
      type={form ? "submit" : "button"}
      className={classes.nextButton}
      onClick={handleClick ? handleClick : null}
      form={form ? form : null}
    >
      다음
    </button>
  );
};

export default NextPageButton;
