import { Props } from "./types/Props";

export function Section({ children, className, id }: Props) {
  return (
    <main className={className} id={id}>
      {children}
    </main>
  );
}
