"use client";
import Image from "next/image";
import classes from "../../containers/OpenRandomBox/OpenRandomBox.module.scss";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import uiSlice from "@/lib/redux/slices/ui-slice";
import useValidateProperAccess from "@/hooks/useValidateProperAccess";
import InvalidAccessDescription from "@/components/InvalidAccessDescription/InvalidAccessDescription";
import Description from "@/components/Description/Description";
import { getRandomNumber } from "@/utils/getRandomNumber";
import { giftList } from "@/constants/giftList";
import RandomBoxResultImg from "@/components/RandomBoxResultImg/RandomBoxResultImg";
import { desc } from "@/constants/desc";

export default function OpenRandomBox() {
  const dispatch = useDispatch();

  const { validateProperAccess } = useValidateProperAccess();

  const randomBoxOpened = useSelector((state) => state.ui.randomBoxOpened);
  const randomBoxResultDesc = useSelector(
    (state) => state.ui.randomBoxResultDesc
  );

  const openRandomBoxbuttonRef = useRef(null);
  const giftContainerRef = useRef(null);
  const giftImgRef = useRef(null);
  const giftDescRef = useRef(null);

  useEffect(() => {
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

    if (openRandomBoxbuttonRef?.current) {
      openRandomBoxbuttonRef.current.classList.add(
        "openRandomBoxFloatAnimation"
      );
    }
  }, [dispatch]);

  const handleRandomBoxClick = () => {
    const randomNum = getRandomNumber(15);
    const currentDate = new Date();

    dispatch(uiSlice.actions.setRandomBoxOpened(true));
    dispatch(uiSlice.actions.setRandomBoxNum(randomNum));
    dispatch(uiSlice.actions.setRandomBoxResultDesc(giftList[randomNum][0]));

    if (openRandomBoxbuttonRef?.current) {
      openRandomBoxbuttonRef.current.classList.remove(
        "openRandomBoxFloatAnimation"
      );
      openRandomBoxbuttonRef.current.classList.add(
        "openRandomBoxShakeAndScaleAnimation"
      );
      setTimeout(() => {
        openRandomBoxbuttonRef.current.classList.remove(
          "openRandomBoxShakeAndScaleAnimation"
        );
        openRandomBoxbuttonRef.current.classList.add("openRandomBoxFadeOut");
      }, 5900);
    }
    if (giftContainerRef?.current) {
      giftContainerRef.current.classList.add("giftContainerPopAnimation");
    }
    if (giftImgRef?.current) {
      giftImgRef.current.classList.add("giftImgSpinAnimation");
    }
    if (giftDescRef?.current) {
      giftDescRef.current.classList.add("giftDescFadeInAnimation");
    }

    fetch(
      "https://jakejeong-firebase-default-rtdb.asia-southeast1.firebasedatabase.app/xMasGift4U/openedRandomBoxData.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          giftName: giftList[randomNum][0],
          Date: currentDate,
        }),
      }
    );
  };

  const giftDesc = <p ref={giftDescRef}>{randomBoxResultDesc}</p>;

  const isProperAccess = validateProperAccess(12);

  return isProperAccess ? (
    <div>
      <div className={classes.openRandomBoxContainer}>
        <Description text={desc["openRandomBox"]} />
        <button
          type="button"
          className={classes.openRandomBoxButton}
          onClick={!randomBoxOpened ? handleRandomBoxClick : null}
          ref={openRandomBoxbuttonRef}
        >
          <Image
            src="/images/icons/randomBox2.png"
            width={100}
            height={100}
            alt="test"
            priority={true}
            className={classes.randomBoxImg}
          />
        </button>
        <div className={classes.giftContainer} ref={giftContainerRef}>
          <RandomBoxResultImg giftImgRef={giftImgRef} />
          <Description text={giftDesc} />
        </div>
      </div>
    </div>
  ) : (
    <InvalidAccessDescription />
  );
}
