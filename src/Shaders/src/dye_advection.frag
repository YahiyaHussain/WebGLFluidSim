#version 300 es
precision highp float;
in vec2 v_texcoord;
uniform float u_timestep;
uniform sampler2D u_velocity_texture;
uniform sampler2D u_dye_texture;
uniform float rdx;
out vec4 color;
#define PI 3.1415926538


vec4 f4texRECTbilerp(sampler2D tex, vec2 s)
{
  vec2 unit_coord = 1. / vec2(textureSize(tex, 0));
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


  color = texture(u_dye_texture, old_pos);
  // color = f4texRECTbilerp(u_dye_texture, old_pos);
}
