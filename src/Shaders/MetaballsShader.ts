import sineFrag from "./src/metaballs.frag?raw";
import basicVert from "./src/basic.vert?raw";
import { compileShaders } from "../utils/webgl";
import { Shader } from "./AbstractShader";

export class MetaballsShader extends Shader {
  protected program: WebGLShader;
  protected readonly uses_texture: boolean = false;
  protected locations: number[];
  protected velocities: number[];
  protected sizes: number[];
  constructor(
    protected gl: WebGL2RenderingContext,
    private s_per_cycle: number
  ) {
    super();
    this.program = compileShaders(gl, basicVert, sineFrag);
    this.locations = [
      Math.random(),
      Math.random(), // p1
      Math.random(),
      Math.random(), // p2
      Math.random(),
      Math.random(), // p3
      Math.random(),
      Math.random(), // p4
      Math.random(),
      Math.random(), // p5
      Math.random(),
      Math.random(), // p1
      Math.random(),
      Math.random(), // p2
      Math.random(),
      Math.random(), // p3
      Math.random(),
      Math.random(), // p4
      Math.random(),
      Math.random(), // p5
    ];
    this.velocities = [
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2, // p1
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2, // p2
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2, // p3
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2, // p4
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2, // p5
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2, // p1
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2, // p2
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2, // p3
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2, // p4
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2, // p5
    ];
    this.sizes = [
      Math.random() * 1.5 + 0.5,
      Math.random() * 1.5 + 0.5,
      Math.random() * 1.5 + 0.5,
      Math.random() * 1 + 0.5,
      Math.random() * 1 + 0.5,
      Math.random() * 1 + 0.5,
      Math.random() * 1.5 + 0.5,
      Math.random() * 2 + 0.5,
      Math.random() * 2 + 0.5,
      Math.random() * 2 + 0.5,
    ];
  }

  private uniforms() {
    this.gl.useProgram(this.program);

    var viewportCoordLocation = this.gl.getUniformLocation(
      this.program,
      "u_viewportCoord"
    );
    this.gl.uniform2fv(viewportCoordLocation, [
      this.gl.canvas.width,
      this.gl.canvas.height,
    ]);

    var angleRadLocation = this.gl.getUniformLocation(
      this.program,
      "u_angle_rad"
    );
    const now = new Date();
    const s = now.getSeconds();
    this.gl.uniform1f(
      angleRadLocation,
      (2 * Math.PI * (s % this.s_per_cycle)) / this.s_per_cycle
    );

    // Add velocity
    for (var i = 0; i < this.locations.length; i++) {
      this.locations[i] += (this.velocities[i] * 0.05) / this.s_per_cycle;
    }

    // bounce
    for (var i = 0; i < this.locations.length; i++) {
      if (this.locations[i] < 0) {
        this.locations[i] = 0;
        this.velocities[i] *= -1;
      }
      if (this.locations[i] > 1) {
        this.locations[i] = 1;
        this.velocities[i] *= -1;
      }
    }
    this.gl.uniform2fv(
      this.gl.getUniformLocation(this.program, "u_locations"),
      this.locations
    );

    this.gl.uniform1fv(
      this.gl.getUniformLocation(this.program, "u_sizes"),
      this.sizes
    );
  }
  private attributes() {}

  use() {
    this.uniforms();
    this.attributes();
  }
}
