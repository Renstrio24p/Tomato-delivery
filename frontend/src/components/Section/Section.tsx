import { Props } from "./types/Props";

export default function Section({ children, className, id, style }: Props) {
  return (
    <main className={className} style={style} id={id}>
      {children}
    </main>
  );
}
