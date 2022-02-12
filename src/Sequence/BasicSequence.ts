import { ModuleSettings, UVPoint } from "../data-structures/webgl";
import { WebGLContinueKernel } from "../Kernels/interfaces/WebGLContinueKernel";
import { WebGLStartKernel } from "../Kernels/interfaces/WebGLStartKernel";
import { TextureKernel } from "../Kernels/TextureKernel";

export class BasicSequence {
  readonly width: number;
  readonly height: number;

  public swapped: boolean = false;
  private fb1: WebGLFramebuffer;
  public fb2: WebGLFramebuffer;
  public tex1: WebGLTexture;
  public tex2: WebGLTexture;

  constructor(
    private gl: WebGL2RenderingContext,
    readonly points: UVPoint[],
    settings: ModuleSettings
  ) {
    gl.texStorage2D;
    this.width = settings.res_x;
    this.height = settings.res_y;

    const fb1 = this.gl.createFramebuffer();
    const fb2 = this.gl.createFramebuffer();
    const tex1 = this.gl.createTexture();
    const tex2 = this.gl.createTexture();

    if (!fb1 || !fb2 || !tex1 || !tex2) {
      throw "Could not create Framebuffers or Textures";
    }
    this.fb1 = fb1;
    this.fb2 = fb2;
    this.tex1 = tex1;
    this.tex2 = tex2;

    this.setup();
  }
  private setup() {
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);

    this.gl.canvas.width = this.width;
    this.gl.canvas.height = this.height;
    this.gl.viewport(0, 0, this.width, this.height);

    this.gl.bindTexture(this.gl.TEXTURE_2D, this.tex1);
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

    this.gl.bindTexture(this.gl.TEXTURE_2D, this.tex2);
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
  }
  public apply(kernel: WebGLStartKernel) {
    const [fb_out, _] = this.get_order();
    kernel.render(fb_out);
    this.swap();
    return new BasicSequenceContinue(this.gl, this);
  }

  public get_order(): [WebGLFramebuffer, WebGLTexture] {
    if (!this.swapped) {
      return [this.fb1, this.tex2];
    } else {
      return [this.fb2, this.tex1];
    }
  }
  public clear_buffers(): void {
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fb1);
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  public swap(): void {
    this.swapped = !this.swapped;
  }
}

export class BasicSequenceContinue {
  constructor(
    private gl: WebGL2RenderingContext,
    private start: BasicSequence
  ) {}

  public apply(kernel: WebGLContinueKernel, times: number = 1) {
    for (let i = 0; i < times; i++) {
      const [fb_out, tex_in] = this.start.get_order();
      kernel.render(fb_out, tex_in);
      this.start.swap();
    }
    return this;
  }
  public render() {
    const [_, tex_in] = this.start.get_order();
    const textureKernel = new TextureKernel(
      this.gl,
      this.start.points,
      this.start.width,
      this.start.height
    );
    textureKernel.render(null, tex_in);
    // this.start.clear_buffers();
  }
}
