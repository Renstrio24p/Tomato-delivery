
export type Props = {
    children: ReactNode;
    className?: HTMLAttributes<HTMLDivElement>["className"];
    id?: string;
    onClick?: () => void;
};