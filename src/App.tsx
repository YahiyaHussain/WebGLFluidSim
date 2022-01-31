import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import { BasicModule } from "./implementations/BasicModule";
import { WebGLModule } from "./interfaces/WebGLModule";
import { SineModule } from "./implementations/SineModule";
import { GridModule } from "./implementations/GridModule";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Checkbox,
  Slider,
} from "@mui/material";
import { ModuleSettings } from "./data-structures/webgl";

function setupCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  animRef: React.MutableRefObject<number>,
  createModule: (gl: WebGL2RenderingContext) => WebGLModule,
  debug: boolean = false
) {
  if (!canvasRef || !canvasRef.current) {
    return;
  }
  cancelAnimationFrame(animRef.current);

  const canvas = canvasRef.current;
  const gl = canvas.getContext("webgl2");
  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }

  console.log("Setting up canvas...");
  const module = createModule(gl);
  function update() {
    if (debug) {
      module.debugRender();
    } else {
      module.render();
    }
    animRef.current = requestAnimationFrame(update);
  }
  animRef.current = requestAnimationFrame(update);
}

function App() {
  let canvasRef = React.useRef<HTMLCanvasElement>(null);
  let animRef = React.useRef(-1);
  const [showGrid, setShowGrid] = useState(false);
  const [res, setRes] = useState(10);
  const [spacing, setSpacing] = useState(1);

  useEffect(() => {
    const settings = new ModuleSettings(
      (res * window.innerWidth) / window.innerHeight,
      res,
      spacing
    );
    const createModule = (gl: WebGL2RenderingContext) =>
      new GridModule(gl, settings);
    console.log("settings.grid_spacing", settings.grid_spacing);
    setupCanvas(canvasRef, animRef, createModule, showGrid);
  }, [canvasRef, showGrid, res, spacing]);

  return (
    <div
      style={{
        backgroundColor: "black",
        display: "flex",
        flex: 1,
        flexDirection: "column",
      }}
    >
      <Accordion
        sx={{
          position: "fixed",
          right: 0,
          backgroundColor: "#111",
          color: "#eee",
          width: "15%",
        }}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography style={{ margin: "auto" }}>Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Checkbox
            sx={{ color: "white", display: "inline" }}
            onChange={() => setShowGrid(!showGrid)}
          ></Checkbox>
          <Typography sx={{ display: "inline" }}>show grid</Typography>

          <Slider
            sx={{ width: "50%" }}
            value={res}
            min={1}
            max={50}
            onChange={(e: Event, v: number | number[]) => setRes(v as number)}
          />
          <Typography sx={{ display: "inline" }}> res</Typography>

          <Slider
            sx={{ width: "50%" }}
            value={spacing}
            min={1}
            max={50}
            step={1}
            onChange={(e: Event, v: number | number[]) => {
              console.log("v", v);
              setSpacing(v as number);
            }}
          />
          <Typography sx={{ display: "inline" }}> spacing</Typography>
        </AccordionDetails>
      </Accordion>
      <canvas
        ref={canvasRef}
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "grey",
          imageRendering: "pixelated",
        }}
      ></canvas>
    </div>
  );
}

export default App;
