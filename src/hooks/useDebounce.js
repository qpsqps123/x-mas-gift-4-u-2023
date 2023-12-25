"use client";
import uiSlice from "@/lib/redux/slices/ui-slice";
import { useDispatch } from "react-redux";

/**
 * 디바운스 기능 함수를 가진 커스텀 훅
 * @returns {object} 객체에 디바운스 함수를 담아 반환합니다.
 */
const useDebounce = () => {
  const dispatch = useDispatch();

  /**
   * 사용자가 유효하지 않은 값을 입력했을 때, 인자로 넘겨준 시간만큼 알림을 표시합니다. 본 함수는 디바운스 처리되었습니다.
   * @param {number} showDuration 알림을 표시하는 시간입니다.
   */
  const debouncedInvalidAnsweDescAlert = (showDuration) => {
    const hideInvalidAnswerDescriptioin = () => {
      dispatch(uiSlice.actions.setAnswerInvalid(false));
    };
    clearTimeout(hideInvalidAnswerDescriptioin);

    dispatch(uiSlice.actions.setAnswerInvalid(true));

    setTimeout(hideInvalidAnswerDescriptioin, showDuration);
  };

  return {
    debouncedInvalidAnsweDescAlert,
  };
};

export default useDebounce;
