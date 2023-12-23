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

export default function Question5() {
  const router = useRouter();
  const dispatch = useDispatch();

  const invalidAnswer = useSelector((state) => state.ui.invalidAnswer);
  const answerCorrect = useSelector((state) => state.ui.answerCorrect);

  const inputValue = useSelector((state) => state.question.inputValue);
  const questionPassed = useSelector((state) => state.question.questionPassed);

  const { validateProperAccess } = useValidateProperAccess();

  useEffect(() => {
    dispatch(questionSlice.actions.question5Passed(false));
    dispatch(uiSlice.actions.setAnswerInvalid(false));
    dispatch(uiSlice.actions.setAnswerCorrect(false));
  }, [dispatch]);

  const handleSantaVisitedCountriesSubmit = (e) => {
    e.preventDefault();
    if (inputValue === answers.question5 && questionPassed[6][1] === false) {
      dispatch(questionSlice.actions.question5Passed(true));
      dispatch(uiSlice.actions.setAnswerInvalid(false));
      dispatch(uiSlice.actions.setAnswerCorrect(true));
      setTimeout(() => {
        router.push("/question6");
      }, 1000);
    } else if (
      inputValue !== answers.question5 &&
      questionPassed[6][1] === false
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
      맞았습니다! 좋습니다, 아주 좋아요. 참고로 저는 요새 검흰 삭스슈즈가 마음에
      들더군요. 그래서 뭐 어쩌냐고요? 그냥 그렇다고요. 헤헤.
      <br />
      다음 문제입니다. 다음은 객관식입니다. 다음 중 제가 가보지&nbsp;
      <span>않은</span> 나라는 어디일까요?
    </p>
  );

  const isProperAccess = validateProperAccess(6);

  return isProperAccess ? (
    <div>
      {santaReactionToAnswer}
      <Description text={descText} />
      {invalidAnswer && <InvalidAnswerDescription />}
      <MultipleChoiceForm
        handleSubmit={handleSantaVisitedCountriesSubmit}
        choice1="호주"
        choice2="말레이시아"
        choice3="일본"
        choice4="중국"
      />
    </div>
  ) : (
    <InvalidAccessDescription />
  );
}
