import spiralFrag from "./src/spiral_decode2d.frag?raw";
import textureVert from "./src/texture.vert?raw";
import { compileShaders, useTexture, WrapType } from "../utils/webgl";
import { TextureShader } from "./AbstractTextureShader";

export class SpiralDecode2DShader extends TextureShader {
  protected program: WebGLShader;
  constructor(protected gl: WebGL2RenderingContext, private tex_loc: number) {
    super();
    this.program = compileShaders(gl, textureVert, spiralFrag);
  }

  private uniforms() {
    this.gl.useProgram(this.program);

    var viewportCoordLocation = this.gl.getUniformLocation(
      this.program,
      "u_viewportCoord"
    );
    this.gl.uniform2fv(viewportCoordLocation, [
      this.gl.canvas.width,
      this.gl.canvas.height,
    ]);

    var u_image2Location = this.gl.getUniformLocation(
      this.program,
      "u_texture"
    );

    // set which texture units to render with.
    this.gl.uniform1i(u_image2Location, this.tex_loc);
  }
  private attributes() {}

  public use(input_texture: WebGLTexture): void {
    useTexture(this.gl, input_texture, this.tex_loc, WrapType.Clamp);
    this.gl.useProgram(this.program);
    this.uniforms();
    this.attributes();
  }
}
