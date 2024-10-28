import { create } from "zustand";

type UrlStore = {
    url: string;
    setUrl: (url: string) => void;
}

export const useStore = create<UrlStore>((set) => ({
    url: "http://localhost:8080",
    setUrl: (url) => set({ url }),
}))