"use client";
import questionSlice from "@/lib/redux/slices/question-slice";
import { useDispatch, useSelector } from "react-redux";

const MultipleChoiceForm = ({ handleSubmit, ...rest }) => {
  const dispatch = useDispatch();

  const choicesObj = { ...rest };

  const inputValue = useSelector((state) => state.question.inputValue);
  const handleInputChange = (e) => {
    dispatch(questionSlice.actions.changeInputValue(e.target.value));
    console.log(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>답을 선택하고 다음 버튼을 누르세요.</legend>
        <div>
          <label htmlFor="choice1">{choicesObj.choice1}</label>
          <input
            type="radio"
            id="choice1"
            name="choices"
            onChange={handleInputChange}
            value={choicesObj.choice1}
          />
        </div>
        <div>
          <label htmlFor="choice2">{choicesObj.choice2}</label>
          <input
            type="radio"
            id="choice2"
            name="choices"
            onChange={handleInputChange}
            value={choicesObj.choice2}
          />
        </div>
        <div>
          <label htmlFor="choice3">{choicesObj.choice3}</label>
          <input
            type="radio"
            id="choice3"
            name="choices"
            onChange={handleInputChange}
            value={choicesObj.choice3}
          />
        </div>
        <div>
          <label htmlFor="choice4">{choicesObj.choice4}</label>
          <input
            type="radio"
            id="choice4"
            name="choices"
            onChange={handleInputChange}
            value={choicesObj.choice4}
          />
        </div>
      </fieldset>
      <button>다음</button>
    </form>
  );
};

export default MultipleChoiceForm;
