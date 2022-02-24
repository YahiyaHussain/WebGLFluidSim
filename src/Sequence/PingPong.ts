import {
  createFramebuffer,
  createTexture,
  TextureSettings,
  useTexture,
  WrapType,
} from "../utils/webgl";

export class PingPong {
  private swapped: boolean = false;
  private fb1: WebGLFramebuffer;
  private fb2: WebGLFramebuffer;
  private tex1: WebGLTexture;
  private tex2: WebGLTexture;
  constructor(
    private gl: WebGL2RenderingContext,
    private textureSettings: TextureSettings,
    initialTexture: WebGLTexture | undefined
  ) {
    this.fb1 = createFramebuffer(gl);
    this.fb2 = createFramebuffer(gl);
    this.tex1 = createTexture(gl);
    this.tex2 = createTexture(gl);

    this.setup(initialTexture);
  }

  private setup(initialTexture: WebGLTexture | undefined) {
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);

    this.gl.bindTexture(this.gl.TEXTURE_2D, this.tex1);
    useTexture(this.gl, this.tex1, 0, WrapType.Clamp);
    this.gl.texImage2D(
      this.textureSettings.textureTarget,
      this.textureSettings.mipmapLevel,
      this.textureSettings.internalFormat,
      this.textureSettings.width,
      this.textureSettings.height,
      this.textureSettings.border,
      this.textureSettings.format,
      this.textureSettings.type,
      this.textureSettings.pixels
    );

    useTexture(this.gl, this.tex2, 1, WrapType.Clamp);
    this.gl.texImage2D(
      this.textureSettings.textureTarget,
      this.textureSettings.mipmapLevel,
      this.textureSettings.internalFormat,
      this.textureSettings.width,
      this.textureSettings.height,
      this.textureSettings.border,
      this.textureSettings.format,
      this.textureSettings.type,
      this.textureSettings.pixels
    );
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);

    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fb1);
    this.gl.framebufferTexture2D(
      this.gl.FRAMEBUFFER,
      this.gl.COLOR_ATTACHMENT0,
      this.gl.TEXTURE_2D,
      this.tex1,
      0
    );
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fb2);
    this.gl.framebufferTexture2D(
      this.gl.FRAMEBUFFER,
      this.gl.COLOR_ATTACHMENT0,
      this.gl.TEXTURE_2D,
      this.tex2,
      0
    );

    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

    if (initialTexture) {
      const tempFB = createFramebuffer(this.gl);
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, tempFB);
      this.gl.framebufferTexture2D(
        this.gl.FRAMEBUFFER,
        this.gl.COLOR_ATTACHMENT0,
        this.gl.TEXTURE_2D,
        initialTexture,
        0
      );

      this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER, tempFB);
      this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER, this.fb2);
      this.gl.blitFramebuffer(
        0,
        0,
        this.gl.canvas.width,
        this.gl.canvas.height,
        0,
        0,
        this.gl.canvas.width,
        this.gl.canvas.height,
        this.gl.COLOR_BUFFER_BIT,
        this.gl.NEAREST
      );

      this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER, null);
      this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER, null);
    }
  }

  public swapGet(): [WebGLFramebuffer, WebGLTexture] {
    if (!this.swapped) {
      this.swapped = !this.swapped;
      return [this.fb1, this.tex2];
    } else {
      this.swapped = !this.swapped;
      return [this.fb2, this.tex1];
    }
  }

  public peek(): [WebGLFramebuffer, WebGLTexture] {
    if (!this.swapped) {
      return [this.fb1, this.tex2];
    } else {
      return [this.fb2, this.tex1];
    }
  }
}
