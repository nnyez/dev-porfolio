'use client';
import { ReactNode } from "react";

export function LabelIcon(text: string, children: ReactNode) {
  return (
    <div className="">
      {/* <label>{text}</label> */}
      {children}
    </div>
  );
}
