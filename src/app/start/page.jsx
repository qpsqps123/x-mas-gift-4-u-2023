"use client";
import React, { useLayoutEffect } from "react";
import classes from "@/containers/Start/Start.module.scss";
import { desc } from "@/constants/desc";
import Description from "@/components/Description/Description";
import NextPageButton from "@/components/NextPageButton/NextPageButton";
import { useRouter } from "next/navigation";

export default function Start() {
  const router = useRouter();

  useLayoutEffect(() => {
    document
      .getElementById("backCurtain")
      .classList.remove("closeBackCurtainAnimation");
    document
      .getElementById("midCurtain")
      .classList.remove("closeMidCurtainAnimation");
    document
      .getElementById("frontCurtain")
      .classList.remove("closeFrontCurtainAnimation");
  }, []);

  const handleClickNext = (e) => {
    e.preventDefault();

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
      router.push("/verify/name");
    }, 2000);
  };

  return (
    <div className={classes.container}>
      <h2 className="a11yHidden">Home</h2>
      <Description text={desc["home"]} />
      <NextPageButton handleClick={handleClickNext} />
    </div>
  );
}
