import { WebGLModule } from "./interfaces/WebGLModule";
import { getContext, ModuleSettings } from "../utils/webgl";
import { SpiralShader } from "../Shaders/SpiralShader";
import { IsGeometry } from "../Geometries/interfaces/IsGeometry";
import { ScreenGeometry } from "../Geometries/ScreenGeometry";
import { SierpinskiCarpetShader } from "../Shaders/SierpinskiCarpetShader";

export class SierpinskiCarpetModule implements WebGLModule {
  protected gl: WebGL2RenderingContext;
  private width: number;
  private height: number;
  private carpetShader: SierpinskiCarpetShader;
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
    this.carpetShader = new SierpinskiCarpetShader(gl);

    this.setup();
  }

  private setup() {
    this.gl.canvas.width = this.width;
    this.gl.canvas.height = this.height;
    this.gl.viewport(0, 0, this.width, this.height);
  }

  render() {
    this.geometry.draw(this.carpetShader, null);
  }
  debugRender(): void {
    this.geometry.draw(this.carpetShader, null);
  }
}
