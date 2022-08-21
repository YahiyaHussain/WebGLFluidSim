#version 300 es
#ifdef GL_ES
precision highp float;
#endif
in vec2 v_texcoord;
uniform float u_timestep;
uniform sampler2D u_velocity_texture;
// uniform sampler2D u_dye_texture;
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

// vec3 hsv2rgb(vec3 c)
// {
//     vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
//     vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
//     return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
// }

vec4 f4texRECTbilerp(sampler2D tex, vec2 s)
{
  // https://www.omnicalculator.com/math/bilinear-interpolation#bilinear-interpolation-example equation
  // https://godotengine.org/qa/28151/how-to-check-color-of-adjacent-pixels-in-fragment-shader get pixel size
  // want to use the textureSize to get the pixel index by flooring it
  // then subtract 0.5, floor, add 0.5 and you will get the x boundary pixels, do for y and you have the for corners and can get the coefficients
  // then make sure the texture is sampled with 0-1 based tex coords and stuff
  vec2 unit_coord = 1. / vec2(textureSize(tex, 0)) / 2.;
  vec4 st;
  st.xy = floor(s - unit_coord) + unit_coord;
  st.zw = st.xy + 1.;
 
  vec2 t = s - st.xy; //interpolating factors
   
  vec4 tex11 = texture(tex, st.xy);
  vec4 tex21 = texture(tex, st.zy);
  vec4 tex12 = texture(tex, st.xw);
  vec4 tex22 = texture(tex, st.zw);

  // bilinear interpolation
  return mix(mix(tex11, tex21, t.x), mix(tex12, tex22, t.x), t.y);
}
void main() {
  vec4 texture_output = texture(u_velocity_texture, v_texcoord);
  // float angle = .x;
  // float magn = texture(u_velocity_texture, v_texcoord).y;
  // vec2 velocities = vec2(magn*cos(angle), magn*sin(angle
  // ));
  vec2 old_pos = v_texcoord - vec2(u_timestep, u_timestep) * texture_output.xy;

  // vec2 uv_coord = (gl_FragCoord.xy) / u_viewportCoord.xy;
  // vec2 clip_coord = (uv_coord * vec2(2.,2.) - vec2(1.,1.));
  
  // vec2 deriv_coord = vec2(-clip_coord.x + 2.*clip_coord.y, -5.*clip_coord.x);

  // float angle = atan(deriv_coord.y, deriv_coord.x);
  // float magn = length(deriv_coord) / 4.;
  // angle = angle > 0. ? angle : angle + 2.*PI;

  // color = ivec2(round(vec2(angle, magn) * vec2(360./(2.*PI))));
  // color = vec4(angle*360./(2. * PI), magn, 0.,0.);


  color = texture(u_velocity_texture, old_pos);
  // color = f4texRECTbilerp(u_velocity_texture, old_pos);
}
