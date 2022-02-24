#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
out vec4 out_color;
in vec2 v_texcoord;
uniform sampler2D u_input_tex;
uniform sampler2D u_data_tex;
 
void main() {
    if (texture(u_data_tex, v_texcoord).a > 0.5) {
        out_color = texture(u_data_tex, v_texcoord);
    }
    else {
        out_color = texture(u_input_tex, v_texcoord);
    }
}
