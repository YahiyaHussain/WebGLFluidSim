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
): WebGLProgram | undefined {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vert_src);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, frag_src);
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

  const program = createProgram(gl, vertexShader, fragmentShader);
  if (!program) {
    const err = "failed to make shader program";
    console.error(err);
    alert(err);
    return;
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
