import { WebGLModule } from "./interfaces/WebGLModule";
import { getContext, ModuleSettings } from "../utils/webgl";
import { SpiralShader } from "../Shaders/SpiralShader";
import { IsGeometry } from "../Geometries/interfaces/IsGeometry";
import { ScreenGeometry } from "../Geometries/ScreenGeometry";
import { IsShader } from "../Shaders/interfaces/IsShader";
import { SineShader } from "../Shaders/SineShader";
import { MetaballsShader } from "../Shaders/MetaballsShader";

export class MetaballsModule implements WebGLModule {
  protected gl: WebGL2RenderingContext;
  private width: number;
  private height: number;
  private shader: IsShader;
  private geometry: IsGeometry;

  constructor(canvas: HTMLCanvasElement, settings: ModuleSettings) {
    const gl = getContext(canvas);
    if (!gl) {
      throw "Could not create webgl2 context";
    }

    this.gl = gl;
    this.width = settings.res_x;
    this.height = settings.res_y;

    this.geometry = new ScreenGeometry(gl);
    this.shader = new MetaballsShader(gl, 10);

    this.setup();
  }

  private setup() {
    this.gl.canvas.width = this.width;
    this.gl.canvas.height = this.height;
    this.gl.viewport(0, 0, this.width, this.height);
  }

  render() {
    this.geometry.draw(this.shader, null);
  }
  debugRender(): void {
    this.geometry.draw(this.shader, null);
  }
}
