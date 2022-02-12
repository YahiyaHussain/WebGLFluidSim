#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_viewportCoord;
uniform float u_angle_rad;
out vec4 color;

 
void main() {
   vec2 uv_coord = floor(gl_FragCoord.xy) / u_viewportCoord.xy;
   color = vec4((uv_coord.x * sin(u_angle_rad)+1.)/2., uv_coord.y * (cos(u_angle_rad)+1.)/2., uv_coord.x * (uv_coord.y*sin(u_angle_rad)+1.)/2., 1.) / 1.1;
}
