import { IsGeometry } from "../Geometries/interfaces/IsGeometry";
import { IsTextureShader } from "../Shaders/interfaces/IsTextureShader";
import { TextureShaderToShader } from "../Shaders/TextureShaderToShader";
import { TextureSettings } from "../utils/webgl";
import { PingPong } from "./PingPong";

export class ParallelRenderSequence {
  private pingPong: PingPong;
  constructor(
    gl: WebGL2RenderingContext,
    private geometry: IsGeometry,
    textureSettings: TextureSettings,
    initialTexture: WebGLTexture | undefined = undefined
  ) {
    this.pingPong = new PingPong(gl, textureSettings, initialTexture);
  }

  public apply(
    textureShader: IsTextureShader,
    textureSubscriber: (texture: WebGLTexture) => void = (
      texture: WebGLTexture
    ) => {}
  ) {
    const [fb_out, tex_in] = this.pingPong.swapGet();
    this.geometry.draw(
      new TextureShaderToShader(textureShader, tex_in),
      fb_out
    );

    const [_, tex_out] = this.pingPong.peek();
    textureSubscriber(tex_out);
    return this;
  }

  public render(
    textureShader: IsTextureShader,
    outputFB: WebGLFramebuffer | null
  ) {
    const [_, tex_in] = this.pingPong.peek();

    this.geometry.draw(
      new TextureShaderToShader(textureShader, tex_in),
      outputFB
    );
  }
}
