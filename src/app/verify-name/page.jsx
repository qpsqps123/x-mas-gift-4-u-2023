"use client";
import classes from "../../containers/VerifyName/VerifyName.module.scss";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import questionSlice from "@/lib/redux/slices/question-slice";
import ShortAnswerForm from "@/components/ShortAnswerForm/ShortAnserForm";
import Question from "@/components/Question/Question";
import { answers } from "@/constants/answers";
import InvalidAnswerDescription from "@/components/InvalidAnswerDescription/InvalidAnswerDescription";
import uiSlice from "@/lib/redux/slices/ui-slice";

export default function Page() {
  const router = useRouter();

  const dispatch = useDispatch();

  const invalidAnswer = useSelector((state) => state.ui.invalidAnswer);

  const inputValue = useSelector((state) => state.question.inputValue);
  const questionPassed = useSelector((state) => state.question.questionPassed);

  useEffect(() => {
    dispatch(questionSlice.actions.nameVerificationPassed(false));
  }, [dispatch]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (inputValue === answers.name && questionPassed[0][1] === false) {
      dispatch(questionSlice.actions.nameVerificationPassed(true));
      dispatch(uiSlice.actions.answerIsInvalid(false));
      router.push("/verify-phone-pwd");
    } else if (inputValue !== answers.name && questionPassed[0][1] === false) {
      dispatch(uiSlice.actions.answerIsInvalid(true));
    }
  };

  return (
    <div>
      <Question text="먼저 본인 확인 절차가 있겠습니다. 이름이 어떻게 되실까요?" />
      {invalidAnswer && <InvalidAnswerDescription />}
      <ShortAnswerForm handleSubmit={handleNameSubmit} />
    </div>
  );
}
