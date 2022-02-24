import { ScreenGeometry } from "../Geometries/ScreenGeometry";
import { SpiralEncode2DShader } from "../Shaders/SpiralEncode2DShader";
import { SpiralShader } from "../Shaders/SpiralShader";
import {
  createFramebuffer,
  getColorTextureSettings,
  getFloatTextureSettings,
  initializeTexture,
} from "../utils/webgl";

export function createSpiralFloatTexture(
  gl: WebGL2RenderingContext,
  texture: WebGLTexture
): WebGLFramebuffer {
  const ext = gl.getExtension("EXT_color_buffer_float");
  if (!ext) {
    const err = "need EXT_color_buffer_float";
    alert(err);
    throw err;
  }

  initializeTexture(gl, texture, getFloatTextureSettings(gl));
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

  const fb = createFramebuffer(gl);

  gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    texture,
    0
  );

  const geometry = new ScreenGeometry(gl);
  geometry.draw(new SpiralEncode2DShader(gl), fb);

  //clean up
  // gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  // gl.bindTexture(gl.TEXTURE_2D, null);
  return fb;
}

export function createSpiralColorTexture(
  gl: WebGL2RenderingContext,
  texture: WebGLTexture
) {
  initializeTexture(gl, texture, getColorTextureSettings(gl));
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

  const fb = gl.createFramebuffer();

  gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    texture,
    0
  );

  const geometry = new ScreenGeometry(gl);
  geometry.draw(new SpiralShader(gl), fb);
}
