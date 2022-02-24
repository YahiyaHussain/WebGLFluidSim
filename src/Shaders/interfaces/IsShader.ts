import { UVPoint } from "../../utils/webgl";

export interface IsShader {
  use(): void;
  usePositions(points: UVPoint[]): void;
}
