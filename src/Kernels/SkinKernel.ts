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

export class SkinKernel implements WebGLStartKernel {
  private program: WebGLProgram | undefined;
  //   private points: UVPoint[];
  private positionBuffer: WebGLBuffer | undefined;

  private skinPoints: UVPoint[];
  private corePoints: UVPoint[];
  private skinProgram: WebGLProgram | undefined;
  private coreProgram: WebGLProgram | undefined;
  private skinBuffer: WebGLProgram | undefined;
  private coreBuffer: WebGLProgram | undefined;
  constructor(
    private gl: WebGL2RenderingContext,
    points: UVPoint[],
    private width: number,
    private height: number
  ) {
    const x_unit = 1 / this.width / 2;
    const y_unit = 1 / this.height / 2;

    this.skinPoints = [
      new UVPoint(x_unit, 1 - y_unit), // top border
      new UVPoint(1 - x_unit, 1 - y_unit),
      new UVPoint(1 - x_unit, y_unit),
      new UVPoint(0, y_unit),
      new UVPoint(x_unit, 1 - y_unit),
    ];
    this.corePoints = [
      new UVPoint(x_unit * 2, 1 - y_unit * 2),
      new UVPoint(x_unit * 2, y_unit * 2),
      new UVPoint(1 - x_unit * 2, y_unit * 2),
      new UVPoint(x_unit * 2, 1 - y_unit * 2),
      new UVPoint(1 - x_unit * 2, y_unit * 2),
      new UVPoint(1 - x_unit * 2, 1 - y_unit * 2),
    ];
    this.program = compileShaders(this.gl, basic_vert, sine_frag);
    this.skinProgram = compileShaders(this.gl, basic_vert, sine_frag);
    this.coreProgram = compileShaders(this.gl, basic_vert, sine_frag);
    const skinBuffer = this.gl.createBuffer();
    const coreBuffer = this.gl.createBuffer();
    if (!skinBuffer || !coreBuffer) {
      const err = "failed to make position buffer(s)";
      console.error(err);
      alert(err);
      return;
    }
    addUVPointsToPositionBuffer(this.gl, skinBuffer, this.skinPoints);
    addUVPointsToPositionBuffer(this.gl, coreBuffer, this.corePoints);

    this.skinBuffer = skinBuffer;
    this.coreBuffer = coreBuffer;
  }
  private uniforms(program: WebGLProgram, cycle_offset: number = 0) {
    this.gl.useProgram(program);
    var viewportCoordLocation = this.gl.getUniformLocation(
      program,
      "u_viewportCoord"
    );
    this.gl.uniform2fv(viewportCoordLocation, [this.width, this.height]);
    var angleRadLocation = this.gl.getUniformLocation(program, "u_angle_rad");
    const now = new Date();
    const ms = 1000 * now.getSeconds() + now.getMilliseconds();
    this.gl.uniform1f(
      angleRadLocation,
      2 * Math.PI * ((ms % 3000) / 3000 + cycle_offset)
    );
  }
  private attributes(program: WebGLProgram, buffer: WebGLBuffer) {
    this.gl.useProgram(program);
    var positionAttributeLocation = this.gl.getAttribLocation(
      program,
      "a_position"
    );
    this.gl.enableVertexAttribArray(positionAttributeLocation);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);

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
    if (!this.program || !this.skinBuffer || !this.coreBuffer) {
      return;
    }

    this.uniforms(this.program);
    this.attributes(this.program, this.skinBuffer);

    var primitiveType = this.gl.LINE_STRIP;
    var offset = 0;
    var count = this.skinPoints.length;
    this.gl.viewport(0, 0, this.width, this.height);

    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, outputFB);
    this.gl.drawArrays(primitiveType, offset, count);

    this.uniforms(this.program, 0.5);
    this.attributes(this.program, this.coreBuffer);

    var primitiveType = this.gl.TRIANGLES;
    var offset = 0;
    var count = this.corePoints.length;
    this.gl.viewport(0, 0, this.width, this.height);

    this.gl.drawArrays(primitiveType, offset, count);
  }
}
