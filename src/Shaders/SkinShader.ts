import advectionFrag from "./src/dye_advection.frag?raw";
import textureVert from "./src/texture.vert?raw";
import { compileShaders, useTexture, WrapType } from "../utils/webgl";
import { Shader } from "./AbstractShader";

export class SkinShader extends Shader {
  protected program: WebGLShader;
  protected readonly uses_texture: boolean = true;
  constructor(
    protected gl: WebGL2RenderingContext,
    private timestep: number,
    private velocityTexture: WebGLTexture,
    private dyeTextureIdx: number,
    private velocityTextureIdx: number
  ) {
    super();
    this.program = compileShaders(gl, textureVert, advectionFrag);
  }

  private uniforms() {
    this.gl.uniform2fv(
      this.gl.getUniformLocation(this.program, "u_viewportCoord"),
      [this.gl.canvas.width, this.gl.canvas.height]
    );

    this.gl.uniform1f(
      this.gl.getUniformLocation(this.program, "u_timestep"),
      this.timestep
    );

    // set which texture units to render with.
    this.gl.uniform1i(
      this.gl.getUniformLocation(this.program, "u_velocity_texture"),
      this.velocityTextureIdx
    ); // texture unit 1
    this.gl.uniform1i(
      this.gl.getUniformLocation(this.program, "u_dye_texture"),
      this.dyeTextureIdx
    ); // texture unit 1
  }
  private attributes() {}

  use() {
    this.gl.useProgram(this.program);
    this.uniforms();
    this.attributes();
    useTexture(
      this.gl,
      this.velocityTexture,
      this.velocityTextureIdx,
      WrapType.Clamp
    );
  }
}
