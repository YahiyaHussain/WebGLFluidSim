import { UVPoint } from "../data-structures/webgl";
import { WebGLStartKernel } from "./interfaces/WebGLStartKernel";
import { compileShaders } from "../utils/webgl";
import { TextureKernel } from "./TextureKernel";

export class DataKernel implements WebGLStartKernel {
  private _data: Uint8Array;
  private dataTexture: WebGLTexture;
  private textureKernel: TextureKernel;
  constructor(
    private gl: WebGL2RenderingContext,
    private points: UVPoint[],
    private width: number,
    private height: number
  ) {
    this._data = new Uint8Array(
      new Array(4 * Math.round(this.width) * Math.round(this.height)).fill(0)
    );
    const dataTexture = gl.createTexture();
    if (!dataTexture) {
      throw "Couldn't create texture";
    }
    this.dataTexture = dataTexture;
    this.textureKernel = new TextureKernel(
      this.gl,
      this.points,
      this.width,
      this.height
    );
    this.setup();
  }

  data(dataList: number[]) {
    if (
      dataList.length !=
      4 * Math.round(this.width) * Math.round(this.height)
    ) {
      throw `data list was found to have length: ${
        dataList.length
      }, but was expected to have 4 x width x height: ${
        4 * Math.round(this.width) * Math.round(this.height)
      }`;
    }

    this.gl.deleteTexture(this.dataTexture);
    this._data = new Uint8Array(dataList.map((x) => x));
    const dataTexture = this.gl.createTexture();
    if (!dataTexture) {
      throw "Couldn't create texture";
    }
    this.dataTexture = dataTexture;
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.dataTexture);
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.width,
      this.height,
      0,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      this._data
    );
    return this;
  }

  setup() {
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.dataTexture);
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.width,
      this.height,
      0,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      this._data
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
  }
  render(outputFB: WebGLFramebuffer): void {
    this.textureKernel.render(outputFB, this.dataTexture);
  }
}
