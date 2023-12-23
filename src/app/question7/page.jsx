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

export default function Question7() {
  const router = useRouter();
  const dispatch = useDispatch();

  const invalidAnswer = useSelector((state) => state.ui.invalidAnswer);
  const answerCorrect = useSelector((state) => state.ui.answerCorrect);

  const inputValue = useSelector((state) => state.question.inputValue);
  const questionPassed = useSelector((state) => state.question.questionPassed);

  const { validateProperAccess } = useValidateProperAccess();

  useEffect(() => {
    dispatch(questionSlice.actions.question7Passed(false));
    dispatch(uiSlice.actions.answerIsInvalid(false));
    dispatch(uiSlice.actions.answerIsCorrect(false));
  }, [dispatch]);

  const handleSantaFavFoodSubmit = (e) => {
    e.preventDefault();
    if (inputValue === answers.question7 && questionPassed[8][1] === false) {
      dispatch(questionSlice.actions.question7Passed(true));
      dispatch(uiSlice.actions.answerIsInvalid(false));
      dispatch(uiSlice.actions.answerIsCorrect(true));
      setTimeout(() => {
        router.push("/question8");
      }, 1000);
    } else if (
      inputValue !== answers.question7 &&
      questionPassed[8][1] === false
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
      저는 Woolworths에서 일하기는 했지만, Woolworths 소속은 아니었습니다!
      Woolworths가 계약한 업체 소속이었지요. 몰랐던 사실이죠? 호호.
      <br /> 자, 다음 문제입니다. 다음 중 제가 가장 좋아하는 음식은 어떤
      음식일까요?
    </p>
  );

  const isProperAccess = validateProperAccess(8);

  return isProperAccess ? (
    <div>
      {santaReactionToAnswer}
      <Description text={descText} />
      {invalidAnswer && <InvalidAnswerDescription />}
      <MultipleChoiceForm
        handleSubmit={handleSantaFavFoodSubmit}
        choice1="엽기떡볶이"
        choice2="까르보나라 불닭볶음면"
        choice3="막창국밥"
        choice4="파김치를 곁들인 짜파게티"
      />
    </div>
  ) : (
    <InvalidAccessDescription />
  );
}
