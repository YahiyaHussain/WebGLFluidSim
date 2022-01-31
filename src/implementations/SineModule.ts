import { WebGLModule } from "../interfaces/WebGLModule";
import basic_vert from "../shaders/basic.vert?raw";
import basic_frag from "../shaders/sine.frag?raw";
import { createShader, createProgram } from "../utils/webgl";
import { UVPoint, addUVPointsToBuffer } from "../data-structures/webgl";

export class SineModule implements WebGLModule {
  protected gl: WebGL2RenderingContext;
  private width: number;
  private height: number;
  private program: WebGLProgram;

  private time: number;
  constructor(gl: WebGL2RenderingContext) {
    this.time = 0;
    this.gl = gl;
    this.width = gl.canvas.clientWidth;
    this.height = gl.canvas.clientHeight;

    let program = this.setupShaders();
    if (!program) {
      throw "Could not create shader program";
    }
    this.program = program;
    this.setup();
  }

  private setup() {
    this.gl.clearColor(0.1, 0.5, 0.8, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.gl.canvas.width = this.width;
    this.gl.canvas.height = this.height;

    let triangle1 = [new UVPoint(0, 0), new UVPoint(1, 0), new UVPoint(1, 1)];
    let triangle2 = [new UVPoint(0, 1), new UVPoint(0, 0), new UVPoint(1, 1)];

    this.setupGeometry(triangle1.concat(triangle2), this.program);

    this.gl.viewport(0, 0, this.width, this.height);
    // Clear the canvas
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  private setupShaders(): WebGLProgram | undefined {
    const vertexShader = createShader(
      this.gl,
      this.gl.VERTEX_SHADER,
      basic_vert
    );
    const fragmentShader = createShader(
      this.gl,
      this.gl.FRAGMENT_SHADER,
      basic_frag
    );
    if (!vertexShader) {
      const err = "failed to make vertex shader";
      console.error(err);
      alert(err);
      return;
    }
    if (!fragmentShader) {
      const err = "failed to make vertex shader";
      console.error(err);
      alert(err);
      return;
    }

    const program = createProgram(this.gl, vertexShader, fragmentShader);
    if (!program) {
      const err = "failed to make shader program";
      console.error(err);
      alert(err);
      return;
    }
    return program;
  }

  private setupGeometry(points: UVPoint[], program: WebGLProgram) {
    this.gl.useProgram(program);
    var viewportCoordLocation = this.gl.getUniformLocation(
      program,
      "u_viewportCoord"
    );
    this.gl.uniform2fv(viewportCoordLocation, [this.width, this.height]);

    var positionBuffer = this.gl.createBuffer();
    if (!positionBuffer) {
      const err = "failed to make position buffer";
      console.error(err);
      alert(err);
      return;
    }

    addUVPointsToBuffer(this.gl, positionBuffer, points);

    var positionAttributeLocation = this.gl.getAttribLocation(
      program,
      "a_position"
    );
    this.gl.enableVertexAttribArray(positionAttributeLocation);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

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
  }
  render() {
    var primitiveType = this.gl.TRIANGLES;
    var offset = 0;
    var count = 6;

    var viewportCoordLocation = this.gl.getUniformLocation(
      this.program,
      "u_angle_rad"
    );
    this.time = (this.time + 1) % 300;
    this.gl.uniform1f(viewportCoordLocation, (2 * Math.PI * this.time) / 300);
    this.gl.drawArrays(primitiveType, offset, count);
  }

  debugRender(): void {
    this.render();
  }
}
