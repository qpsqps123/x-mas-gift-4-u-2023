"use client";
import Description from "@/components/Description/Description";
import { desc } from "@/constants/desc";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleClickNext = (e) => {
    e.preventDefault();
    router.push("/verify/name");
  };

  return (
    <div>
      <h2 className="a11yHidden">Home</h2>
      <Description text={desc["home"]} />
      <button onClick={handleClickNext}>다음</button>
    </div>
  );
}
