import { WebGLModule } from "./interfaces/WebGLModule";

import { UVPoint, ModuleSettings } from "../data-structures/webgl";
import { SineKernel } from "../Kernels/SineKernel";
import { AddKernel } from "../Kernels/AddKernel";
import { BasicSequence } from "../Sequence/BasicSequence";
import { DataKernel } from "../Kernels/DataKernel";
import { RingKernel } from "../Kernels/RingKernel";
import { SkinKernel } from "../Kernels/SkinKernel";
import { getContext } from "../utils/webgl";

export class RingModule implements WebGLModule {
  protected gl: WebGL2RenderingContext;
  private width: number;
  private height: number;
  private points: UVPoint[];
  private dataKernel: DataKernel;
  private sineKernel: SineKernel;
  private addKernel: AddKernel;
  private skinKernel: SkinKernel;
  private basicSequence: BasicSequence;

  constructor(canvas: HTMLCanvasElement, settings: ModuleSettings) {
    const gl = getContext(canvas);
    if (!gl) {
      throw "Could not create webgl2 context";
    }
    this.gl = gl;
    this.width = settings.res_x;
    this.height = settings.res_y;

    const triangle1 = [new UVPoint(0, 0), new UVPoint(1, 0), new UVPoint(0, 1)];
    const triangle2 = [new UVPoint(0, 1), new UVPoint(1, 0), new UVPoint(1, 1)];
    this.points = triangle1.concat(triangle2);
    this.sineKernel = new SineKernel(
      this.gl,
      this.points,
      this.width,
      this.height
    );
    this.addKernel = new AddKernel(
      this.gl,
      this.points,
      this.width,
      this.height
    );
    this.dataKernel = new DataKernel(
      this.gl,
      this.points,
      this.width,
      this.height
    );
    this.skinKernel = new SkinKernel(
      this.gl,
      this.points,
      this.width,
      this.height
    );
    this.basicSequence = new BasicSequence(this.gl, this.points, settings);
    this.setup();
  }

  private setup() {
    this.gl.canvas.width = this.width;
    this.gl.canvas.height = this.height;
    this.gl.viewport(0, 0, this.width, this.height);
  }

  render() {
    this.basicSequence.apply(this.skinKernel).render();
    // this.basicSequence.apply(this.sineKernel).render();
    // this.sineKernel.render(null);
  }
  debugRender(): void {
    // this.basicSequence.apply(this.sineKernel).apply(this.addKernel).render();
    this.basicSequence.apply(this.skinKernel).render();
  }
}
