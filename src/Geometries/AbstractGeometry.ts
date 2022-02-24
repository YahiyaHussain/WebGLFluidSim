import { IsShader } from "../Shaders/interfaces/IsShader";
import { UVPoint } from "../utils/webgl";
import { IsGeometry } from "./interfaces/IsGeometry";

export abstract class Geometry implements IsGeometry {
  protected abstract points: UVPoint[];
  protected abstract primitive: number;
  protected abstract gl: WebGL2RenderingContext;

  public draw(shader: IsShader, outputFB: WebGLFramebuffer | null) {
    const offset = 0;
    var count = this.points.length;

    shader.usePositions(this.points);
    shader.use();
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, outputFB);
    this.gl.drawArrays(this.primitive, offset, count);
  }
}
