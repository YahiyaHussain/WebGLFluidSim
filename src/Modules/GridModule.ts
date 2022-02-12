import { WebGLModule } from "./interfaces/WebGLModule";
import basic_vert from "../Kernels/shaders/basic.vert?raw";
import texture_vert from "../Kernels/shaders/texture.vert?raw";
import sine_frag from "../Kernels/shaders/sine.frag?raw";
import grid_frag from "../Kernels/shaders/grid.frag?raw";
import { createShader, createProgram, getContext } from "../utils/webgl";
import {
  UVPoint,
  addUVPointsToPositionBuffer,
  ModuleSettings,
} from "../data-structures/webgl";

export class GridModule implements WebGLModule {
  protected gl: WebGL2RenderingContext;
  private width: number;
  private height: number;
  private spacing: number;
  private program: WebGLProgram;
  private gridProgram: WebGLProgram;

  constructor(canvas: HTMLCanvasElement, settings: ModuleSettings) {
    const gl = getContext(canvas);
    if (!gl) {
      throw "Could not create webgl2 context";
    }
    this.gl = gl;
    this.width = settings.res_x;
    this.height = settings.res_y;
    this.spacing = settings.grid_spacing;

    let program = this.compileShaders(basic_vert, sine_frag);
    if (!program) {
      throw "Could not create shader program";
    }
    let gridProgram = this.compileShaders(texture_vert, grid_frag);
    if (!gridProgram) {
      throw "Could not create grid shader program";
    }
    this.program = program;
    this.gridProgram = gridProgram;
    this.setup();
  }

  private setup() {
    this.gl.clearColor(0.1, 0.5, 0.8, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.gl.canvas.width = this.width;
    this.gl.canvas.height = this.height;

    this.gl.viewport(0, 0, this.width, this.height);
    // Clear the canvas
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  private compileShaders(
    vert_src: string,
    frag_src: string
  ): WebGLProgram | undefined {
    const vertexShader = createShader(this.gl, this.gl.VERTEX_SHADER, vert_src);
    const fragmentShader = createShader(
      this.gl,
      this.gl.FRAGMENT_SHADER,
      frag_src
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

  private setupGeometry(points: UVPoint[]) {
    this.gl.useProgram(this.program);
    var viewportCoordLocation = this.gl.getUniformLocation(
      this.program,
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

    addUVPointsToPositionBuffer(this.gl, positionBuffer, points);

    var positionAttributeLocation = this.gl.getAttribLocation(
      this.program,
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

  private setupTextureGeometry(points: UVPoint[]) {
    this.gl.useProgram(this.gridProgram);
    var viewportCoordLocation = this.gl.getUniformLocation(
      this.gridProgram,
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

    addUVPointsToPositionBuffer(this.gl, positionBuffer, points);

    var positionAttributeLocation = this.gl.getAttribLocation(
      this.gridProgram,
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

    this.gl.useProgram(this.gridProgram);
    const texcoordBuffer = this.gl.createBuffer();
    if (!texcoordBuffer) {
      const err = "failed to make texcoord buffer";
      console.error(err);
      alert(err);
      return;
    }
    // addUVPointsToBuffer(this.gl, texcoordBuffer, points);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texcoordBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array([
        0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
      ]),
      this.gl.STATIC_DRAW
    );
    const texcoordAttributeLocation = this.gl.getAttribLocation(
      this.gridProgram,
      "a_texcoord"
    );
    this.gl.enableVertexAttribArray(texcoordAttributeLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texcoordBuffer);
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
  render() {
    let triangle1 = [new UVPoint(0, 0), new UVPoint(1, 0), new UVPoint(0, 1)];
    let triangle2 = [new UVPoint(0, 1), new UVPoint(1, 0), new UVPoint(1, 1)];

    this.setupGeometry(triangle1.concat(triangle2));
    var primitiveType = this.gl.TRIANGLES;
    var offset = 0;
    var count = 6;
    this.gl.useProgram(this.program);
    var viewportCoordLocation = this.gl.getUniformLocation(
      this.program,
      "u_angle_rad"
    );
    // this.time = (this.time + 1) % 300;
    const now = new Date();
    const ms = 1000 * now.getSeconds() + now.getMilliseconds();
    this.gl.uniform1f(
      viewportCoordLocation,
      (2 * Math.PI * (ms % 3000)) / 3000
    );
    this.gl.drawArrays(primitiveType, offset, count);
  }
  debugRender(): void {
    let triangle1 = [new UVPoint(0, 0), new UVPoint(1, 0), new UVPoint(1, 1)];
    let triangle2 = [new UVPoint(0, 1), new UVPoint(0, 0), new UVPoint(1, 1)];

    this.setupTextureGeometry(triangle1.concat(triangle2));
    // Create a texture.
    this.gl.useProgram(this.program);
    var texture = this.gl.createTexture();

    // // use texture unit 0
    this.gl.activeTexture(this.gl.TEXTURE0 + 0);

    // bind to the TEXTURE_2D bind point of texture unit 0
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
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

    // Fill the texture with a 1x1 blue pixel.
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.width,
      this.height,
      0,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      null
    );

    var fbo = this.gl.createFramebuffer();
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fbo);
    this.gl.framebufferTexture2D(
      this.gl.FRAMEBUFFER,
      this.gl.COLOR_ATTACHMENT0,
      this.gl.TEXTURE_2D,
      texture,
      0
    );
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fbo);
    this.gl.viewport(0, 0, this.width, this.height);

    this.render();

    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    this.gl.viewport(0, 0, this.width, this.height);

    var primitiveType = this.gl.TRIANGLES;
    var offset = 0;
    var count = 6;

    this.gl.useProgram(this.gridProgram);
    this.gl.uniform1i(
      this.gl.getUniformLocation(this.gridProgram, "u_spacing"),
      this.spacing
    );

    this.gl.drawArrays(primitiveType, offset, count);

    // this.render();
  }
}
