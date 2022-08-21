import { WebGLModule } from "./interfaces/WebGLModule";

import {
  createTexture,
  createWebGL2Context,
  clipboardToTexture,
  WrapType,
  ModuleSettings,
  getColorTextureSettings,
} from "../utils/webgl";
import { DyeAdvectionShader } from "../Shaders/DyeAdvectionShader";
import { createSpiralFloatTexture } from "../Textures/SpiralTexture";
import { Debounced } from "../Misc/Throttled";
import { ScreenGeometry } from "../Geometries/ScreenGeometry";
import { ParallelRenderSequence } from "../Sequence/ParallelRenderSequence";
import { TextureRenderShader } from "../Shaders/TextureRenderShader";
import { DataRandomShader } from "../Shaders/DataRandomShader";
import { BlackShader } from "../Shaders/BlackShader";

export class StaticAdvectionModule implements WebGLModule {
  protected gl: WebGL2RenderingContext;
  private debouncer: Debounced | undefined;
  private dyeRenderSeq: ParallelRenderSequence | undefined;
  private drawDebounced: Debounced;
  private dataRandomShader: DataRandomShader;

  private paused: boolean = false;

  constructor(canvas: HTMLCanvasElement, settings: ModuleSettings) {
    this.gl = createWebGL2Context(canvas);
    this.gl.canvas.width = settings.res_x;
    this.gl.canvas.height = settings.res_y;
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    this.dataRandomShader = new DataRandomShader(this.gl, 0, 1);

    this.setup();

    this.drawDebounced = new Debounced((ev: MouseEvent) => {
      var rect = canvas.getBoundingClientRect();
      this.drawPoint(
        ev.clientX - rect.left,
        ev.clientY - rect.top,
        canvas.clientWidth,
        canvas.clientHeight
      );
    }, 100);

    this.mouseEvents(canvas);

    const geometry = new ScreenGeometry(this.gl);

    geometry.draw(new BlackShader(this.gl), null);
  }

  private mouseEvents(canvas: HTMLCanvasElement) {
    canvas.onmousedown = (ev_down: MouseEvent) => {
      this.drawDebounced.run(ev_down);
      canvas.onmousemove = (ev: MouseEvent) => {
        if (ev_down.button == 0 && !ev_down.ctrlKey) {
          this.drawDebounced.run(ev);
        } else {
          // this.eraseDebounced.run(ev);
        }
      };
    };
    canvas.onmouseup = (ev: MouseEvent) => {
      canvas.onmousemove = null;
    };

    window.onkeydown = (event: KeyboardEvent) => {
      if (event.key == " ") {
        this.paused = !this.paused;
        console.log(this.paused ? "pause!" : "play!");
      }
    };
  }

  private setup() {
    const onPaste = (event: ClipboardEvent) => {
      clipboardToTexture(this.gl, event).then(
        (texture: WebGLTexture | undefined) => {
          const geometry = new ScreenGeometry(this.gl);

          const spiralFloatTexture = createTexture(this.gl);
          createSpiralFloatTexture(this.gl, spiralFloatTexture);

          this.dyeRenderSeq = new ParallelRenderSequence(
            this.gl,
            geometry,
            getColorTextureSettings(this.gl),
            texture
          );

          const dyeAdvectionShader = new DyeAdvectionShader(
            this.gl,
            0.1,
            0,
            1,
            WrapType.Clamp
          );

          this.debouncer = new Debounced(() => {
            if (!this.dyeRenderSeq) {
              throw "Render sequence was undefined";
            }
            this.dyeRenderSeq.apply(
              dyeAdvectionShader.velocityTexture(spiralFloatTexture)
            );
            this.dyeRenderSeq.render(new TextureRenderShader(this.gl, 0), null);
          }, 20);
        }
      );
    };
    document.onpaste = onPaste;
  }

  private drawPoint(
    pixel_x: number,
    pixel_y: number,
    total_x: number,
    total_y: number
  ) {
    if (!this.dyeRenderSeq) {
      throw "Render sequence was undefined";
    }
    const width = this.gl.canvas.width;
    const height = this.gl.canvas.height;
    const data = new Array(4 * width * height).fill(0);

    const size = Math.floor(width / 30);

    const coord_x = Math.floor((width * pixel_x) / total_x);
    const coord_y = Math.floor((height * pixel_y) / total_y);

    const begin_coord_x = coord_x - Math.floor(size / 2);
    const begin_coord_y = coord_y - Math.floor(size / 2);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const offset_coord_x = begin_coord_x + i;
        const offset_coord_y = begin_coord_y + j;

        if (
          offset_coord_x < 0 ||
          offset_coord_x >= width ||
          offset_coord_y < 0 ||
          offset_coord_y >= height
        ) {
          continue;
        }
        const ind = (offset_coord_x + offset_coord_y * width) * 4;

        const fraction = (new Date().getTime() % 5000) / 5000;
        const angle = Math.PI * 2 * fraction;
        const red = Math.sin(angle) * 255;
        const green = Math.cos(angle) * 255;
        const blue = Math.sin(angle) * Math.cos(angle) * 255;

        data[ind] = red;
        data[ind + 1] = green;
        data[ind + 2] = blue;
        data[ind + 3] = 255;
      }
    }

    this.dyeRenderSeq.apply(this.dataRandomShader.data(data));
    this.dyeRenderSeq.render(new TextureRenderShader(this.gl, 0), null);
  }

  render() {
    if (!this.paused) {
      this.debouncer?.run();
    }
  }
  debugRender(): void {}
}
