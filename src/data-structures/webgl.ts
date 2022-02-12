export class ClipPoint {
  constructor(readonly x: number, readonly y: number) {
    if (x < -1 || x > 1 || y < -1 || y > 1) {
      throw "constructed invalid clip point";
    }
    this.x = x;
    this.y = y;
  }

  public static fromUVPoint(uvPoint: UVPoint): ClipPoint {
    return new ClipPoint(uvPoint.x * 2 - 1, uvPoint.y * 2 - 1);
  }
}
export class UVPoint {
  constructor(readonly x: number, readonly y: number) {
    if (x < 0 || x > 1 || y < 0 || y > 1) {
      throw "constructed invalid clip point";
    }
    this.x = x;
    this.y = y;
  }
}

export function addUVPointsToPositionBuffer(
  gl: WebGL2RenderingContext,
  buffer: WebGLBuffer,
  points: UVPoint[]
) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  let positions = [];
  for (let point of points) {
    const clipPoint = ClipPoint.fromUVPoint(point);
    positions.push(clipPoint.x);
    positions.push(clipPoint.y);
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

export function addClipPointsToPositionBuffer(
  gl: WebGL2RenderingContext,
  buffer: WebGLBuffer,
  points: ClipPoint[]
) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  let positions = [];
  for (let point of points) {
    positions.push(point.x);
    positions.push(point.y);
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

export function addUVPointsToTexCoordBuffer(
  gl: WebGL2RenderingContext,
  buffer: WebGLBuffer,
  points: UVPoint[]
) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  let positions = [];
  for (let point of points) {
    positions.push(point.x);
    positions.push(point.y);
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

export class MouseInfo {
  constructor(
    public mouseDown: boolean,
    public mouseJustUp: boolean,
    public mousePos: [number, number]
  ) {}
}

export class ModuleSettings {
  constructor(
    public res_x: number,
    public res_y: number,
    public grid_spacing: number
  ) {}
}

export enum Module {
  Basic,
  Conway,
  Grid,
  Ring,
  Sequencer,
  Sine,
}
