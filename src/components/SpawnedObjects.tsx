import { useState } from "react";
import { type EngineObject } from "../engine/engineState";

export const SpawnedObjects = () => {
	const [objects, setObjects] = useState<EngineObject[]>([]);

	function handleDeleteObject(id: string) {
		setObjects((prev) => prev.filter((obj) => obj.id !== id));
	}

	return (
		<div>
			<ul>
				{objects.map((obj) => (
					<li key={obj.id}>
						{obj.id}
						<button onClick={() => handleDeleteObject(obj.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
};
