import { Material } from "../engine/objects";
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
            max={9000}
            value={mass}
            onChange={(e) => setMass(parseInt(e.target.value))}
          />
          <input
            type="number"
            min={0}
            max={9000}
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
            <option value={Material.Silicon}>Silicone</option>
            <option value={Material.Aluminium}>Aluminium</option>
          </select>
        </fieldset>
      </li>
    </ul>
  );
};
