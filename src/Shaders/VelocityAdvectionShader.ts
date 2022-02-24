import advectionFrag from "./src/velocity_advection.frag?raw";
import textureVert from "./src/texture.vert?raw";
import { compileShaders, useTexture, WrapType } from "../utils/webgl";
import { TextureShader } from "./AbstractTextureShader";

export class VelocityAdvectionShader extends TextureShader {
  protected program: WebGLShader;
  constructor(
    protected gl: WebGL2RenderingContext,
    private timestep: number,
    private velocityTextureIdx: number,
    private wrapType: WrapType
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
  }
  private attributes() {}

  use(input_texture: WebGLTexture) {
    this.gl.useProgram(this.program);
    this.uniforms();
    this.attributes();
    useTexture(this.gl, input_texture, this.velocityTextureIdx, this.wrapType);
  }
}
