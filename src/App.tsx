import "./App.css";
import React, { useEffect, useState } from "react";
import { WebGLModule } from "./Modules/interfaces/WebGLModule";
import UI from "./UI";
import { getModule, ModuleSettings, ModuleType } from "./utils/webgl";

function App() {
  function setupCanvas(
    canvasRef: React.RefObject<HTMLCanvasElement>,
    animRef: React.MutableRefObject<number>,
    createModule: (canvas: HTMLCanvasElement) => WebGLModule,
    debug: boolean = false
  ) {
    if (!canvasRef || !canvasRef.current) {
      return;
    }
    cancelAnimationFrame(animRef.current);

    console.log("Setting up canvas...");
    const module = createModule(canvasRef.current);
    setInstructions(module.getInstructions());
    function update() {
      if (debug) {
        module.debugRender();
      } else {
        module.render();
      }
      animRef.current = requestAnimationFrame(update);
    }
    animRef.current = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animRef.current);
  }

  let canvasRef = React.useRef<HTMLCanvasElement>(null);
  let animRef = React.useRef(-1);
  const [showGrid, setShowGrid] = useState(false);
  const [res, setRes] = useState(300);
  const [spacing, setSpacing] = useState(1);
  const [module, setModule] = useState(ModuleType.Conway);
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    const settings = new ModuleSettings(
      // Math.round((res * window.innerWidth) / window.innerHeight),
      res,
      res,
      spacing
    );
    const createModule = (canvas: HTMLCanvasElement) =>
      getModule(canvas, module, settings);
    return setupCanvas(canvasRef, animRef, createModule, showGrid);
  }, [canvasRef, showGrid, res, spacing, module]);

  return (
    <div>
      <UI
        onCheckShowGrid={() => setShowGrid(!showGrid)}
        onChangeRes={setRes}
        res={res}
        onChangeSpacing={setSpacing}
        spacing={spacing}
        canvasRef={canvasRef}
        setModule={setModule}
        module={module}
        instructions={instructions}
      ></UI>
    </div>
  );
}

export default App;
