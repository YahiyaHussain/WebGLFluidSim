import textureConwayFrag from "./src/texture_conway.frag?raw";
import textureVert from "./src/texture.vert?raw";
import { compileShaders, useTexture, WrapType } from "../utils/webgl";
import { TextureShader } from "./AbstractTextureShader";

export class ConwayShader extends TextureShader {
  protected program: WebGLShader;
  constructor(protected gl: WebGL2RenderingContext) {
    super();
    this.program = compileShaders(gl, textureVert, textureConwayFrag);
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
  }
  private attributes() {}

  use(inputTexture: WebGLTexture) {
    useTexture(this.gl, inputTexture, 0, WrapType.Clamp);
    this.uniforms();
    this.attributes();
  }
}
