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

export default function Question2() {
  const router = useRouter();
  const dispatch = useDispatch();

  const invalidAnswer = useSelector((state) => state.ui.invalidAnswer);
  const answerCorrect = useSelector((state) => state.ui.answerCorrect);

  const inputValue = useSelector((state) => state.question.inputValue);
  const questionPassed = useSelector((state) => state.question.questionPassed);

  const { validateProperAccess } = useValidateProperAccess();

  useEffect(() => {
    dispatch(questionSlice.actions.question2Passed(false));
    dispatch(uiSlice.actions.setAnswerInvalid(false));
    dispatch(uiSlice.actions.setAnswerCorrect(false));
  }, [dispatch]);

  const handleSantaHeightSubmit = (e) => {
    e.preventDefault();
    if (inputValue === answers.question2 && questionPassed[3][1] === false) {
      dispatch(questionSlice.actions.question2Passed(true));
      dispatch(uiSlice.actions.setAnswerInvalid(false));
      dispatch(uiSlice.actions.setAnswerCorrect(true));
      setTimeout(() => {
        router.push("/question3");
      }, 1000);
    } else if (
      inputValue !== answers.question2 &&
      questionPassed[3][1] === false
    ) {
      dispatch(uiSlice.actions.setAnswerInvalid(true));
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
      호오... 제 본명을 알고 계셨군요. 좋습니다.
      <br />
      그럼, 다음 문제입니다. 제 키는 몇 cm일까요? 흠... 혹시나 해서
      말씀드리지만, 제 키는 175cm가 아닙니다. (답은 세 자리 정수)
    </p>
  );

  const isProperAccess = validateProperAccess(3);

  return isProperAccess ? (
    <div>
      {santaReactionToAnswer}
      <Description text={descText} />
      {invalidAnswer && <InvalidAnswerDescription />}
      <ShortAnswerForm handleSubmit={handleSantaHeightSubmit} />
    </div>
  ) : (
    <InvalidAccessDescription />
  );
}
