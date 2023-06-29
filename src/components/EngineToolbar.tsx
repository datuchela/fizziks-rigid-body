import { Material } from "../engine/objects/materials.types";
import { densities } from "../engine/objects/materials.constants";
import { useEngineOptions } from "../hooks/useEngineOptions";

const MAX_MASS = 9999999999;
const MAX_SLIDER_MASS = 9999;

export const EngineToolbar = () => {
  const { mass, material, changeMass, changeMaterial } = useEngineOptions();

  return (
    <ul>
      <li>
        <fieldset>
          <legend>Mass (kgs)</legend>
          <input
            type="range"
            min={0}
            max={MAX_SLIDER_MASS}
            value={mass}
            onChange={(e) => changeMass(parseInt(e.target.value))}
          />
          <input
            type="number"
            min={0}
            max={MAX_MASS}
            value={mass}
            onChange={(e) => changeMass(parseInt(e.target.value))}
          />
        </fieldset>
      </li>
      <li>
        <fieldset>
          <legend>Material</legend>
          <select
            value={material}
            onChange={(e) => changeMaterial(e.target.value as Material)}
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
