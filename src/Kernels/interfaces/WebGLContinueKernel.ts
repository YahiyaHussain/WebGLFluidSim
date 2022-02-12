export interface WebGLContinueKernel {
  render(outputFB: WebGLFramebuffer, inputTexture: WebGLTexture): void;
}

interface WebGLContinueKernelCtor {
  new (
    gl: WebGL2RenderingContext,
    inputTexture: WebGLTexture
  ): WebGLContinueKernel;
}

export function createWebGLKernel(
  ctor: WebGLContinueKernelCtor,
  gl: WebGL2RenderingContext,
  inputTexture: WebGLTexture
): WebGLContinueKernel {
  return new ctor(gl, inputTexture);
}
