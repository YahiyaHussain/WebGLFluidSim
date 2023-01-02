import { WebGLModule } from "./interfaces/WebGLModule";

import { getContext, ModuleSettings } from "../utils/webgl";
import { IsGeometry } from "../Geometries/interfaces/IsGeometry";
import { IsShader } from "../Shaders/interfaces/IsShader";
import { BorderGeometry } from "../Geometries/BorderGeometry";
import { BorderlessScreenGeometry } from "../Geometries/BorderlessScreenGeometry";
import { SineShader } from "../Shaders/SineShader";

export class BorderModule implements WebGLModule {
  protected gl: WebGL2RenderingContext;
  private width: number;
  private height: number;
  private skinGeometry: IsGeometry;
  private coreGeometry: IsGeometry;
  private skinShader: IsShader;
  private coreShader: IsShader;

  constructor(canvas: HTMLCanvasElement, settings: ModuleSettings) {
    const gl = getContext(canvas);
    if (!gl) {
      throw "Could not create webgl2 context";
    }
    this.gl = gl;
    this.width = settings.res_x;
    this.height = settings.res_y;

    this.skinGeometry = new BorderGeometry(gl);
    this.coreGeometry = new BorderlessScreenGeometry(gl);
    this.skinShader = new SineShader(gl, 4000);
    this.coreShader = new SineShader(gl, 6000);

    this.setup();
  }
  getInstructions(): string {
    return "There's a border around the screen!";
  }

  private setup() {
    this.gl.canvas.width = this.width;
    this.gl.canvas.height = this.height;
    this.gl.viewport(0, 0, this.width, this.height);
  }

  render() {
    this.coreGeometry.draw(this.coreShader, null);
    this.skinGeometry.draw(this.skinShader, null);
  }
  debugRender(): void {}
}
