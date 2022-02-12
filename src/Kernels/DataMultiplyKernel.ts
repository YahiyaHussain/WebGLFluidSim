import {
  addUVPointsToPositionBuffer,
  addUVPointsToTexCoordBuffer,
  UVPoint,
} from "../data-structures/webgl";
import { WebGLContinueKernel } from "./interfaces/WebGLContinueKernel";
import { compileShaders } from "../utils/webgl";
import textureMultiplyFrag from "./shaders/texture_multiply.frag?raw";
import textureVert from "./shaders/texture.vert?raw";
import { TextureKernel } from "./TextureKernel";

export class DataMultiplyKernel implements WebGLContinueKernel {
  private _data: Uint8Array;
  private dataTexture: WebGLTexture;
  private program: WebGLProgram | undefined;
  private positionBuffer: WebGLBuffer | undefined;
  private texCoordBuffer: WebGLBuffer | undefined;
  constructor(
    private gl: WebGL2RenderingContext,
    private points: UVPoint[],
    private width: number,
    private height: number
  ) {
    const dataTexture = gl.createTexture();
    if (!dataTexture) {
      throw "Couldn't create texture";
    }
    this.dataTexture = dataTexture;
    this.program = compileShaders(this.gl, textureVert, textureMultiplyFrag);
    const positionBuffer = this.gl.createBuffer();
    if (!positionBuffer) {
      const err = "failed to make position buffer";
      console.error(err);
      alert(err);
      return;
    }
    addUVPointsToPositionBuffer(this.gl, positionBuffer, this.points);
    this.positionBuffer = positionBuffer;

    const texCoordBuffer = this.gl.createBuffer();
    if (!texCoordBuffer) {
      const err = "failed to make texcoord buffer";
      console.error(err);
      alert(err);
      return;
    }
    addUVPointsToTexCoordBuffer(this.gl, texCoordBuffer, this.points);
    this.texCoordBuffer = texCoordBuffer;

    this.data(new Array(4 * this.width * this.height).fill(255));
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

  private uniforms() {
    if (!this.program) {
      return;
    }
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
    this.gl.uniform1i(u_image1Location, 0); // texture unit 0
    this.gl.uniform1i(u_image2Location, 1); // texture unit 1
  }

  private attributes() {
    if (!this.program || !this.positionBuffer || !this.texCoordBuffer) {
      return;
    }
    this.gl.useProgram(this.program);
    var positionAttributeLocation = this.gl.getAttribLocation(
      this.program,
      "a_position"
    );
    this.gl.enableVertexAttribArray(positionAttributeLocation);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2; // 2 components per iteration
    var type = this.gl.FLOAT; // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0; // start at the beginning of the buffer
    this.gl.vertexAttribPointer(
      positionAttributeLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );

    const texcoordAttributeLocation = this.gl.getAttribLocation(
      this.program,
      "a_texcoord"
    );
    this.gl.enableVertexAttribArray(texcoordAttributeLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
    var size = 2; // 2 components per iteration
    var type = this.gl.FLOAT; // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0; // start at the beginning of the buffer
    this.gl.vertexAttribPointer(
      texcoordAttributeLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );
  }

  private textures(inputTexture: WebGLTexture) {
    this.gl.activeTexture(this.gl.TEXTURE0 + 1);
    // bind to the TEXTURE_2D bind point of texture unit 0
    this.gl.bindTexture(this.gl.TEXTURE_2D, inputTexture);

    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_S,
      this.gl.CLAMP_TO_EDGE
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_T,
      this.gl.CLAMP_TO_EDGE
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MIN_FILTER,
      this.gl.NEAREST
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MAG_FILTER,
      this.gl.NEAREST
    );

    this.gl.activeTexture(this.gl.TEXTURE0 + 0);
    // bind to the TEXTURE_2D bind point of texture unit 0
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.dataTexture);

    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_S,
      this.gl.CLAMP_TO_EDGE
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_T,
      this.gl.CLAMP_TO_EDGE
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MIN_FILTER,
      this.gl.NEAREST
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MAG_FILTER,
      this.gl.NEAREST
    );
  }

  public render(
    outputFB: WebGLFramebuffer | null,
    inputTexture: WebGLTexture
  ): void {
    if (!this.program || !this.positionBuffer || !this.texCoordBuffer) {
      return;
    }

    this.uniforms();
    this.attributes();
    this.textures(inputTexture);

    var primitiveType = this.gl.TRIANGLES;
    var offset = 0;
    var count = this.points.length;

    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, outputFB);
    this.gl.viewport(0, 0, this.width, this.height);
    this.gl.drawArrays(primitiveType, offset, count);
  }
}
