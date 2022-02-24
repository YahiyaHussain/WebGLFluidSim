import { createTexture } from "../utils/webgl";
import { IsShader } from "./interfaces/IsShader";
import { TextureRenderShader } from "./TextureRenderShader";

export class DataShader extends TextureRenderShader implements IsShader {
  private dataTexture: WebGLTexture | undefined;
  private dataLen: number;
  protected readonly uses_texture: boolean = true;
  constructor(protected gl: WebGL2RenderingContext) {
    super(gl, 0);
    this.dataLen =
      4 * Math.round(gl.canvas.width) * Math.round(gl.canvas.height);
    this.data(new Array(this.dataLen).fill(255));
    this.setup();
  }

  data(dataList: number[]) {
    if (dataList.length != this.dataLen) {
      throw `data list was found to have length: ${dataList.length}, but was expected to have 4 x width x height: ${this.dataLen}`;
    }

    if (this.dataTexture) {
      this.gl.deleteTexture(this.dataTexture);
    }
    const _data = new Uint8Array(dataList);
    this.dataTexture = createTexture(this.gl);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.dataTexture);
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

  setup() {}

  use(): void {
    if (!this.dataTexture) {
      throw "Tried to use DataShader without initializing data";
    }
    super.use(this.dataTexture);
  }
}
