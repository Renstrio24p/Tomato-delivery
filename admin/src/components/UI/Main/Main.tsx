import { Props } from "./types/Props";

export function Main({ children, className, id, onClick }: Props) {
  return (
    <main className={className} id={id} onClick={onClick}>
      {children}
    </main>
  );
}
