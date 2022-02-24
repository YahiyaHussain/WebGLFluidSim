import { ScreenGeometry } from "../Geometries/ScreenGeometry";
import { TextureRenderShader } from "../Shaders/TextureRenderShader";
import { TextureShaderToShader } from "../Shaders/TextureShaderToShader";
import { ConwayModule } from "../Modules/ConwayModule";
import { WebGLModule } from "../Modules/interfaces/WebGLModule";
import { DynamicAdvectionModule } from "../Modules/DynamicAdvectionModule";
import { BorderModule } from "../Modules/BorderModule";
import { SineModule } from "../Modules/SineModule";
import { SpiralModule } from "../Modules/SpiralModule";
import { StaticAdvectionModule } from "../Modules/StaticAdvectionModule";

export function createShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string
) {
  var shader = gl.createShader(type);
  if (shader) {
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }
  console.error("Shader creation borked");
}

export function createProgram(
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) {
  var program = gl.createProgram();
  if (program) {
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }
  console.error("Shader program borked");
}

export function compileShaders(
  gl: WebGL2RenderingContext,
  vert_src: string,
  frag_src: string
): WebGLProgram {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vert_src);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, frag_src);
  if (!vertexShader) {
    const err = "failed to make vertex shader";
    console.error(err);
    throw err;
  }
  if (!fragmentShader) {
    const err = "failed to make vertex shader";
    console.error(err);
    throw err;
  }

  const program = createProgram(gl, vertexShader, fragmentShader);
  if (!program) {
    const err = "failed to make shader program";
    console.error(err);
    alert(err);
    throw err;
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw "Program link failed with: " + gl.getProgramInfoLog(program);
  }
  return program;
}

export function getContext(
  canvas: HTMLCanvasElement
): WebGL2RenderingContext | null {
  const gl = canvas.getContext("webgl2");
  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return null;
  }
  return gl;
}

export function setShaderPositions(
  gl: WebGL2RenderingContext,
  program: WebGLShader,
  points: UVPoint[]
): void {
  const buffer = gl.createBuffer();
  if (!buffer) {
    const err = "Failed to make position buffer";
    console.error(err);
    throw err;
  }
  addUVPointsToPositionBuffer(gl, buffer, points);
  gl.useProgram(program);
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  var size = 2; // 2 components per iteration
  var type = gl.FLOAT; // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset
  );
}

export function setShaderTextureCoords(
  gl: WebGL2RenderingContext,
  program: WebGLShader,
  points: UVPoint[]
) {
  const texCoordBuffer = gl.createBuffer();
  if (!texCoordBuffer) {
    const err = "failed to make texcoord buffer";
    console.error(err);
    alert(err);
    return;
  }
  addUVPointsToTexCoordBuffer(gl, texCoordBuffer, points);
  gl.useProgram(program);

  const texcoordAttributeLocation = gl.getAttribLocation(program, "a_texcoord");
  gl.enableVertexAttribArray(texcoordAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  var size = 2; // 2 components per iteration
  var type = gl.FLOAT; // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(
    texcoordAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset
  );
}

export function setupClampTexture(
  gl: WebGL2RenderingContext,
  texture: WebGLTexture,
  tex_index: number
) {
  gl.activeTexture(gl.TEXTURE0 + tex_index);
  // bind to the TEXTURE_2D bind point of texture unit 0
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
}

export function useTexture(
  gl: WebGL2RenderingContext,
  texture: WebGLTexture,
  tex_index: number,
  wrapType: WrapType
) {
  gl.activeTexture(gl.TEXTURE0 + tex_index);
  // bind to the TEXTURE_2D bind point of texture unit idx
  gl.bindTexture(gl.TEXTURE_2D, texture);

  switch (wrapType) {
    case WrapType.Repeat:
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      break;
    case WrapType.Clamp:
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      break;
  }

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
}

export enum WrapType {
  Repeat,
  Clamp,
}

export function fillScreenTexture(
  gl: WebGL2RenderingContext,
  texture: WebGLTexture,
  data: number[]
) {
  const exp_len = 4 * gl.canvas.width * gl.canvas.height;
  if (data.length != exp_len) {
    throw `data list was found to have length: ${data.length}, but was expected to have 4 x width x height: ${exp_len}`;
  }

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.canvas.width,
    gl.canvas.height,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array(data)
  );
}

export function createWebGL2Context(
  canvas: HTMLCanvasElement
): WebGL2RenderingContext {
  const ctx = canvas.getContext("webgl2");
  if (!ctx) {
    const err = "couldn't create canvas webgl2 context";
    console.log(err);
    throw err;
  }
  return ctx;
}

export function create2DContext(
  canvas: HTMLCanvasElement
): CanvasRenderingContext2D {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    const err = "couldn't create canvas 2d context";
    console.log(err);
    throw err;
  }
  return ctx;
}

export function createTexture(gl: WebGL2RenderingContext): WebGLTexture {
  const texture = gl.createTexture();
  if (!texture) {
    throw "Couldn't create texture";
  }
  return texture;
}

export function createFramebuffer(
  gl: WebGL2RenderingContext
): WebGLFramebuffer {
  const fb = gl.createFramebuffer();
  if (!fb) {
    throw "Couldn't create texture";
  }
  return fb;
}

export function readFloatTexture(
  gl: WebGL2RenderingContext,
  fb: WebGLFramebuffer
): Float32Array {
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb);

  gl.readBuffer(gl.COLOR_ATTACHMENT0);
  const data = new Float32Array(4 * gl.canvas.width * gl.canvas.height);
  const x = 0;
  const y = 0;
  const format = gl.RGBA;
  const type = gl.FLOAT;

  gl.readPixels(x, y, gl.canvas.width, gl.canvas.height, format, type, data);

  var halfHeight = (gl.canvas.height / 2) | 0; // the | 0 keeps the result an int
  var bytesPerRow = gl.canvas.width * 4;

  // make a temp buffer to hold one row
  var temp = new Float32Array(gl.canvas.width * 4);
  for (let y = 0; y < halfHeight; ++y) {
    var topOffset = y * bytesPerRow;
    var bottomOffset = (gl.canvas.height - y - 1) * bytesPerRow;

    // make copy of a row on the top half
    temp.set(data.subarray(topOffset, topOffset + bytesPerRow));

    // copy a row from the bottom half to the top
    data.copyWithin(topOffset, bottomOffset, bottomOffset + bytesPerRow);

    // copy the copy of the top half row to the bottom half
    data.set(temp, bottomOffset);
  }

  return data;
}

export async function clipboardToTexture(
  gl: WebGL2RenderingContext,
  event: ClipboardEvent
  // file: DataTransferItem
): Promise<WebGLTexture | undefined> {
  const items = event.clipboardData?.items;
  if (!items) {
    const err = "Couldn't get items from paste";
    console.log(err);
    throw err;
  }
  for (let index in items) {
    var item = items[index];
    if (item.kind === "file") {
      const blob = item.getAsFile();
      if (!blob) {
        const err = "couldn't get paste blob";
        console.log(err);
        throw err;
      }

      const url = URL.createObjectURL(blob);
      if (!url) {
        const err = "couldn't create object url from blob";
        console.log(err);
        throw err;
      }
      return createImage(url).then((img: HTMLImageElement) => {
        const canvas1 = document.createElement("canvas");
        const canvas2 = document.createElement("canvas");

        const ctx1 = create2DContext(canvas1);
        const ctx2 = create2DContext(canvas2);
        canvas1.width = img.width;
        canvas1.height = img.height;
        ctx1.drawImage(img, 0, 0, img.width, img.height);

        canvas2.width = gl.canvas.width;
        canvas2.height = gl.canvas.height;
        ctx2.drawImage(
          canvas1,
          0,
          0,
          canvas1.width,
          canvas1.height,
          0,
          0,
          canvas2.width,
          canvas2.height
        );

        const texture = createTexture(gl);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          canvas2
        );

        const geometry = new ScreenGeometry(gl);
        const textureRenderShader = new TextureRenderShader(gl, 0);

        geometry.draw(
          new TextureShaderToShader(textureRenderShader, texture),
          null
        );

        return texture;
      });
    }
  }
}

export function createImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.src = src;
  });
}

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

export enum ModuleType {
  Border,
  Conway,
  Sine,
  Spiral,
  StaticAdvection,
  DynamicAdvection,
}

export function getModule(
  canvas: HTMLCanvasElement,
  moduleType: ModuleType,
  settings: ModuleSettings
): WebGLModule {
  switch (moduleType) {
    case ModuleType.Border:
      return new BorderModule(canvas, settings);
    case ModuleType.Conway:
      return new ConwayModule(canvas, settings);
    case ModuleType.Sine:
      return new SineModule(canvas, settings);
    case ModuleType.Spiral:
      return new SpiralModule(canvas, settings);
    case ModuleType.StaticAdvection:
      return new StaticAdvectionModule(canvas, settings);
    case ModuleType.DynamicAdvection:
      return new DynamicAdvectionModule(canvas, settings);
    default:
      return new ConwayModule(canvas, settings);
  }
}
export class TextureSettings {
  constructor(
    public textureTarget: number,
    public mipmapLevel: number,
    public internalFormat: number,
    public width: number,
    public height: number,
    public border: number,
    public format: number,
    public type: number,
    public pixels: null | ArrayBufferView
  ) {}
}

export function getFloatTextureSettings(
  gl: WebGL2RenderingContext
): TextureSettings {
  return new TextureSettings(
    gl.TEXTURE_2D,
    0,
    gl.RGBA32F,
    gl.canvas.width,
    gl.canvas.height,
    0,
    gl.RGBA,
    gl.FLOAT,
    null
  );
}

export function getColorTextureSettings(
  gl: WebGL2RenderingContext
): TextureSettings {
  return new TextureSettings(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.canvas.width,
    gl.canvas.height,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    null
  );
}

export function initializeTexture(
  gl: WebGL2RenderingContext,
  texture: WebGLTexture,
  textureSettings: TextureSettings
) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    textureSettings.textureTarget,
    textureSettings.mipmapLevel,
    textureSettings.internalFormat,
    textureSettings.width,
    textureSettings.height,
    textureSettings.border,
    textureSettings.format,
    textureSettings.type,
    null
  );
}
