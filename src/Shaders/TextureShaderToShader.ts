import { UVPoint } from "../utils/webgl";
import { Shader } from "./AbstractShader";
import { IsShader } from "./interfaces/IsShader";
import { IsTextureShader } from "./interfaces/IsTextureShader";

export class TextureShaderToShader implements IsShader {
  constructor(
    private textureShader: IsTextureShader,
    private input_texture: WebGLTexture
  ) {}

  public usePositions(points: UVPoint[]): void {
    this.textureShader.usePositions(points);
  }

  public use() {
    this.textureShader.use(this.input_texture);
  }
}
