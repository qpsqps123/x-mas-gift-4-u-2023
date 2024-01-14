"use client";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import React, { useLayoutEffect } from "react";
import classes from "@/containers/VerifyName/VerifyName.module.scss";
import questionSlice from "@/lib/redux/slices/question-slice";
import ShortAnswerForm from "@/components/ShortAnswerForm/ShortAnswerForm";
import { answerList } from "@/constants/answerList";
import InvalidAnswerDescription from "@/components/InvalidAnswerDescription/InvalidAnswerDescription";
import uiSlice from "@/lib/redux/slices/ui-slice";
import Description from "@/components/Description/Description";
import { desc } from "@/constants/desc";
import useDebounce from "@/hooks/useDebounce";

export default function VerifyName() {
  const router = useRouter();

  const dispatch = useDispatch();

  const invalidAnswer = useSelector((state) => state.ui.invalidAnswer);

  const inputValue = useSelector((state) => state.question.inputValue);
  const questionPassed = useSelector((state) => state.question.questionPassed);

  const { debouncedInvalidAnsweDescAlert } = useDebounce();

  useLayoutEffect(() => {
    dispatch(questionSlice.actions.nameVerificationPassed(false));
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
  }, [dispatch]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (inputValue === answerList.name && questionPassed[0][1] === false) {
      dispatch(questionSlice.actions.nameVerificationPassed(true));
      document
        .getElementById("backCurtain")
        .classList.add("closeBackCurtainAnimation");
      document
        .getElementById("midCurtain")
        .classList.add("closeMidCurtainAnimation");
      document
        .getElementById("frontCurtain")
        .classList.add("closeFrontCurtainAnimation");
      setTimeout(() => {
        router.replace("/verify/phone-pwd");
      }, 2000);
    } else if (
      inputValue !== answerList.name &&
      questionPassed[0][1] === false
    ) {
      debouncedInvalidAnsweDescAlert(1500);
    }
  };

  return (
    <div className={classes.container}>
      <Description text={desc["verifyName"]} />
      {invalidAnswer && <InvalidAnswerDescription />}
      <ShortAnswerForm handleSubmit={handleNameSubmit} />
    </div>
  );
}
