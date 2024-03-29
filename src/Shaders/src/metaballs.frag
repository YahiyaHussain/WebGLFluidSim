#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
#define LOCATIONS 10
uniform vec2 u_viewportCoord;
uniform float u_angle_rad;
uniform vec2 u_locations[LOCATIONS];
uniform float u_sizes[LOCATIONS];
out vec4 color;

#define PI 3.1415926538

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
 
void main() {
   vec2 uv_coord = floor(gl_FragCoord.xy) / u_viewportCoord.xy;

   float hue = (sin(u_angle_rad)/2.+cos(u_angle_rad) + uv_coord.x)/3.;
   float sat = 0.3 + sin(u_angle_rad*uv_coord.x)/4. + uv_coord.y/3.;
   float val = 0.53 + cos(u_angle_rad*uv_coord.y)/4. + uv_coord.x/3.;

   color = vec4(hsv2rgb(vec3(hue, sat, val)), 1.);

    float potential = 0.;
   for (int i = 0; i < LOCATIONS; i++) {
       vec2 location = u_locations[i];
        potential += float(u_sizes[i]) / length(uv_coord - location);
   }

   if (potential > 55.) {
       color = mix(color, vec4(0.,0.,0.,1.),0.7);
   }
   


}
