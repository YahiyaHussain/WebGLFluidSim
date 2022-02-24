import blackFrag from "./src/black.frag?raw";
import basicVert from "./src/basic.vert?raw";
import { compileShaders } from "../utils/webgl";
import { Shader } from "./AbstractShader";

export class BlackShader extends Shader {
  protected program: WebGLShader;
  protected readonly uses_texture: boolean = false;
  constructor(protected gl: WebGL2RenderingContext) {
    super();
    this.program = compileShaders(gl, basicVert, blackFrag);
  }

  private uniforms() {}
  private attributes() {}

  use() {
    this.gl.useProgram(this.program);
    this.uniforms();
    this.attributes();
  }
}
