import carpetFrag from "./src/sierpinski_carpet.frag?raw";
import basicVert from "./src/basic.vert?raw";
import { compileShaders } from "../utils/webgl";
import { Shader } from "./AbstractShader";

export class SierpinskiCarpetShader extends Shader {
  protected program: WebGLShader;
  protected readonly uses_texture: boolean = false;
  constructor(protected gl: WebGL2RenderingContext) {
    super();
    this.program = compileShaders(gl, basicVert, carpetFrag);
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

  use() {
    this.gl.useProgram(this.program);
    this.uniforms();
    this.attributes();
  }
}
