"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "@/containers/VerifyPhonePwd/VerifyPhonePwd.module.scss";
import useValidateProperAccess from "@/hooks/useValidateProperAccess";
import questionSlice from "@/lib/redux/slices/question-slice";
import ShortAnswerForm from "@/components/ShortAnswerForm/ShortAnswerForm";
import InvalidAccessDescription from "@/components/InvalidAccessDescription/InvalidAccessDescription";
import uiSlice from "@/lib/redux/slices/ui-slice";
import { answerList } from "@/constants/answerList";
import InvalidAnswerDescription from "@/components/InvalidAnswerDescription/InvalidAnswerDescription";
import Description from "@/components/Description/Description";
import { desc } from "@/constants/desc";
import useDebounce from "@/hooks/useDebounce";

const VerifyPhonePwd = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const invalidAnswer = useSelector((state) => state.ui.invalidAnswer);

  const inputValue = useSelector((state) => state.question.inputValue);
  const questionPassed = useSelector((state) => state.question.questionPassed);

  const { validateProperAccess } = useValidateProperAccess();
  const { debouncedInvalidAnsweDescAlert } = useDebounce();

  useLayoutEffect(() => {
    dispatch(questionSlice.actions.phonePwdVerificationPassed(false));
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

  const handlePhonePwdSubmit = (e) => {
    e.preventDefault();
    if (inputValue === answerList.phonePwd && questionPassed[1][1] === false) {
      dispatch(questionSlice.actions.phonePwdVerificationPassed(true));

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
        router.replace("/question/sa/1");
      }, 2000);
    } else if (
      inputValue !== answerList.phonePwd &&
      questionPassed[1][1] === false
    ) {
      debouncedInvalidAnsweDescAlert(1500);
    }
  };

  const isProperAccess = validateProperAccess(1);

  return isProperAccess ? (
    <div className={classes.container}>
      <div className={classes.imgAndDescContainer}>
        <Image
          src="/images/pictures/heroinePhotos/heroinePhoto.webp"
          width={100}
          height={130}
          alt="Heroine photo"
          priority={true}
        />
        <Description text={desc["verifyPhonePwd"]} />
      </div>
      {invalidAnswer && <InvalidAnswerDescription />}
      <ShortAnswerForm handleSubmit={handlePhonePwdSubmit} />
    </div>
  ) : (
    <InvalidAccessDescription />
  );
};

export default VerifyPhonePwd;
