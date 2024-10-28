
export type State = "Sign Up" | "Sign In";

export type Props = {
    setShowLogin: Dispatch<SetStateAction<boolean>>;
};

export type LoginState = {
    name?: string;
    email: string;
    password: string;
    image: File | null;
}