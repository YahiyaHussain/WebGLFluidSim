import { WebGLModule } from "./interfaces/WebGLModule";
import { getContext, ModuleSettings } from "../utils/webgl";
import { SpiralShader } from "../Shaders/SpiralShader";
import { IsGeometry } from "../Geometries/interfaces/IsGeometry";
import { ScreenGeometry } from "../Geometries/ScreenGeometry";

export class SpiralModule implements WebGLModule {
  protected gl: WebGL2RenderingContext;
  private width: number;
  private height: number;
  private spiralShader: SpiralShader;
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
    this.spiralShader = new SpiralShader(gl);

    this.setup();
  }
  getInstructions(): string {
    return "Look a spiral!";
  }

  private setup() {
    this.gl.canvas.width = this.width;
    this.gl.canvas.height = this.height;
    this.gl.viewport(0, 0, this.width, this.height);
  }

  render() {
    this.geometry.draw(this.spiralShader, null);
  }
  debugRender(): void {
    this.geometry.draw(this.spiralShader, null);
  }
}
