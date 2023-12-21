"use client";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleClickNext = (e) => {
    e.preventDefault();
    router.push("/verify-name");
  };

  return (
    <div>
      <h2 className="a11yHidden">Home</h2>
      <p>
        오셨군요... 당신만을 위한 크리스마스 선물을 준비해봤습니다.
        시작해볼까요?
      </p>
      <button onClick={handleClickNext}>다음</button>
    </div>
  );
}
