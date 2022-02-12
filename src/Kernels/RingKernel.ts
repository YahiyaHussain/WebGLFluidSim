import { WebGLStartKernel } from "./interfaces/WebGLStartKernel";
import sine_frag from "./shaders/sine.frag?raw";
import black_frag from "./shaders/black.frag?raw";
import basic_vert from "./shaders/basic.vert?raw";
import { compileShaders } from "../utils/webgl";
import {
  addClipPointsToPositionBuffer,
  addUVPointsToPositionBuffer,
  ClipPoint,
  UVPoint,
} from "../data-structures/webgl";

export class RingKernel implements WebGLStartKernel {
  private program: WebGLProgram | undefined;
  private points: UVPoint[];
  private positionBuffer: WebGLBuffer | undefined;
  constructor(
    private gl: WebGL2RenderingContext,
    points: UVPoint[],
    private width: number,
    private height: number
  ) {
    this.points = [
      new UVPoint(1 / this.width / 2, 1 - 1 / this.height / 2), // top border
      new UVPoint(1 - 1 / this.width / 2, 1 - 1 / this.height / 2),
      new UVPoint(1 - 1 / this.width / 2, 1 / this.height / 2),
      new UVPoint(0, 1 / this.height / 2),
      new UVPoint(1 / this.width / 2, 1 - 1 / this.height / 2),
    ];
    this.program = compileShaders(this.gl, basic_vert, sine_frag);
    const positionBuffer = this.gl.createBuffer();
    if (!positionBuffer) {
      const err = "failed to make position buffer";
      console.error(err);
      alert(err);
      return;
    }
    addUVPointsToPositionBuffer(this.gl, positionBuffer, this.points);
    this.positionBuffer = positionBuffer;
  }
  private uniforms() {
    if (!this.program) {
      return;
    }
    this.gl.useProgram(this.program);
    var viewportCoordLocation = this.gl.getUniformLocation(
      this.program,
      "u_viewportCoord"
    );
    this.gl.uniform2fv(viewportCoordLocation, [this.width, this.height]);
    var angleRadLocation = this.gl.getUniformLocation(
      this.program,
      "u_angle_rad"
    );
    const now = new Date();
    const ms = 1000 * now.getSeconds() + now.getMilliseconds();
    this.gl.uniform1f(angleRadLocation, (2 * Math.PI * (ms % 3000)) / 3000);
  }
  private attributes() {
    if (!this.program || !this.positionBuffer) {
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
    var normalize = true; // don't normalize the data
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
  }
  public render(outputFB: WebGLFramebuffer | null): void {
    if (!this.program || !this.positionBuffer) {
      return;
    }

    this.uniforms();
    this.attributes();

    var primitiveType = this.gl.LINE_STRIP;
    var offset = 0;
    var count = this.points.length;
    this.gl.viewport(0, 0, this.width, this.height);

    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, outputFB);
    this.gl.clearColor(0.5, 0.5, 0.5, 0.9);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    // Clear the color and depth buffer
    this.gl.drawArrays(primitiveType, offset, count);
  }
}
