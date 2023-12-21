"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import QuestionDescription from "@/components/QuestionDescription/QuestionDescription";
import ShortAnswerForm from "@/components/ShortAnswerForm/ShortAnserForm";

export default function Question1() {
  const router = useRouter();

  const handleDevNameSubmit = (e) => {
    e.preventDefault();
    alert("다음으로");
  };

  return (
    <div>
      <Image src="/images/icons/test.png" width={100} height={100} alt="test" />
      <QuestionDescription text="먼저 본인 확인 절차가 있겠습니다. 이름이 어떻게 되실까요?" />
      <ShortAnswerForm handleSubmit={handleDevNameSubmit} />
    </div>
  );
}
