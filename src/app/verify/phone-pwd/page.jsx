"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useValidateProperAccess from "@/hooks/useValidateProperAccess";
import questionSlice from "@/lib/redux/slices/question-slice";
import ShortAnswerForm from "@/components/ShortAnswerForm/ShortAnswerForm";
import InvalidAccessDescription from "@/components/InvalidAccessDescription/InvalidAccessDescription";
import uiSlice from "@/lib/redux/slices/ui-slice";
import { answers } from "@/constants/answers";
import InvalidAnswerDescription from "@/components/InvalidAnswerDescription/InvalidAnswerDescription";
import Description from "@/components/Description/Description";
import { desc } from "@/constants/desc";

const VerifyPhonePwd = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const invalidAnswer = useSelector((state) => state.ui.invalidAnswer);

  const inputValue = useSelector((state) => state.question.inputValue);
  const questionPassed = useSelector((state) => state.question.questionPassed);

  const { validateProperAccess } = useValidateProperAccess();

  useEffect(() => {
    dispatch(questionSlice.actions.phonePwdVerificationPassed(false));
    dispatch(uiSlice.actions.setAnswerInvalid(false));
    dispatch(uiSlice.actions.setAnswerCorrect(false));
  }, [dispatch]);

  const handlePhonePwdSubmit = (e) => {
    e.preventDefault();
    if (inputValue === answers.phonePwd && questionPassed[1][1] === false) {
      dispatch(questionSlice.actions.phonePwdVerificationPassed(true));
      router.push("/question/sa/1");
    } else if (
      inputValue !== answers.phonePwd &&
      questionPassed[1][1] === false
    ) {
      dispatch(uiSlice.actions.setAnswerInvalid(true));
    }
  };

  const isProperAccess = validateProperAccess(1);

  return isProperAccess ? (
    <div>
      <Image src="/images/icons/test.png" width={100} height={100} alt="test" />
      <Description text={desc["verifyPhonePwd"]} />
      {invalidAnswer && <InvalidAnswerDescription />}
      <ShortAnswerForm handleSubmit={handlePhonePwdSubmit} />
    </div>
  ) : (
    <InvalidAccessDescription />
  );
};

export default VerifyPhonePwd;
