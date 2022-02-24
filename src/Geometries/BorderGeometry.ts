import { UVPoint } from "../utils/webgl";
import { Geometry } from "./AbstractGeometry";

export class BorderGeometry extends Geometry {
  protected points: UVPoint[];
  protected primitive: number;
  constructor(protected gl: WebGL2RenderingContext) {
    super();
    const x_unit = 1 / gl.canvas.width / 2;
    const y_unit = 1 / gl.canvas.height / 2;
    this.points = [
      new UVPoint(x_unit, 1 - y_unit),
      new UVPoint(1 - x_unit, 1 - y_unit),
      new UVPoint(1 - x_unit, y_unit),
      new UVPoint(0, y_unit),
      new UVPoint(x_unit, 1 - y_unit),
    ];
    this.primitive = gl.LINE_STRIP;
  }
}
