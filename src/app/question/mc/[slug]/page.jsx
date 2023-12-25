"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "@/containers/McQuestionTemplate/McQuestionTemplate.module.scss";
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
import useDebounce from "@/hooks/useDebounce";

export default function McQuestionTemplate({ params }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { validateProperAccess } = useValidateProperAccess();
  const { debouncedInvalidAnsweDescAlert } = useDebounce();

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

    document
      .getElementById("backCurtain")
      .classList.remove("closeBackCurtainAnimation");
    document
      .getElementById("midCurtain")
      .classList.remove("closeMidCurtainAnimation");
    document
      .getElementById("frontCurtain")
      .classList.remove("closeFrontCurtainAnimation");
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
        document
          .getElementById("backCurtain")
          .classList.add("closeBackCurtainAnimation");
        document
          .getElementById("midCurtain")
          .classList.add("closeMidCurtainAnimation");
        document
          .getElementById("frontCurtain")
          .classList.add("closeFrontCurtainAnimation");
      }, 1000);

      setTimeout(() => {
        if (pathname === "/question/mc/10") {
          router.replace("/open-random-box");
        } else if (pathname === `/question/mc/${currentQuestionNum}`) {
          router.replace(`/question/mc/${(currentQuestionNum + 1).toString()}`);
        }
      }, 3000);
    } else if (
      inputValue !== answerList[currentQuestionNum] &&
      questionPassed[currentQuestionNum + 1][1] === false
    ) {
      debouncedInvalidAnsweDescAlert(1500);
    }
  };

  const santaReactionToAnswer = invalidAnswer ? (
    <Image
      src="/images/pictures/santaPhotos/santaCry.webp"
      width={100}
      height={130}
      alt="Santa is Crying"
      priority={true}
    />
  ) : answerCorrect ? (
    <Image
      src="/images/pictures/santaPhotos/santaFeelsGood.webp"
      width={100}
      height={130}
      alt="Santa Feels good"
      priority={true}
    />
  ) : (
    <Image
      src="/images/pictures/santaPhotos/santaPhoto.webp"
      width={100}
      height={130}
      alt="Santa photo"
      priority={true}
    />
  );

  const isProperAccess = validateProperAccess(+paramsSlug + 1);

  return isProperAccess ? (
    <div className={classes.container}>
      <div className={classes.imgAndDescContainer}>
        {santaReactionToAnswer}
        <Description text={desc[paramsSlug]} />
      </div>
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
