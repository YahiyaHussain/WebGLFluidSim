import textureFrag from "./src/texture.frag?raw";
import textureVert from "./src/texture.vert?raw";
import { compileShaders, useTexture, WrapType } from "../utils/webgl";
import { TextureShader } from "./AbstractTextureShader";

export class TextureRenderShader extends TextureShader {
  protected program: WebGLShader;
  constructor(protected gl: WebGL2RenderingContext, private tex_loc: number) {
    super();
    this.program = compileShaders(gl, textureVert, textureFrag);
  }

  private uniforms() {
    this.gl.useProgram(this.program);

    // set which texture units to render with.
    this.gl.uniform1i(
      this.gl.getUniformLocation(this.program, "u_texture"),
      this.tex_loc
    );
  }
  private attributes() {}

  use(input_texture: WebGLTexture) {
    useTexture(this.gl, input_texture, this.tex_loc, WrapType.Clamp);
    this.gl.useProgram(this.program);
    this.uniforms();
    this.attributes();
  }
}
