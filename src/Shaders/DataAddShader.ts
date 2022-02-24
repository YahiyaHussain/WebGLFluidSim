import textureDataAddFrag from "../src/texture_data_add.frag?raw";
import textureVert from "../src/texture.vert?raw";
import { compileShaders } from "../utils/webgl";
import { Shader } from "./AbstractShader";

export class DataAddShader extends Shader {
  protected program: WebGLShader;
  protected readonly uses_texture: boolean = true;
  constructor(
    protected gl: WebGL2RenderingContext,
    private tex1_loc: number,
    private tex2_loc: number
  ) {
    super();
    this.program = compileShaders(gl, textureVert, textureDataAddFrag);
  }

  private uniforms() {
    this.gl.useProgram(this.program);

    // lookup the sampler locations.
    var u_image1Location = this.gl.getUniformLocation(
      this.program,
      "u_texture_1"
    );
    var u_image2Location = this.gl.getUniformLocation(
      this.program,
      "u_texture_2"
    );

    // set which texture units to render with.
    this.gl.uniform1i(u_image1Location, this.tex1_loc); // texture unit 1
    this.gl.uniform1i(u_image2Location, this.tex2_loc); // texture unit 1
  }
  private attributes() {}

  use() {
    this.uniforms();
    this.attributes();
  }
}
