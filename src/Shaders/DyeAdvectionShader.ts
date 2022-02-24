import advectionFrag from "./src/dye_advection.frag?raw";
import textureVert from "./src/texture.vert?raw";
import { compileShaders, useTexture, WrapType } from "../utils/webgl";
import { TextureShader } from "./AbstractTextureShader";

export class DyeAdvectionShader extends TextureShader {
  protected program: WebGLShader;
  private setVelTex: boolean = false;
  constructor(
    protected gl: WebGL2RenderingContext,
    private timestep: number,
    private dyeTextureIdx: number,
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
    this.gl.uniform1i(
      this.gl.getUniformLocation(this.program, "u_dye_texture"),
      this.dyeTextureIdx
    ); // texture unit 1
  }
  private attributes() {}

  public velocityTexture(velTex: WebGLTexture): DyeAdvectionShader {
    this.setVelTex = true;
    useTexture(this.gl, velTex, this.velocityTextureIdx, this.wrapType);
    return this;
  }

  use(dyeTexture: WebGLTexture) {
    if (!this.setVelTex) {
      throw "Did not set velocity texture yet for Dye Advection shader";
    }
    this.gl.useProgram(this.program);
    this.uniforms();
    this.attributes();

    useTexture(this.gl, dyeTexture, this.dyeTextureIdx, this.wrapType);
  }
}
