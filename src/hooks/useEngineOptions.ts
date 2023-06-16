import { useContext } from "react";
import { engineOptionsContext } from "../context/engineOptionsContext";

export const useEngineOptions = () => {
  return useContext(engineOptionsContext);
};
