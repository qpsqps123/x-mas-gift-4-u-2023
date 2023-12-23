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

export default function Question4() {
  const router = useRouter();
  const dispatch = useDispatch();

  const invalidAnswer = useSelector((state) => state.ui.invalidAnswer);
  const answerCorrect = useSelector((state) => state.ui.answerCorrect);

  const inputValue = useSelector((state) => state.question.inputValue);
  const questionPassed = useSelector((state) => state.question.questionPassed);

  const { validateProperAccess } = useValidateProperAccess();

  useEffect(() => {
    dispatch(questionSlice.actions.question4Passed(false));
    dispatch(uiSlice.actions.setAnswerInvalid(false));
    dispatch(uiSlice.actions.setAnswerCorrect(false));
  }, [dispatch]);

  const handleSantaShoeSizeSubmit = (e) => {
    e.preventDefault();
    if (inputValue === answers.question4 && questionPassed[5][1] === false) {
      dispatch(questionSlice.actions.question4Passed(true));
      dispatch(uiSlice.actions.setAnswerInvalid(false));
      dispatch(uiSlice.actions.setAnswerCorrect(true));
      setTimeout(() => {
        router.push("/question5");
      }, 1000);
    } else if (
      inputValue !== answers.question4 &&
      questionPassed[5][1] === false
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
      오... 제 오늘 자 몸무게까지 아시다니, 대단한걸요? 혹시 반복 작업하신 건
      아니죠? 어? 약간 킹받으신 거 같은데 아닌가요?
      <br />
      네, 아무튼 다음 문제입니다. 그렇다면 제 신발 사이즈는 어떻게 될까요? (답은
      세 자리 정수)
    </p>
  );

  const isProperAccess = validateProperAccess(5);

  return isProperAccess ? (
    <div>
      {santaReactionToAnswer}
      <Description text={descText} />
      {invalidAnswer && <InvalidAnswerDescription />}
      <ShortAnswerForm handleSubmit={handleSantaShoeSizeSubmit} />
    </div>
  ) : (
    <InvalidAccessDescription />
  );
}
