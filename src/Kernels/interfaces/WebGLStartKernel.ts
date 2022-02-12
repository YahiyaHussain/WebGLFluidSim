export interface WebGLStartKernel {
  render(outputFB: WebGLFramebuffer): void;
}

interface WebGLStartKernelCtor {
  new (gl: WebGL2RenderingContext): WebGLStartKernel;
}

export function createWebGLKernel(
  ctor: WebGLStartKernelCtor,
  gl: WebGL2RenderingContext
): WebGLStartKernel {
  return new ctor(gl);
}
