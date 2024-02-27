"use client";
import * as React from "react";
import { createPortal } from "react-dom";

const Modal = ({ closeProfile }) => {
  return createPortal(
    <div className="absolute top-0 left-0 flex justify-center items-center z-40 bg-[rgba(0,0,0,0.5)] w-[100vw] h-[100vh]">
      <div>Modal</div>
      <button onClick={closeProfile}>Click</button>
    </div>,
    document.body
  );
};

export default Modal;
