"use client";
import Image from "next/image";
import classes from "../../containers/VerifyName/VerifyName.module.scss";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import questionSlice from "@/lib/redux/slices/question-slice";
import ShortAnswerForm from "@/components/ShortAnswerForm/ShortAnserForm";
import QuestionDescription from "@/components/QuestionDescription/QuestionDescription";
import { answers } from "@/constants/answers";

export default function Page() {
  const router = useRouter();

  const dispatch = useDispatch();

  const inputValue = useSelector((state) => state.question.inputValue);
  const questionPassed = useSelector((state) => state.question.questionPassed);

  useEffect(() => {
    dispatch(questionSlice.actions.changeNamePassed(false));
  }, [dispatch]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (inputValue === answers.name && questionPassed[0][1] === false) {
      dispatch(questionSlice.actions.changeNamePassed(true));
      router.push("/verify-phone-pwd");
    }
  };

  return (
    <div>
      <Image src="/images/icons/test.png" width={100} height={100} alt="test" />
      <QuestionDescription text="먼저 본인 확인 절차가 있겠습니다. 이름이 어떻게 되실까요?" />
      <ShortAnswerForm handleSubmit={handleNameSubmit} />
    </div>
  );
}
