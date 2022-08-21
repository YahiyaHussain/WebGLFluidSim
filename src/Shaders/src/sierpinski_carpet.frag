#version 300 es
#ifdef GL_ES
precision highp float;
#endif
uniform vec2 u_viewportCoord;
out vec4 color;
#define PI 3.1415926538
#define ITERATIONS 10


vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec2 uv_coord = (gl_FragCoord.xy) / u_viewportCoord.xy;
  vec2 clip_coord = (uv_coord * vec2(2.,2.) - vec2(1.,1.));
  
  vec2 deriv_coord = vec2(-clip_coord.x + 2.*clip_coord.y, -5.*clip_coord.x);

  float angle = atan(deriv_coord.y, deriv_coord.x);
  float magn = length(deriv_coord)*0.3;
  angle = angle > 0. ? angle : angle + 2.*PI;

  color = vec4(hsv2rgb(vec3(angle/ (2.*PI), 0.59, 0.9*magn + 0.35)), 1.);

  float third = 1./3.;
  float twothird = 2./3.;

  int iterations = int(ceil(log(max(u_viewportCoord.x,u_viewportCoord.y) / 9.)));

  for (int i = 0; i < iterations; i++) {
    if (uv_coord.x > third && uv_coord.x < twothird && uv_coord.y > third && uv_coord.y < twothird) {
      color = vec4(0.,0.,0.,1);
    }
    else {
      for (int i = 0; i < 2; i++) {
        if (uv_coord.x > third) {
          uv_coord.x -= third;
        }

        if (uv_coord.y > third) {
          uv_coord.y -= third;
        }
      }
      uv_coord.x *= 3.;
      uv_coord.y *= 3.;
    }
  }
}
