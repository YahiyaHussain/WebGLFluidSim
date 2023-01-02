import { array } from "prop-types";
import { UVPoint } from "../utils/webgl";
import { Geometry } from "./AbstractGeometry";

export class PointGeometry extends Geometry {
  protected points: UVPoint[];
  protected primitive: number;
  constructor(protected gl: WebGL2RenderingContext) {
    super();
    const x_unit = 1 / gl.canvas.width / 2;
    const y_unit = 1 / gl.canvas.height / 2;
    this.points = [new UVPoint(0, y_unit), new UVPoint(1 - x_unit, 1 - y_unit)];
    this.primitive = gl.POINTS;
  }

  public setPoints(points: UVPoint[]): PointGeometry {
    this.points = points;
    return this;
  }
}
