import {
  setShaderPositions,
  setShaderTextureCoords,
  UVPoint,
} from "../utils/webgl";
import { IsShader } from "./interfaces/IsShader";

export abstract class Shader implements IsShader {
  protected abstract gl: WebGL2RenderingContext;
  protected abstract program: WebGLShader;
  protected abstract readonly uses_texture: boolean;

  public abstract use(): void;

  public usePositions(points: UVPoint[]): void {
    if (!this.gl || !this.program) {
      throw "Cannot call usePositions on baseShader without extending it first";
    }

    setShaderPositions(this.gl, this.program, points);
    if (this.uses_texture) {
      setShaderTextureCoords(this.gl, this.program, points);
    }
  }
}
