import { WebGLModule } from "./interfaces/WebGLModule";

import { UVPoint, ModuleSettings } from "../data-structures/webgl";
import { SineKernel } from "../Kernels/SineKernel";
import { AddKernel } from "../Kernels/AddKernel";
import {
  BasicSequence,
  BasicSequenceContinue,
} from "../Sequence/BasicSequence";
import { DataKernel } from "../Kernels/DataKernel";
import { MultiplyKernel } from "../Kernels/MultiplyKernel";
import { DataMultiplyKernel } from "../Kernels/DataMultiplyKernel";
import { getContext } from "../utils/webgl";
import { ConwayKernel } from "../Kernels/ConwayKernel";

export class ConwayModule implements WebGLModule {
  protected gl: WebGL2RenderingContext;
  private width: number;
  private height: number;
  private points: UVPoint[];
  private dataKernel: DataKernel;
  private sineKernel: SineKernel;
  private multiplyKernel: MultiplyKernel;
  private dataMultiplyKernel: DataMultiplyKernel;
  private conwayKernel: ConwayKernel;
  private basicSequence: BasicSequence;
  private sequence: BasicSequenceContinue;
  private paused: boolean = true;
  private limited: boolean = false;
  private first: boolean = true;

  constructor(canvas: HTMLCanvasElement, settings: ModuleSettings) {
    this.mouseEvents(canvas);
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
    this.multiplyKernel = new MultiplyKernel(
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
    this.dataMultiplyKernel = new DataMultiplyKernel(
      this.gl,
      this.points,
      this.width,
      this.height
    );
    this.conwayKernel = new ConwayKernel(
      this.gl,
      this.points,
      this.width,
      this.height
    );

    this.setup();

    this.basicSequence = new BasicSequence(this.gl, this.points, settings);
    this.sequence = this.basicSequence.apply(
      this.dataKernel.data(new Array(4 * this.width * this.height).fill(255))
    );
  }

  private drawPoint(
    pixel_x: number,
    pixel_y: number,
    total_x: number,
    total_y: number
  ) {
    const data = new Array(4 * this.width * this.height).fill(255);

    const coord_x = Math.floor((this.width * pixel_x) / total_x);
    const coord_y = Math.floor((this.height * pixel_y) / total_y);

    const ind = (coord_x + coord_y * this.width) * 4;
    data[ind] = 0;
    data[ind + 1] = 0;
    data[ind + 2] = 0;

    this.dataMultiplyKernel.data(data);
    this.sequence.apply(this.dataMultiplyKernel).render();
    console.log(`${coord_x}, ${coord_y}`);
  }

  private mouseEvents(canvas: HTMLCanvasElement) {
    canvas.onclick = (ev: MouseEvent) => {
      this.drawPoint(
        ev.clientX,
        ev.clientY,
        canvas.clientWidth,
        canvas.clientHeight
      );
    };

    canvas.addEventListener("contextmenu", (event: MouseEvent) => {
      console.log(event.button);
    });

    window.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key == " ") {
        this.paused = !this.paused;
        this.sequence.apply(this.conwayKernel).render();
      }
    });
  }

  private setup() {
    this.gl.canvas.width = this.width;
    this.gl.canvas.height = this.height;
    this.gl.viewport(0, 0, this.width, this.height);
  }

  render() {
    if (this.first) {
      this.sequence.apply(this.conwayKernel).render();
      this.first = false;
    }
    if (!this.paused) {
      if (!this.limited) {
        this.sequence.apply(this.conwayKernel).render();
        this.limited = true;
        setTimeout(() => {
          this.limited = false;
        }, 100);
      }
    }
    // this.sequence.apply(this.dataMultiplyKernel).render();
  }
  debugRender(): void {
    this.sequence.render();
  }
}
