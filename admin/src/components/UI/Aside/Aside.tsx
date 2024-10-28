import { Props } from "./types/Aside";

export function Aside({ children, className }: Props) {
  return <aside className={className}>{children}</aside>;
}
