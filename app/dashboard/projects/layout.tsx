"use client";
import { Project } from "@/app/lib/types";
import { useState } from "react";
import ModalProject from "./ui/ModalProject";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="min-w-full">{children}</section>;
}
