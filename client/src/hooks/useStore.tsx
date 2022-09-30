import { rootStoreContext } from "@/store";
import { useContext } from "react";




export const useStore = () => useContext(rootStoreContext);
