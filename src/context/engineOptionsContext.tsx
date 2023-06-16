import { createContext, useState, useMemo } from "react";
import { Material } from "../engine/objects/materials.constants";

interface EngineContextProps {
  mass: number;
  material: Material;
  setMass: React.Dispatch<React.SetStateAction<number>>;
  setMaterial: React.Dispatch<React.SetStateAction<Material>>;
}

export const engineOptionsContext = createContext({
  mass: 0,
  material: Material.Silicon,
} as EngineContextProps);

export const EngineOptionsContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [mass, setMass] = useState(0);
  const [material, setMaterial] = useState(Material.Silicon);

  const memoizedState = useMemo(() => {
    return { mass, material, setMass, setMaterial };
  }, [mass, material, setMass, setMaterial]);

  return (
    <engineOptionsContext.Provider value={memoizedState}>
      {children}
    </engineOptionsContext.Provider>
  );
};
