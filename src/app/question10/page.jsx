"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import questionSlice from "@/lib/redux/slices/question-slice";
import uiSlice from "@/lib/redux/slices/ui-slice";
import { answers } from "@/constants/answers";
import useValidateProperAccess from "@/hooks/useValidateProperAccess";
import InvalidAccessDescription from "@/components/InvalidAccessDescription/InvalidAccessDescription";
import InvalidAnswerDescription from "@/components/InvalidAnswerDescription/InvalidAnswerDescription";
import MultipleChoiceForm from "@/components/MultipleChoiceForm/MultipleChoiceForm";
import Description from "@/components/Description/Description";

export default function Question10() {
  const router = useRouter();
  const dispatch = useDispatch();

  const invalidAnswer = useSelector((state) => state.ui.invalidAnswer);
  const answerCorrect = useSelector((state) => state.ui.answerCorrect);

  const inputValue = useSelector((state) => state.question.inputValue);
  const questionPassed = useSelector((state) => state.question.questionPassed);

  const { validateProperAccess } = useValidateProperAccess();

  useEffect(() => {
    dispatch(questionSlice.actions.question10Passed(false));
    dispatch(uiSlice.actions.answerIsInvalid(false));
    dispatch(uiSlice.actions.answerIsCorrect(false));
  }, [dispatch]);

  const handleSantaBirthdaySubmit = (e) => {
    e.preventDefault();
    if (inputValue === answers.question10 && questionPassed[11][1] === false) {
      dispatch(questionSlice.actions.question10Passed(true));
      dispatch(uiSlice.actions.answerIsInvalid(false));
      dispatch(uiSlice.actions.answerIsCorrect(true));
      setTimeout(() => {
        router.push("/open-random-box");
      }, 1000);
    } else if (
      inputValue !== answers.question10 &&
      questionPassed[11][1] === false
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
      설마, 첫 번째나 두 번째 선택지를 택하셨던 건 아니죠? 누가 보면 인성을
      국밥에 말아먹은 사람인 줄 알게 말이죠. 하하.
      <br />
      자, 집중해주세요! 대망의 마지막 문제입니다. 이 문제가 모든 문제 중 가장
      중요한 문제입니다.
      <br />
      다음 중 저의 생일은 언제일까요?
    </p>
  );

  const isProperAccess = validateProperAccess(11);

  return isProperAccess ? (
    <div>
      {santaReactionToAnswer}
      <Description text={descText} />
      {invalidAnswer && <InvalidAnswerDescription />}
      <MultipleChoiceForm
        handleSubmit={handleSantaBirthdaySubmit}
        choice1="2월 25일"
        choice2="2월 25일"
        choice3="2월 25일"
        choice4="10월 5일"
      />
    </div>
  ) : (
    <InvalidAccessDescription />
  );
}
