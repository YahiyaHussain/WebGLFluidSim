#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
uniform int u_spacing;
out vec4 out_color;
in vec2 v_texcoord;
uniform sampler2D u_texture;
 
void main() {
    int x_index = int(gl_FragCoord.x - 0.5);
    int y_index = int(gl_FragCoord.y - 0.5);

    if (x_index % (u_spacing + 1) == 0 || y_index % (u_spacing + 1) == 0) {
        out_color = vec4(0, 0, 0, 1.);
        return;
    }
    out_color = texture(u_texture, v_texcoord);

}
