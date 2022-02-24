import { Shader } from "../Shaders/AbstractShader";
import { UVPoint } from "../utils/webgl";
import { Geometry } from "./AbstractGeometry";

export class ScreenGeometry extends Geometry {
  protected points: UVPoint[];
  protected primitive: number;

  constructor(protected gl: WebGL2RenderingContext) {
    super();
    let triangle1 = [new UVPoint(0, 0), new UVPoint(1, 0), new UVPoint(1, 1)];
    let triangle2 = [new UVPoint(0, 1), new UVPoint(0, 0), new UVPoint(1, 1)];
    this.points = triangle1.concat(triangle2);
    this.primitive = this.gl.TRIANGLES;
  }
}
