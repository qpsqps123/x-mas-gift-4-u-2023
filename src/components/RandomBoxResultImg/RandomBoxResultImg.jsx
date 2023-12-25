"use client";
import { giftList } from "@/constants/giftList";
import Image from "next/image";
import { useSelector } from "react-redux";

const RandomBoxResultImg = ({ giftImgRef }) => {
  const randomBoxNum = useSelector((state) => state.ui.randomBoxNum);

  return randomBoxNum ? (
    <Image
      src={giftList[randomBoxNum][1]}
      width={100}
      height={130}
      alt="Gift photo"
      ref={giftImgRef}
      priority={true}
    />
  ) : (
    ""
  );
};

export default RandomBoxResultImg;
