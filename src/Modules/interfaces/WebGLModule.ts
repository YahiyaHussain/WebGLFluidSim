import { ModuleSettings } from "../../data-structures/webgl";

export interface WebGLModule {
  render(): void;
  debugRender(): void;
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
