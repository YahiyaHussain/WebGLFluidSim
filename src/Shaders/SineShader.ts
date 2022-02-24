import sineFrag from "./src/sine.frag?raw";
import basicVert from "./src/basic.vert?raw";
import { compileShaders } from "../utils/webgl";
import { Shader } from "./AbstractShader";

export class SineShader extends Shader {
  protected program: WebGLShader;
  protected readonly uses_texture: boolean = false;
  constructor(
    protected gl: WebGL2RenderingContext,
    private ms_per_cycle: number
  ) {
    super();
    this.program = compileShaders(gl, basicVert, sineFrag);
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

    var angleRadLocation = this.gl.getUniformLocation(
      this.program,
      "u_angle_rad"
    );
    const now = new Date();
    const ms = 1000 * now.getSeconds() + now.getMilliseconds();
    this.gl.uniform1f(
      angleRadLocation,
      (2 * Math.PI * (ms % this.ms_per_cycle)) / this.ms_per_cycle
    );
  }
  private attributes() {}

  use() {
    this.uniforms();
    this.attributes();
  }
}
