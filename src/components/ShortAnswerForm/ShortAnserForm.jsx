"use client";
import questionSlice from "@/lib/redux/slices/question-slice";
import { useDispatch, useSelector } from "react-redux";

const ShortAnswerForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const inputValue = useSelector((state) => state.question.inputValue);
  const questionPassed = useSelector((state) => state.question.questionPassed);

  const handleInputChange = (e) => {
    dispatch(questionSlice.actions.changeInputValue(e.target.value));
    console.log(inputValue);
    console.log(questionPassed);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="a11yHidden">답을 작성하고 다음 버튼을 누르세요.</label>
      <input onChange={handleInputChange} />
      <button>다음</button>
    </form>
  );
};

export default ShortAnswerForm;
