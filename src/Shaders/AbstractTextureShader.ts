import {
  setShaderPositions,
  setShaderTextureCoords,
  UVPoint,
} from "../utils/webgl";
import { IsTextureShader } from "./interfaces/IsTextureShader";

export abstract class TextureShader implements IsTextureShader {
  protected abstract gl: WebGL2RenderingContext;
  protected abstract program: WebGLShader;

  public abstract use(input_texture: WebGLTexture): void;

  public usePositions(points: UVPoint[]): void {
    if (!this.gl || !this.program) {
      throw "Cannot call usePositions on baseShader without extending it first";
    }

    setShaderPositions(this.gl, this.program, points);
    setShaderTextureCoords(this.gl, this.program, points);
  }
}
