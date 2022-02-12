import "./App.css";
import React, { useEffect, useState } from "react";
import { BasicModule } from "./Modules/BasicModule";
import { WebGLModule } from "./Modules/interfaces/WebGLModule";
import { SineModule } from "./Modules/SineModule";
import { GridModule } from "./Modules/GridModule";
import { ModuleSettings } from "./data-structures/webgl";
import { SequencerModule } from "./Modules/SequencerModule";
import { RingModule } from "./Modules/RingModule";
import UI from "./UI";
import { ConwayModule } from "./Modules/ConwayModule";
import { Module } from "./data-structures/webgl";

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

function getModule(
  canvas: HTMLCanvasElement,
  moduleType: Module,
  settings: ModuleSettings
): WebGLModule {
  switch (moduleType) {
    case Module.Basic:
      return new BasicModule(canvas, settings);
    case Module.Conway:
      return new ConwayModule(canvas, settings);
    case Module.Grid:
      return new GridModule(canvas, settings);
    case Module.Ring:
      return new RingModule(canvas, settings);
    case Module.Sequencer:
      return new SequencerModule(canvas, settings);
    case Module.Sine:
      return new SineModule(canvas, settings);
    default:
      return new BasicModule(canvas, settings);
  }
}

function App() {
  let canvasRef = React.useRef<HTMLCanvasElement>(null);
  let animRef = React.useRef(-1);
  const [showGrid, setShowGrid] = useState(false);
  const [res, setRes] = useState(30);
  const [spacing, setSpacing] = useState(1);
  const [module, setModule] = useState(Module.Basic);

  useEffect(() => {
    const settings = new ModuleSettings(
      Math.round((res * window.innerWidth) / window.innerHeight),
      res,
      spacing
    );
    console.log(`x: ${settings.res_x}`, `y: ${settings.res_y}`);
    const createModule = (canvas: HTMLCanvasElement) =>
      getModule(canvas, module, settings);
    console.log("settings.grid_spacing", settings.grid_spacing);
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
      ></UI>
    </div>
  );
}

export default App;
