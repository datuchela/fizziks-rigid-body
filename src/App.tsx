import { Canvas } from "./components/Canvas";

import classNames from "./App.module.css";
import { SpawnedObjects } from "./components/SpawnedObjects";


function App() {

	return (
		<>
			<div className={classNames.App}>
				<main className={classNames.main}>
					<Canvas />
				</main>
				<aside className={classNames.aside}>
					<SpawnedObjects />
				</aside>
			</div>
		</>
	);
}

export default App;
