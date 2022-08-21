#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
out vec4 out_color;
in vec2 v_texcoord;
uniform sampler2D u_velocity_texture;

uniform float halfrdx; // 0.5 / gridscale : is gridscale == 1?

 
void main() {
  vec2 units = 1. / vec2(textureSize(u_x_texture, 0));
  vec4 wL = texture(u_velocity_texture, v_texcoord - vec2(1, 0) * units);
  vec4 wR = texture(u_velocity_texture, v_texcoord + vec2(1, 0) * units);
  vec4 wB = texture(u_velocity_texture, v_texcoord - vec2(0, 1) * units);
  vec4 wT = texture(u_velocity_texture, v_texcoord + vec2(0, 1) * units);

  out_color = halfrdx * ((wR.x - wL.x) + (wT.y - wB.y));
}
