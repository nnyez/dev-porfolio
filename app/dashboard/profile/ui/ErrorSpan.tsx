"use client";
import React from "react";


export function ErrorSpan({ message }: { message: string; }) {
  if (message === "undefined" || message === "") return null;
  return <span className="text-sm text-red-500">{message}</span>;
}
