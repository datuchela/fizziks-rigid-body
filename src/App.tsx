import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Canvas } from "./components/Canvas";

import classNames from "./App.module.css";
import { SpawnedObjects } from "./components/SpawnedObjects";

export let socket = io("http://localhost:5000/");

function App() {
	const [count, setCount] = useState(0);

	useEffect(() => {
		socket.on("increment", (newCount: number) => {
			console.log(newCount);
			setCount(newCount);
		});

		return () => {
			socket.off("increment");
		};
	}, []);

	function handleIncrement() {
		setCount((prev) => {
			const newCount = prev + 1;
			socket.emit("increment", newCount);
			return newCount;
		});
	}

	return (
		<>
			<button onClick={handleIncrement}>count is {count}</button>
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
