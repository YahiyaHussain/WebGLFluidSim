import { WebGLModule } from "./interfaces/WebGLModule";

import { DataShader } from "../Shaders/DataShader";
import {
  createWebGL2Context,
  getColorTextureSettings,
  ModuleSettings,
} from "../utils/webgl";
import { Debounced } from "../Misc/Throttled";
import { ScreenGeometry } from "../Geometries/ScreenGeometry";
import { ParallelRenderSequence } from "../Sequence/ParallelRenderSequence";
import { TextureRenderShader } from "../Shaders/TextureRenderShader";
import { ConwayShader } from "../Shaders/ConwayShader";
import { DataMultiplyShader } from "../Shaders/DataMultiplyShader";
import { IsGeometry } from "../Geometries/interfaces/IsGeometry";

export class ConwayModule implements WebGLModule {
  protected gl: WebGL2RenderingContext;

  private geometry: IsGeometry;
  private dataShader: DataShader;
  private conwayShader: ConwayShader;
  private textureRenderShader: TextureRenderShader;
  private dataMultiplyShader: DataMultiplyShader;

  private conwayDebounced: Debounced;
  private drawDebounced: Debounced;
  private eraseDebounced: Debounced;

  private renderSeq: ParallelRenderSequence;

  private paused: boolean = false;

  constructor(canvas: HTMLCanvasElement, settings: ModuleSettings) {
    this.mouseEvents(canvas);
    this.gl = createWebGL2Context(canvas);

    this.gl.canvas.width = settings.res_x;
    this.gl.canvas.height = settings.res_y;
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    this.geometry = new ScreenGeometry(this.gl);
    this.dataShader = new DataShader(this.gl);
    this.conwayShader = new ConwayShader(this.gl);
    this.textureRenderShader = new TextureRenderShader(this.gl, 0);
    this.dataMultiplyShader = new DataMultiplyShader(this.gl, 0, 1);

    this.renderSeq = new ParallelRenderSequence(
      this.gl,
      this.geometry,
      getColorTextureSettings(this.gl)
    );

    this.renderSeq.apply(this.dataShader);
    this.renderSeq.render(this.textureRenderShader, null);

    this.conwayDebounced = new Debounced(() => {
      if (!this.paused) {
        this.renderSeq.apply(this.conwayShader);
        this.renderSeq.render(this.textureRenderShader, null);
      }
    }, 10);

    this.drawDebounced = new Debounced((ev: MouseEvent) => {
      var rect = canvas.getBoundingClientRect();
      this.drawPoint(
        ev.clientX - rect.left,
        ev.clientY - rect.top,
        canvas.clientWidth,
        // -
        //   parseFloat(canvas.style.marginLeft) -
        //   parseFloat(canvas.style.marginRight),
        canvas.clientHeight
        // -
        // parseFloat(canvas.style.marginTop) -
        // parseFloat(canvas.style.marginBottom)
      );
    }, 100);

    this.eraseDebounced = new Debounced((ev: MouseEvent) => {
      this.erasePoint(
        ev.clientX,
        ev.clientY,
        canvas.clientWidth,
        canvas.clientHeight
      );
    }, 100);
  }
  getInstructions(): string {
    return "Draw and watch the pixels come to life! Pause with spacebar";
  }

  private drawPoint(
    pixel_x: number,
    pixel_y: number,
    total_x: number,
    total_y: number
  ) {
    const width = this.gl.canvas.width;
    const height = this.gl.canvas.height;
    const data = new Array(4 * width * height).fill(255);
    const coord_x = Math.floor((width * pixel_x) / total_x);
    const coord_y = Math.floor((height * pixel_y) / total_y);
    const ind = (coord_x + coord_y * width) * 4;
    data[ind] = 0;
    data[ind + 1] = 0;
    data[ind + 2] = 0;
    this.renderSeq.apply(this.dataMultiplyShader.data(data));
    this.renderSeq.render(this.textureRenderShader, null);
  }

  private erasePoint(
    pixel_x: number,
    pixel_y: number,
    total_x: number,
    total_y: number
  ) {
    const width = this.gl.canvas.width;
    const height = this.gl.canvas.height;
    const data = new Array(4 * width * height).fill(255);
    const coord_x = Math.floor((width * pixel_x) / total_x);
    const coord_y = Math.floor((height * pixel_y) / total_y);
    const ind = (coord_x + coord_y * width) * 4;
    data[ind] = 255;
    data[ind + 1] = 255;
    data[ind + 2] = 255;
    this.renderSeq.apply(this.dataMultiplyShader.data(data));
    this.renderSeq.render(this.textureRenderShader, null);
  }

  private clear() {
    const width = this.gl.canvas.width;
    const height = this.gl.canvas.height;
    const data = new Array(4 * width * height).fill(255);
    this.renderSeq.apply(this.dataMultiplyShader.data(data));
    this.renderSeq.render(this.textureRenderShader, null);
  }

  private mouseEvents(canvas: HTMLCanvasElement) {
    canvas.onmousedown = (ev_down: MouseEvent) => {
      this.drawDebounced.run(ev_down);
      canvas.onmousemove = (ev: MouseEvent) => {
        if (ev_down.button == 0 && !ev_down.ctrlKey) {
          this.drawDebounced.run(ev);
        } else {
          this.eraseDebounced.run(ev);
        }
      };
    };
    canvas.onmouseup = (ev: MouseEvent) => {
      canvas.onmousemove = null;
    };
    canvas.oncontextmenu = (ev: MouseEvent) => {
      this.eraseDebounced.run(ev);
      return false;
    };
    window.onkeydown = (event: KeyboardEvent) => {
      if (event.key == "c") {
        console.log("clear!");
        this.clear();
      }
      if (event.key == " ") {
        this.paused = !this.paused;
        console.log(this.paused ? "pause!" : "play!");
      }
    };
  }
  render() {
    this.conwayDebounced.run();
  }
  debugRender(): void {
    // this.sequence.render();
  }
}
