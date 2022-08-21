#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
out vec4 out_color;
in vec2 v_texcoord;

uniform float u_alpha;
uniform float u_rBeta;
uniform sampler2D u_x_texture; // Ax = b;
uniform sampler2D u_b_texture; // Ax = b;


 
void main() {
  vec2 units = 1. / vec2(textureSize(u_x_texture, 0));
  vec4 xL = texture(u_x_texture, v_texcoord - vec2(1, 0) * units);
  vec4 xR = texture(u_x_texture, v_texcoord + vec2(1, 0) * units);
  vec4 xB = texture(u_x_texture, v_texcoord - vec2(0, 1) * units);
  vec4 xT = texture(u_x_texture, v_texcoord + vec2(0, 1) * units);
  vec4 bC = texture(u_b_texture, v_texcoord);

  out_color = (xL + xR + xB + xT + u_alpha * bC ) * u_rBeta;
}
