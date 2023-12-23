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

export default function Question9() {
  const router = useRouter();
  const dispatch = useDispatch();

  const invalidAnswer = useSelector((state) => state.ui.invalidAnswer);
  const answerCorrect = useSelector((state) => state.ui.answerCorrect);

  const inputValue = useSelector((state) => state.question.inputValue);
  const questionPassed = useSelector((state) => state.question.questionPassed);

  const { validateProperAccess } = useValidateProperAccess();

  useEffect(() => {
    dispatch(questionSlice.actions.question9Passed(false));
    dispatch(uiSlice.actions.answerIsInvalid(false));
    dispatch(uiSlice.actions.answerIsCorrect(false));
  }, [dispatch]);

  const handleSantaWillDoSubmit = (e) => {
    e.preventDefault();
    if (inputValue === answers.question9 && questionPassed[10][1] === false) {
      dispatch(questionSlice.actions.question9Passed(true));
      dispatch(uiSlice.actions.answerIsInvalid(false));
      dispatch(uiSlice.actions.answerIsCorrect(true));
      setTimeout(() => {
        router.push("/question10");
      }, 1000);
    } else if (
      inputValue !== answers.question9 &&
      questionPassed[10][1] === false
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
      호주, 캐나다도 좋지만 지금은 일본이 가장 가고 싶군요. 북한으로 가라고요?
      싫습니다. 싫어요.
      <br />
      다음 문제입니다.
      <br />
      얼마 전, 제가 길을 가고 있는데 어떤 아주머니가 말을 거시더군요. 한 손에
      꽃을 든 쇼핑백을 들고 계셨는데, 꽃이 떨어질 것만 같았습니다. 다른 손에는
      짐이 있으셔서 꽃을 다시 정돈하지 못하셨죠. 그래서 저에게 꽃을 좀
      넣어달라고 부탁하셨습니다.
      <br />위 상황에서 제가 취했던 행동은 무엇이었을까요?
    </p>
  );

  const isProperAccess = validateProperAccess(10);

  return isProperAccess ? (
    <div>
      {santaReactionToAnswer}
      <Description text={descText} />
      {invalidAnswer && <InvalidAnswerDescription />}
      <MultipleChoiceForm
        handleSubmit={handleSantaWillDoSubmit}
        choice1="못 들은 척한다."
        choice2="왜 내가 그래야만 하는지 따진다."
        choice3="미소와 함께 '네'라고 답하며 꽃을 정돈해드린다."
        choice4="아내 사진을 보여주며 이쁘지 않냐고 물어본다."
      />
    </div>
  ) : (
    <InvalidAccessDescription />
  );
}
