import { IsShader } from "../../Shaders/interfaces/IsShader";

export interface IsGeometry {
  draw(shader: IsShader, outputFB: WebGLFramebuffer | null): void;
}
