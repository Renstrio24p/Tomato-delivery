
export type Props = {
    children: ReactNode;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    className?: HTMLAttributes<HTMLDivElement>["className"];
};