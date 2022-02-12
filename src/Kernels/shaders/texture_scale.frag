#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
uniform vec4 u_amount;
out vec4 out_color;
in vec2 v_texcoord;
uniform sampler2D u_texture;
 
void main() {
    out_color = texture(u_texture, v_texcoord) * u_amount;
}
