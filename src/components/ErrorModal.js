import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ErrorModal() {
  const { error } = useSelector((state) => state);
  const dispatch = useDispatch();
  const closeError = () => {
    dispatch({
      type: "HIDE_ERROR",
    });
  };
  if (!error) return null;
  return (
    <div className="error-modal">
      <div onClick={closeError} className="close-btn"></div>
      {error}
    </div>
  );
}
