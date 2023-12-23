"use client";
import Description from "@/components/Description/Description";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleClickNext = (e) => {
    e.preventDefault();
    router.push("/verify-name");
  };

  const descText = (
    <p>
      오셨군요... 안녕하십니까? 저는 산타입니다. 당신을 위한 크리스마스 선물을
      준비했습니다. 하지만 선물을 얻기 위해서는 제가 준비한 질문에 올바른 답을
      해주셔야만 합니다.
      <br />
      자, 시작해 볼까요?
    </p>
  );

  return (
    <div>
      <h2 className="a11yHidden">Home</h2>
      <Description text={descText} />
      <button onClick={handleClickNext}>다음</button>
    </div>
  );
}
