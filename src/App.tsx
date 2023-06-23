import { Canvas } from "./components/Canvas";

import classNames from "./App.module.css";
import { EngineToolbar } from "./components/EngineToolbar";
import { EngineOptionsContextProvider } from "./context/engineOptionsContext";

function App() {
  return (
    <EngineOptionsContextProvider>
      <div className={classNames.App}>
        <nav>
          <EngineToolbar />
        </nav>
        <main className={classNames.main}>
          <Canvas />
        </main>
      </div>
    </EngineOptionsContextProvider>
  );
}

export default App;
