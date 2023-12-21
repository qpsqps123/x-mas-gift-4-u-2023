"use client";
import Image from "next/image";
import classes from "../../containers/VerifyPhonePwd/VerifyPhonePwd.module.scss";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useValidateProperAccess from "@/hooks/useValidateProperAccess";
import questionSlice from "@/lib/redux/slices/question-slice";
import Question from "@/components/Question/Question";
import ShortAnswerForm from "@/components/ShortAnswerForm/ShortAnserForm";
import InvalidAccessDescription from "@/components/InvalidAccessDescription/InvalidAccessDescription";

const VerifyPhonePwd = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const questionPassed = useSelector((state) => state.question.questionPassed);

  const { validateProperAccess } = useValidateProperAccess();

  useEffect(() => {
    dispatch(questionSlice.actions.changePhonePwdPassed(false));
  }, [dispatch]);

  const handlePhonePwdSubmit = (e) => {
    e.preventDefault();
    if (inputValue === answers.name && questionPassed[1][1] === false) {
      dispatch(questionSlice.actions.changePhonePwdPassed(true));
      router.push("/question1");
    }
  };

  const isProperAccess = validateProperAccess(1);

  return isProperAccess ? (
    <div>
      <Image src="/images/icons/test.png" width={100} height={100} alt="test" />
      <Question text="이 앱 개발자의 핸드폰 잠금 해제 비밀번호를 입력해주세요." />
      <ShortAnswerForm handleSubmit={handlePhonePwdSubmit} />
    </div>
  ) : (
    <InvalidAccessDescription />
  );
};

export default VerifyPhonePwd;
