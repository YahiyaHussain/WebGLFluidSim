#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
out vec4 out_color;
in vec2 v_texcoord;


uniform sampler2D u_pressure_texture;
uniform sampler2D u_velocity_texture;

uniform float halfrdx; // 0.5 / gridscale : is gridscale == 1?

 
void main() {
  vec2 units = 1. / vec2(textureSize(u_x_texture, 0));
  vec4 pL = texture(u_pressure_texture, v_texcoord - vec2(1, 0) * units);
  vec4 pR = texture(u_pressure_texture, v_texcoord + vec2(1, 0) * units);
  vec4 pB = texture(u_pressure_texture, v_texcoord - vec2(0, 1) * units);
  vec4 pT = texture(u_pressure_texture, v_texcoord + vec2(0, 1) * units);

  out_color = texture(u_velocity_texture, v_texcoord);
  out_color.xy -= halfrdx * vec2(pR - pL, pT - pB);
}
