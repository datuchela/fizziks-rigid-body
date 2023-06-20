import { Material, densities } from "../engine/objects/materials.constants";
import { useEngineOptions } from "../hooks/useEngineOptions";

export const EngineToolbar = () => {
  const { mass, material, setMass, setMaterial } = useEngineOptions();

  return (
    <ul>
      <li>
        <fieldset>
          <legend>Mass (kgs)</legend>
          <input
            type="range"
            min={0}
            max={100}
            value={mass}
            onChange={(e) => setMass(parseInt(e.target.value))}
          />
          <input
            type="number"
            min={0}
            max={100}
            value={mass}
            onChange={(e) => setMass(parseInt(e.target.value))}
          />
        </fieldset>
      </li>
      <li>
        <fieldset>
          <legend>Material</legend>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value as Material)}
          >
            {[...densities].map(([material, density]) => (
              <option value={material}>{`${material} - ${density.toFixed(
                0
              )} kg/m^2`}</option>
            ))}
          </select>
        </fieldset>
      </li>
    </ul>
  );
};
