#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_viewportCoord;
out vec4 out_color;
in vec2 v_texcoord;
uniform sampler2D u_texture;
 
void main() {
    const vec2 offsets[8] = vec2[8](
        vec2(-1., -1.),
        vec2(-1., 0.),
        vec2(-1., 1.),
        vec2(0., -1.),
        vec2(0., 1.),
        vec2(1., -1.),
        vec2(1., 0.),
        vec2(1., 1.)
    );
    
    float population = 0.;
    const vec4 alive = vec4(0.,0.,0.,1.);
    const vec4 dead = vec4(1.,1.,1.,1.);
    for(int i = 0; i < 8; i++) {
        population += 1. - texture(u_texture, v_texcoord+(offsets[i] / u_viewportCoord)).x;
    }

    float self = texture(u_texture, v_texcoord).x;
    
    

    if (self < 0.5) {
        if (population == 2. || population == 3.) {
            out_color = alive;
            return;
        }
    }
    else {
        if (abs(population - 3.) < 0.01 ) {
            out_color = alive;
            return;
        }
    }


    out_color = dead;
}
