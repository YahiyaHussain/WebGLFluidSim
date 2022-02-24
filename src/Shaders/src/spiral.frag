#version 300 es
#ifdef GL_ES
precision highp float;
#endif
uniform vec2 u_viewportCoord;
out vec4 color;
#define PI 3.1415926538

// vec3 rgb2hsv(vec3 c)
// {
//     vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
//     vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
//     vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

//     float d = q.x - min(q.w, q.y);
//     float e = 1.0e-10;
//     return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
// }

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
  float magn = length(deriv_coord) /5.;
  angle = angle > 0. ? angle : angle + 2.*PI;

  color = vec4(hsv2rgb(vec3(angle/ (2.*PI), 0.59, 0.73)), magn);
}
