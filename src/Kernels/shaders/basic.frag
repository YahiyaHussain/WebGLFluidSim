#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.1415926538
uniform vec2 u_viewportCoord;
out vec4 color;

 
void main() {

   vec2 uv_coord = gl_FragCoord.xy / u_viewportCoord.xy;

   color = vec4(uv_coord.x, uv_coord.y, sin(uv_coord.x * 1. * PI), 1.);
}
