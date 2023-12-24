"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import questionSlice from "@/lib/redux/slices/question-slice";
import uiSlice from "@/lib/redux/slices/ui-slice";
import { answerList } from "@/constants/answerList";
import useValidateProperAccess from "@/hooks/useValidateProperAccess";
import InvalidAccessDescription from "@/components/InvalidAccessDescription/InvalidAccessDescription";
import InvalidAnswerDescription from "@/components/InvalidAnswerDescription/InvalidAnswerDescription";
import Description from "@/components/Description/Description";
import { desc } from "@/constants/desc";
import MultipleChoiceForm from "@/components/MultipleChoiceForm/MultipleChoiceForm";
import { multipleChoiceList } from "@/constants/multipleChoiceList";

export default function QuestionTemplate({ params }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { validateProperAccess } = useValidateProperAccess();

  const paramsSlug = params.slug;

  const invalidAnswer = useSelector((state) => state.ui.invalidAnswer);
  const answerCorrect = useSelector((state) => state.ui.answerCorrect);

  const inputValue = useSelector((state) => state.question.inputValue);
  const questionPassed = useSelector((state) => state.question.questionPassed);
  const currentQuestionNum = useSelector(
    (state) => state.question.currentQuestionNum
  );

  useEffect(() => {
    dispatch(questionSlice.actions.setCurrentQuestionNum(+paramsSlug));
    dispatch(questionSlice.actions.questionPassed(false));
    dispatch(uiSlice.actions.setAnswerInvalid(false));
    dispatch(uiSlice.actions.setAnswerCorrect(false));
  }, [dispatch, paramsSlug]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputValue === answerList[currentQuestionNum] &&
      questionPassed[currentQuestionNum + 1][1] === false
    ) {
      dispatch(questionSlice.actions.questionPassed(true));
      dispatch(uiSlice.actions.setAnswerInvalid(false));
      dispatch(uiSlice.actions.setAnswerCorrect(true));
      setTimeout(() => {
        if (pathname === "/question/mc/10") {
          router.push("/open-random-box");
        } else if (pathname === `/question/mc/${currentQuestionNum}`) {
          router.push(`/question/mc/${(currentQuestionNum + 1).toString()}`);
        }
      }, 1000);
    } else if (
      inputValue !== answerList[currentQuestionNum] &&
      questionPassed[currentQuestionNum + 1][1] === false
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

  const isProperAccess = validateProperAccess(+paramsSlug + 1);

  return isProperAccess ? (
    <div>
      {santaReactionToAnswer}
      <Description text={desc[paramsSlug]} />
      {invalidAnswer && <InvalidAnswerDescription />}
      <MultipleChoiceForm
        handleSubmit={handleSubmit}
        choice1={multipleChoiceList[paramsSlug][0]}
        choice2={multipleChoiceList[paramsSlug][1]}
        choice3={multipleChoiceList[paramsSlug][2]}
        choice4={multipleChoiceList[paramsSlug][3]}
      />
    </div>
  ) : (
    <InvalidAccessDescription />
  );
}
