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

export default function Question6() {
  const router = useRouter();
  const dispatch = useDispatch();

  const invalidAnswer = useSelector((state) => state.ui.invalidAnswer);
  const answerCorrect = useSelector((state) => state.ui.answerCorrect);

  const inputValue = useSelector((state) => state.question.inputValue);
  const questionPassed = useSelector((state) => state.question.questionPassed);

  const { validateProperAccess } = useValidateProperAccess();

  useEffect(() => {
    dispatch(questionSlice.actions.question6Passed(false));
    dispatch(uiSlice.actions.answerIsInvalid(false));
    dispatch(uiSlice.actions.answerIsCorrect(false));
  }, [dispatch]);

  const handleSantaWorkedAtSubmit = (e) => {
    e.preventDefault();
    if (inputValue === answers.question6 && questionPassed[7][1] === false) {
      dispatch(questionSlice.actions.question6Passed(true));
      dispatch(uiSlice.actions.answerIsInvalid(false));
      dispatch(uiSlice.actions.answerIsCorrect(true));
      setTimeout(() => {
        router.push("/question7");
      }, 1000);
    } else if (
      inputValue !== answers.question6 &&
      questionPassed[7][1] === false
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
      맞았습니다! 중국은 가본 적이 없어요. 제 아내가 상하이를 다녀왔는데 되게
      좋았다고 하더군요. 저도 한 번 가보고 싶군요.
      <br />
      그럼, 다음 문제입니다. 다음 중 제가 일했던 회사가&nbsp;
      <span>아닌 곳</span>은 어디일까요?
    </p>
  );

  const isProperAccess = validateProperAccess(7);

  return isProperAccess ? (
    <div>
      {santaReactionToAnswer}
      <Description text={descText} />
      {invalidAnswer && <InvalidAnswerDescription />}
      <MultipleChoiceForm
        handleSubmit={handleSantaWorkedAtSubmit}
        choice1="Palsaik Restaurant"
        choice2="Gangnam Restaurant"
        choice3="ALS Group"
        choice4="Woolworths"
      />
    </div>
  ) : (
    <InvalidAccessDescription />
  );
}
