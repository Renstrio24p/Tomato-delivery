import { storeContext } from "@/context/StoreContext";
import { Props } from "./types/Props";
import { useContext } from "react";


export default function Container({ children, className }: Props) {
  const context = useContext(storeContext);
  if (!context) {
    throw new Error("Container must be used within a StoreContextProvider");
  }

  return <div className={className}>{children}</div>;
}
