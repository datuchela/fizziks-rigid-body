import { createContext, useState, useMemo, useCallback } from "react";
import { Material } from "../engine/objects/materials.types";

interface EngineContextProps {
  mass: number;
  material: Material;
  changeMass: (newMass: number) => void;
  changeMaterial: (newMaterial: Material) => void;
}

export const engineOptionsContext = createContext({
  mass: 0,
  material: Material.Silicon,
} as EngineContextProps);

export const EngineOptionsContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [mass, setMass] = useState(20);
  const [material, setMaterial] = useState(Material.Silicon);

  const changeMass = useCallback((newMass: number) => {
    setMass(newMass);
  }, []);

  const changeMaterial = useCallback((newMaterial: Material) => {
    setMaterial(newMaterial);
  }, []);

  const memoizedState = useMemo(() => {
    return { mass, material, changeMass, changeMaterial };
  }, [mass, material]);

  return (
    <engineOptionsContext.Provider value={memoizedState}>
      {children}
    </engineOptionsContext.Provider>
  );
};
