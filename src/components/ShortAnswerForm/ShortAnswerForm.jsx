"use client";
import questionSlice from "@/lib/redux/slices/question-slice";
import { useDispatch } from "react-redux";

const ShortAnswerForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    dispatch(questionSlice.actions.setInputValue(e.target.value));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="shortAnswer">답을 작성하고 다음 버튼을 눌러주세요!</label>
      <input id="shortAnswer" onChange={handleInputChange} />
      <button>다음</button>
    </form>
  );
};

export default ShortAnswerForm;
