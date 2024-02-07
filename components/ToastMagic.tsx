"use client";
import React, { useState } from "react";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

interface ToastProps {
  state: ToastState;
  message: string;
  onClose: () => void;
}

enum ToastState {
  Success = "success",
  Error = "error",
  Warning = "warn",
}

const ToastMagic: React.FC<ToastProps> = ({ state, message, onClose }) => {
  switch (state) {
    case ToastState.Success:
      return (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">{message}</div>
          <Toast.Toggle onClick={onClose} />
        </Toast>
      );
    case ToastState.Warning:
      return (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
            <HiExclamation className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">{message}</div>
          <Toast.Toggle onClick={onClose} />
        </Toast>
      );
    default:
      return null;
  }
};

export default ToastMagic;
