import { Canvas } from "./components/Canvas";

import classNames from "./App.module.css";


function App() {

	return (
		<>
			<div className={classNames.App}>
				<main className={classNames.main}>
					<Canvas />
				</main>
			</div>
		</>
	);
}

export default App;
