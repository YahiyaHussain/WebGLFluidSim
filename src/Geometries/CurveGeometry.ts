import { array } from "prop-types";
import { UVPoint } from "../utils/webgl";
import { Geometry } from "./AbstractGeometry";

const RESOLUTION = 300;

export class CurveGeometry extends Geometry {
  protected points: UVPoint[];
  protected primitive: number;
  constructor(protected gl: WebGL2RenderingContext) {
    super();
    const x_unit = 1 / gl.canvas.width / 2;
    const y_unit = 1 / gl.canvas.height / 2;
    this.points = [new UVPoint(0, y_unit), new UVPoint(1 - x_unit, 1 - y_unit)];
    this.primitive = gl.LINES;
  }

  public setCurve(
    start: UVPoint,
    startControl: UVPoint,
    end: UVPoint,
    endControl: UVPoint
  ): CurveGeometry {
    this.points = new Array(2 + RESOLUTION * 2);

    this.points[0] = start;
    this.points[1 + RESOLUTION * 2] = end;
    for (let i = 0; i < RESOLUTION; i++) {
      const lerpFactor = i / RESOLUTION;

      const startLerp = start.lerpTo(startControl, lerpFactor);
      const controlLerp = startControl.lerpTo(endControl, lerpFactor);
      const endLerp = endControl.lerpTo(end, lerpFactor);

      const startLerp2 = startLerp.lerpTo(controlLerp, lerpFactor);
      const endLerp2 = controlLerp.lerpTo(endLerp, lerpFactor);

      this.points[2 * i + 1] = startLerp2.lerpTo(endLerp2, lerpFactor);
      this.points[2 * i + 2] = startLerp2.lerpTo(endLerp2, lerpFactor);
    }
    return this;
  }
}
