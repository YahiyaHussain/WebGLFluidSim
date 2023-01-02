import { ModuleSettings } from "../../utils/webgl";

export interface WebGLModule {
  render(): void;
  debugRender(): void;
  getInstructions(): string;
}

interface WebGLModuleCtor {
  new (canvas: HTMLCanvasElement, settings: ModuleSettings): WebGLModule;
}

export function createWebGLModule(
  ctor: WebGLModuleCtor,
  canvas: HTMLCanvasElement,
  settings: ModuleSettings
): WebGLModule {
  return new ctor(canvas, settings);
}
