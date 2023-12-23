"use client";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import questionSlice from "@/lib/redux/slices/question-slice";
import ShortAnswerForm from "@/components/ShortAnswerForm/ShortAnswerForm";
import { answers } from "@/constants/answers";
import InvalidAnswerDescription from "@/components/InvalidAnswerDescription/InvalidAnswerDescription";
import uiSlice from "@/lib/redux/slices/ui-slice";
import Description from "@/components/Description/Description";

export default function Page() {
  const router = useRouter();

  const dispatch = useDispatch();

  const invalidAnswer = useSelector((state) => state.ui.invalidAnswer);

  const inputValue = useSelector((state) => state.question.inputValue);
  const questionPassed = useSelector((state) => state.question.questionPassed);

  useEffect(() => {
    dispatch(questionSlice.actions.nameVerificationPassed(false));
    dispatch(uiSlice.actions.answerIsInvalid(false));
    dispatch(uiSlice.actions.answerIsCorrect(false));
  }, [dispatch]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (inputValue === answers.name && questionPassed[0][1] === false) {
      dispatch(questionSlice.actions.nameVerificationPassed(true));
      router.push("/verify-phone-pwd");
    } else if (inputValue !== answers.name && questionPassed[0][1] === false) {
      dispatch(uiSlice.actions.answerIsInvalid(true));
    }
  };

  const descText = (
    <p>먼저 본인 확인 절차가 있겠습니다. 이름이 어떻게 되시나요?</p>
  );

  return (
    <div>
      <Description text={descText} />
      {invalidAnswer && <InvalidAnswerDescription />}
      <ShortAnswerForm handleSubmit={handleNameSubmit} />
    </div>
  );
}
