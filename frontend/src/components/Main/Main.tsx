import { ReactNode } from "@tanstack/react-router";
import { HTMLAttributes } from "react";

type Props = {
  children: ReactNode;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  id?: string;
  onClick?: () => void;
};

export default function Main({ children, className, id, onClick }: Props) {
  return (
    <main className={className} id={id} onClick={onClick}>
      {children}
    </main>
  );
}
