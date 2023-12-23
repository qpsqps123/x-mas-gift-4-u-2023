"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import questionSlice from "@/lib/redux/slices/question-slice";
import uiSlice from "@/lib/redux/slices/ui-slice";
import { answers } from "@/constants/answers";
import useValidateProperAccess from "@/hooks/useValidateProperAccess";
import ShortAnswerForm from "@/components/ShortAnswerForm/ShortAnswerForm";
import InvalidAccessDescription from "@/components/InvalidAccessDescription/InvalidAccessDescription";
import InvalidAnswerDescription from "@/components/InvalidAnswerDescription/InvalidAnswerDescription";
import Description from "@/components/Description/Description";

export default function Question1() {
  const router = useRouter();
  const dispatch = useDispatch();

  const invalidAnswer = useSelector((state) => state.ui.invalidAnswer);
  const answerCorrect = useSelector((state) => state.ui.answerCorrect);

  const inputValue = useSelector((state) => state.question.inputValue);
  const questionPassed = useSelector((state) => state.question.questionPassed);

  const { validateProperAccess } = useValidateProperAccess();

  useEffect(() => {
    dispatch(questionSlice.actions.question1Passed(false));
    dispatch(uiSlice.actions.answerIsInvalid(false));
    dispatch(uiSlice.actions.answerIsCorrect(false));
  }, [dispatch]);

  const handleSantaNameSubmit = (e) => {
    e.preventDefault();
    if (inputValue === answers.question1 && questionPassed[2][1] === false) {
      dispatch(questionSlice.actions.question1Passed(true));
      dispatch(uiSlice.actions.answerIsInvalid(false));
      dispatch(uiSlice.actions.answerIsCorrect(true));
      setTimeout(() => {
        router.push("/question2");
      }, 1000);
    } else if (
      inputValue !== answers.question1 &&
      questionPassed[2][1] === false
    ) {
      dispatch(uiSlice.actions.answerIsInvalid(true));
    }
  };

  const santaReactionToAnswer = invalidAnswer ? (
    <Image src="/images/icons/close.png" width={100} height={100} alt="test" />
  ) : answerCorrect ? (
    <Image
      src="/images/icons/correct.png"
      width={100}
      height={100}
      alt="test"
    />
  ) : (
    <Image src="/images/icons/test.png" width={100} height={100} alt="test" />
  );

  const descText = (
    <p>
      본인 확인 절차가 끝났습니다!
      <br />
      자, 첫 번째 문제입니다. 당신에게 선물을 준비한 산타의 본명이 무엇일까요?
    </p>
  );

  const isProperAccess = validateProperAccess(2);

  return isProperAccess ? (
    <div>
      {santaReactionToAnswer}
      <Description text={descText} />
      {invalidAnswer && <InvalidAnswerDescription />}
      <ShortAnswerForm handleSubmit={handleSantaNameSubmit} />
    </div>
  ) : (
    <InvalidAccessDescription />
  );
}
