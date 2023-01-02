import { WebGLModule } from "./interfaces/WebGLModule";

import { getContext, ModuleSettings, UVPoint } from "../utils/webgl";
import { IsGeometry } from "../Geometries/interfaces/IsGeometry";
import { IsShader } from "../Shaders/interfaces/IsShader";
import { BorderGeometry } from "../Geometries/BorderGeometry";
import { BorderlessScreenGeometry } from "../Geometries/BorderlessScreenGeometry";
import { SineShader } from "../Shaders/SineShader";
import { CurveGeometry } from "../Geometries/CurveGeometry";
import { PointGeometry } from "../Geometries/PointGeometry";
import { BlackShader } from "../Shaders/BlackShader";

const MOVE_UPDATE_INTERVAL_MS = 50;
const MOVE_UPDATE_DISTANCE = 0.05;

enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  RIGHT = "RIGHT",
  LEFT = "LEFT",
}

export class BezierModule implements WebGLModule {
  protected gl: WebGL2RenderingContext;
  private width: number;
  private height: number;
  private skinGeometry: CurveGeometry;
  private coreGeometry: IsGeometry;
  private pointGeometry: PointGeometry;
  private skinShader: IsShader;
  private coreShader: IsShader;
  private pointShader: IsShader;

  // private state: State = State.IDLE;
  // private movementDirection: Direction = Direction.UP;
  private intervalID: number = 0;

  private start: UVPoint = new UVPoint(0, 0);
  private startControl: UVPoint = new UVPoint(0.2, 0.6);
  private end: UVPoint = new UVPoint(1, 1);
  private endControl: UVPoint = new UVPoint(0.8, 0.2);

  private moveDirection: Direction = Direction.UP;
  private keyDown: boolean = false;

  constructor(canvas: HTMLCanvasElement, settings: ModuleSettings) {
    const gl = getContext(canvas);
    if (!gl) {
      throw "Could not create webgl2 context";
    }
    this.gl = gl;
    this.width = settings.res_x;
    this.height = settings.res_y;

    this.skinGeometry = new CurveGeometry(gl).setCurve(
      this.start,
      this.startControl,
      this.end,
      this.endControl
    );
    this.coreGeometry = new BorderlessScreenGeometry(gl);
    this.pointGeometry = new PointGeometry(gl).setPoints([
      this.startControl,
      this.endControl,
    ]);
    this.skinShader = new SineShader(gl, 4000);
    this.coreShader = new SineShader(gl, 6000);
    this.pointShader = new BlackShader(gl);

    this.setup();
  }
  getInstructions(): string {
    return "Press Arrow keys (one at a time) to control start control point, hold shift whilst doing so to control end control point";
  }

  private setup() {
    this.gl.canvas.width = this.width;
    this.gl.canvas.height = this.height;
    this.gl.viewport(0, 0, this.width, this.height);

    document.addEventListener("keydown", (ev) => {
      if (!ev.code.startsWith("Arrow")) {
        return;
      }
      if (this.keyDown) {
        return;
      }
      this.keyDown = true;

      const selectEndControl = ev.shiftKey;

      let xDirection = 0;
      let yDirection = 0;

      switch (ev.code) {
        case "ArrowUp":
          yDirection = 1;
          this.moveDirection = Direction.UP;
          break;
        case "ArrowDown":
          yDirection = -1;
          this.moveDirection = Direction.DOWN;
          break;
        case "ArrowRight":
          xDirection = 1;
          this.moveDirection = Direction.RIGHT;
          break;
        case "ArrowLeft":
          xDirection = -1;
          this.moveDirection = Direction.LEFT;
          break;
      }
      console.log("MOVING: " + this.moveDirection);

      window.clearInterval(this.intervalID);

      const incrementPoints = () => {
        console.log("UPDATE");

        if (selectEndControl) {
          this.changePoints(
            this.start,
            this.startControl,
            this.end,
            this.endControl.incrementBy(
              xDirection * MOVE_UPDATE_DISTANCE,
              yDirection * MOVE_UPDATE_DISTANCE
            )
          );
        } else {
          this.changePoints(
            UVPoint.zero,
            this.startControl.incrementBy(
              xDirection * MOVE_UPDATE_DISTANCE,
              yDirection * MOVE_UPDATE_DISTANCE
            ),
            this.end,
            this.endControl
          );
        }
      };

      incrementPoints();
      this.intervalID = window.setInterval(
        incrementPoints,
        MOVE_UPDATE_INTERVAL_MS
      );
    });

    document.addEventListener("keyup", (ev) => {
      if (!ev.code.startsWith("Arrow")) {
        return;
      }
      let stopInterval = false;
      switch (ev.code) {
        case "ArrowUp":
          stopInterval = this.moveDirection == Direction.UP;
          break;
        case "ArrowDown":
          stopInterval = this.moveDirection == Direction.DOWN;
          break;
        case "ArrowRight":
          stopInterval = this.moveDirection == Direction.RIGHT;
          break;
        case "ArrowLeft":
          stopInterval = this.moveDirection == Direction.LEFT;
          break;
      }
      if (stopInterval) {
        console.log("STOPPING: " + this.moveDirection);
        window.clearInterval(this.intervalID);
        this.keyDown = false;
      }
    });
  }

  private changePoints(
    newStart: UVPoint,
    newStartControl: UVPoint,
    newEnd: UVPoint,
    newEndControl: UVPoint
  ): void {
    console.log(newStart, newStartControl, newEnd, newEndControl);
    this.skinGeometry.setCurve(
      newStart,
      newStartControl,
      newEnd,
      newEndControl
    );
    this.start = newStart;
    this.startControl = newStartControl;
    this.end = newEnd;
    this.endControl = newEndControl;

    this.pointGeometry.setPoints([this.startControl, this.endControl]);
  }

  render() {
    this.coreGeometry.draw(this.coreShader, null);
    this.skinGeometry.draw(this.skinShader, null);
    this.pointGeometry.draw(this.pointShader, null);
  }
  debugRender(): void {}
}
