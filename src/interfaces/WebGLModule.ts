import { ModuleSettings } from "../data-structures/webgl";

export interface WebGLModule {
  render(): void;
  debugRender(): void;
}

interface WebGLModuleCtor {
  new (gl: WebGL2RenderingContext, settings: ModuleSettings): WebGLModule;
}

export function createWebGLModule(
  ctor: WebGLModuleCtor,
  gl: WebGL2RenderingContext,
  settings: ModuleSettings
): WebGLModule {
  return new ctor(gl, settings);
}
