"use client";
import { useLayoutEffect } from "react";

export default function Landing() {
  useLayoutEffect(() => {
    setTimeout(() => {
      window.location.href = "/start";
    }, 4000);
  }, []);

  return;
}
