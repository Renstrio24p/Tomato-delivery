import { Props } from "./types/Props";

export function Form({ children, className, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
}
