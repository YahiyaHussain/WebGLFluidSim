import { UVPoint } from "../../utils/webgl";

export interface IsTextureShader {
  use(input_texture: WebGLTexture): void;
  usePositions(points: UVPoint[]): void;
}
