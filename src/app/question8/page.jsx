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

export default function Question8() {
  const router = useRouter();
  const dispatch = useDispatch();

  const invalidAnswer = useSelector((state) => state.ui.invalidAnswer);
  const answerCorrect = useSelector((state) => state.ui.answerCorrect);

  const inputValue = useSelector((state) => state.question.inputValue);
  const questionPassed = useSelector((state) => state.question.questionPassed);

  const { validateProperAccess } = useValidateProperAccess();

  useEffect(() => {
    dispatch(questionSlice.actions.question8Passed(false));
    dispatch(uiSlice.actions.setAnswerInvalid(false));
    dispatch(uiSlice.actions.setAnswerCorrect(false));
  }, [dispatch]);

  const handleSantaWantsToVisitSubmit = (e) => {
    e.preventDefault();
    if (inputValue === answers.question8 && questionPassed[9][1] === false) {
      dispatch(questionSlice.actions.question8Passed(true));
      dispatch(uiSlice.actions.setAnswerInvalid(false));
      dispatch(uiSlice.actions.setAnswerCorrect(true));
      setTimeout(() => {
        router.push("/question9");
      }, 1000);
    } else if (
      inputValue !== answers.question8 &&
      questionPassed[9][1] === false
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
      이 중에서는 당연히 뜨끈~하고 든든~한 막창국밥 아니겠습니까? 얘기하니까 또
      먹고싶네요. 츄르릅...
      <br /> 크흠, 다음 문제입니다. 다음 중 제가 지금 가장 가고 싶은 나라는
      어디일까요?
    </p>
  );

  const isProperAccess = validateProperAccess(9);

  return isProperAccess ? (
    <div>
      {santaReactionToAnswer}
      <Description text={descText} />
      {invalidAnswer && <InvalidAnswerDescription />}
      <MultipleChoiceForm
        handleSubmit={handleSantaWantsToVisitSubmit}
        choice1="호주"
        choice2="일본"
        choice3="캐나다"
        choice4="북한"
      />
    </div>
  ) : (
    <InvalidAccessDescription />
  );
}
