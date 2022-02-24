import textureMultiplyFrag from "./src/texture_data_random.frag?raw";
import textureVert from "./src/texture.vert?raw";
import {
  compileShaders,
  createTexture,
  useTexture,
  WrapType,
} from "../utils/webgl";
import { TextureShader } from "./AbstractTextureShader";

export class DataRandomShader extends TextureShader {
  protected program: WebGLShader;
  private _dataTexture: WebGLTexture | undefined;
  private dataLen: number;

  constructor(
    protected gl: WebGL2RenderingContext,
    private dataTexLoc: number,
    private inputTexLoc: number
  ) {
    super();
    this.dataLen =
      4 * Math.round(gl.canvas.width) * Math.round(gl.canvas.height);
    this.program = compileShaders(gl, textureVert, textureMultiplyFrag);
  }

  private uniforms() {
    // lookup the sampler locations.
    var inputTexLoc = this.gl.getUniformLocation(this.program, "u_input_tex");
    var dataTexLoc = this.gl.getUniformLocation(this.program, "u_data_tex");

    // set which texture units to render with.
    this.gl.uniform1i(dataTexLoc, this.dataTexLoc); // texture unit 1
    this.gl.uniform1i(inputTexLoc, this.inputTexLoc); // texture unit 1
  }
  private attributes() {}

  dataTexture(texture: WebGLTexture) {
    this._dataTexture = texture;
    return this;
  }

  data(dataList: number[]) {
    if (dataList.length != this.dataLen) {
      throw `data list was found to have length: ${dataList.length}, but was expected to have 4 x width x height: ${this.dataLen}`;
    }

    if (this._dataTexture) {
      this.gl.deleteTexture(this._dataTexture);
    }
    const _data = new Uint8Array(dataList);
    this._dataTexture = createTexture(this.gl);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this._dataTexture);
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.gl.canvas.width,
      this.gl.canvas.height,
      0,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      _data
    );

    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MAG_FILTER,
      this.gl.NEAREST
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MIN_FILTER,
      this.gl.NEAREST
    );

    return this;
  }

  use(inputTexture: WebGLTexture) {
    if (!this._dataTexture) {
      throw "Must initialize data texture before using DataMultiplyShader";
    }
    useTexture(this.gl, this._dataTexture, 0, WrapType.Clamp);
    useTexture(this.gl, inputTexture, 1, WrapType.Clamp);

    this.gl.useProgram(this.program);
    this.uniforms();
    this.attributes();
  }
}
