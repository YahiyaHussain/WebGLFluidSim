var vt=Object.defineProperty;var xt=(e,t,i)=>t in e?vt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var n=(e,t,i)=>(xt(e,typeof t!="symbol"?t+"":t,i),i);import{r as M,j as X,A as wt,a as v,b as _t,T as O,c as yt,C as bt,S as at,B as Tt,F as Rt,I as St,d as Et,M as At,e as Ct,R as tt,f as Dt}from"./vendor.c968b64f.js";const Mt=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function i(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=i(o);fetch(o.href,s)}};Mt();class N{draw(t,i){const r=0;var o=this.points.length;t.usePositions(this.points),t.use(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,i),this.gl.drawArrays(this.primitive,r,o)}}class _ extends N{constructor(t){super();n(this,"points");n(this,"primitive");this.gl=t;let i=[new u(0,0),new u(1,0),new u(1,1)],r=[new u(0,1),new u(0,0),new u(1,1)];this.points=i.concat(r),this.primitive=this.gl.TRIANGLES}}var Pt=`#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
out vec4 out_color;
in vec2 v_texcoord;
uniform sampler2D u_texture;
 
void main() {
    out_color = texture(u_texture, v_texcoord);
}
`,L=`#version 300 es
// attribute vec4 a_position;
in vec2 a_position;
in vec2 a_texcoord;
out vec2 v_texcoord;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texcoord = a_texcoord;
}`;class U{usePositions(t){if(!this.gl||!this.program)throw"Cannot call usePositions on baseShader without extending it first";ut(this.gl,this.program,t),gt(this.gl,this.program,t)}}class A extends U{constructor(t,i){super();n(this,"program");this.gl=t,this.tex_loc=i,this.program=b(t,L,Pt)}uniforms(){this.gl.useProgram(this.program),this.gl.uniform1i(this.gl.getUniformLocation(this.program,"u_texture"),this.tex_loc)}attributes(){}use(t){R(this.gl,t,this.tex_loc,x.Clamp),this.gl.useProgram(this.program),this.uniforms(),this.attributes()}}class et{constructor(t,i){this.textureShader=t,this.input_texture=i}usePositions(t){this.textureShader.usePositions(t)}use(){this.textureShader.use(this.input_texture)}}class Ft extends A{constructor(t){super(t,0);n(this,"dataTexture");n(this,"dataLen");n(this,"uses_texture",!0);this.gl=t,this.dataLen=4*Math.round(t.canvas.width)*Math.round(t.canvas.height),this.data(new Array(this.dataLen).fill(255)),this.setup()}data(t){if(t.length!=this.dataLen)throw`data list was found to have length: ${t.length}, but was expected to have 4 x width x height: ${this.dataLen}`;this.dataTexture&&this.gl.deleteTexture(this.dataTexture);const i=new Uint8Array(t);return this.dataTexture=D(this.gl),this.gl.bindTexture(this.gl.TEXTURE_2D,this.dataTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.canvas.width,this.gl.canvas.height,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,i),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this}setup(){}use(){if(!this.dataTexture)throw"Tried to use DataShader without initializing data";super.use(this.dataTexture)}}class C{constructor(t,i){n(this,"limited",!1);this.func=t,this.rate_per_sec=i}run(...t){this.limited||(this.func.apply(null,t),this.limited=!0,setTimeout(()=>{this.limited=!1},1e3/this.rate_per_sec))}}class Lt{constructor(t,i,r){n(this,"swapped",!1);n(this,"fb1");n(this,"fb2");n(this,"tex1");n(this,"tex2");this.gl=t,this.textureSettings=i,this.fb1=$(t),this.fb2=$(t),this.tex1=D(t),this.tex2=D(t),this.setup(r)}setup(t){if(this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.tex1),R(this.gl,this.tex1,0,x.Clamp),this.gl.texImage2D(this.textureSettings.textureTarget,this.textureSettings.mipmapLevel,this.textureSettings.internalFormat,this.textureSettings.width,this.textureSettings.height,this.textureSettings.border,this.textureSettings.format,this.textureSettings.type,this.textureSettings.pixels),R(this.gl,this.tex2,1,x.Clamp),this.gl.texImage2D(this.textureSettings.textureTarget,this.textureSettings.mipmapLevel,this.textureSettings.internalFormat,this.textureSettings.width,this.textureSettings.height,this.textureSettings.border,this.textureSettings.format,this.textureSettings.type,this.textureSettings.pixels),this.gl.bindTexture(this.gl.TEXTURE_2D,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.fb1),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.tex1,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.fb2),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.tex2,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),t){const i=$(this.gl);this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,i),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,t,0),this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER,i),this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER,this.fb2),this.gl.blitFramebuffer(0,0,this.gl.canvas.width,this.gl.canvas.height,0,0,this.gl.canvas.width,this.gl.canvas.height,this.gl.COLOR_BUFFER_BIT,this.gl.NEAREST),this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER,null),this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER,null)}}swapGet(){return this.swapped?(this.swapped=!this.swapped,[this.fb2,this.tex1]):(this.swapped=!this.swapped,[this.fb1,this.tex2])}peek(){return this.swapped?[this.fb2,this.tex1]:[this.fb1,this.tex2]}}class I{constructor(t,i,r,o=void 0){n(this,"pingPong");this.geometry=i,this.pingPong=new Lt(t,r,o)}apply(t,i=r=>{}){const[r,o]=this.pingPong.swapGet();this.geometry.draw(new et(t,o),r);const[s,a]=this.pingPong.peek();return i(a),this}render(t,i){const[r,o]=this.pingPong.peek();this.geometry.draw(new et(t,o),i)}}var Ut=`#version 300 es
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
`;class It extends U{constructor(t){super();n(this,"program");this.gl=t,this.program=b(t,L,Ut)}uniforms(){this.gl.useProgram(this.program);var t=this.gl.getUniformLocation(this.program,"u_viewportCoord");this.gl.uniform2fv(t,[this.gl.canvas.width,this.gl.canvas.height])}attributes(){}use(t){R(this.gl,t,0,x.Clamp),this.uniforms(),this.attributes()}}var qt=`#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
out vec4 out_color;
in vec2 v_texcoord;
uniform sampler2D u_texture_1;
uniform sampler2D u_texture_2;
 
void main() {
    out_color = texture(u_texture_1, v_texcoord) * texture(u_texture_2, v_texcoord);
}
`;class kt extends U{constructor(t,i,r){super();n(this,"program");n(this,"_dataTexture");n(this,"dataLen");this.gl=t,this.tex1_loc=i,this.tex2_loc=r,this.dataLen=4*Math.round(t.canvas.width)*Math.round(t.canvas.height),this.program=b(t,L,qt)}uniforms(){var t=this.gl.getUniformLocation(this.program,"u_texture_1"),i=this.gl.getUniformLocation(this.program,"u_texture_2");this.gl.uniform1i(t,this.tex1_loc),this.gl.uniform1i(i,this.tex2_loc)}attributes(){}dataTexture(t){return this._dataTexture=t,this}data(t){if(t.length!=this.dataLen)throw`data list was found to have length: ${t.length}, but was expected to have 4 x width x height: ${this.dataLen}`;this._dataTexture&&this.gl.deleteTexture(this._dataTexture);const i=new Uint8Array(t);return this._dataTexture=D(this.gl),this.gl.bindTexture(this.gl.TEXTURE_2D,this._dataTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.canvas.width,this.gl.canvas.height,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,i),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this}use(t){if(!this._dataTexture)throw"Must initialize data texture before using DataMultiplyShader";R(this.gl,this._dataTexture,0,x.Clamp),R(this.gl,t,1,x.Clamp),this.gl.useProgram(this.program),this.uniforms(),this.attributes()}}class ht{constructor(t,i){n(this,"gl");n(this,"geometry");n(this,"dataShader");n(this,"conwayShader");n(this,"textureRenderShader");n(this,"dataMultiplyShader");n(this,"conwayDebounced");n(this,"drawDebounced");n(this,"eraseDebounced");n(this,"renderSeq");n(this,"paused",!1);this.mouseEvents(t),this.gl=H(t),this.gl.canvas.width=i.res_x,this.gl.canvas.height=i.res_y,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.geometry=new _(this.gl),this.dataShader=new Ft(this.gl),this.conwayShader=new It(this.gl),this.textureRenderShader=new A(this.gl,0),this.dataMultiplyShader=new kt(this.gl,0,1),this.renderSeq=new I(this.gl,this.geometry,K(this.gl)),this.renderSeq.apply(this.dataShader),this.renderSeq.render(this.textureRenderShader,null),this.conwayDebounced=new C(()=>{this.paused||(this.renderSeq.apply(this.conwayShader),this.renderSeq.render(this.textureRenderShader,null))},10),this.drawDebounced=new C(r=>{var o=t.getBoundingClientRect();this.drawPoint(r.clientX-o.left,r.clientY-o.top,t.clientWidth,t.clientHeight)},100),this.eraseDebounced=new C(r=>{this.erasePoint(r.clientX,r.clientY,t.clientWidth,t.clientHeight)},100)}getInstructions(){return"Draw and watch the pixels come to life! Pause with spacebar"}drawPoint(t,i,r,o){const s=this.gl.canvas.width,a=this.gl.canvas.height,c=new Array(4*s*a).fill(255),h=Math.floor(s*t/r),d=Math.floor(a*i/o),l=(h+d*s)*4;c[l]=0,c[l+1]=0,c[l+2]=0,this.renderSeq.apply(this.dataMultiplyShader.data(c)),this.renderSeq.render(this.textureRenderShader,null)}erasePoint(t,i,r,o){const s=this.gl.canvas.width,a=this.gl.canvas.height,c=new Array(4*s*a).fill(255),h=Math.floor(s*t/r),d=Math.floor(a*i/o),l=(h+d*s)*4;c[l]=255,c[l+1]=255,c[l+2]=255,this.renderSeq.apply(this.dataMultiplyShader.data(c)),this.renderSeq.render(this.textureRenderShader,null)}clear(){const t=this.gl.canvas.width,i=this.gl.canvas.height,r=new Array(4*t*i).fill(255);this.renderSeq.apply(this.dataMultiplyShader.data(r)),this.renderSeq.render(this.textureRenderShader,null)}mouseEvents(t){t.onmousedown=i=>{this.drawDebounced.run(i),t.onmousemove=r=>{i.button==0&&!i.ctrlKey?this.drawDebounced.run(r):this.eraseDebounced.run(r)}},t.onmouseup=i=>{t.onmousemove=null},t.oncontextmenu=i=>(this.eraseDebounced.run(i),!1),window.onkeydown=i=>{i.key=="c"&&(console.log("clear!"),this.clear()),i.key==" "&&(this.paused=!this.paused,console.log(this.paused?"pause!":"play!"))}}render(){this.conwayDebounced.run()}debugRender(){}}var Gt=`#version 300 es
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
`;class it extends U{constructor(t,i,r,o,s){super();n(this,"program");n(this,"setVelTex",!1);this.gl=t,this.timestep=i,this.dyeTextureIdx=r,this.velocityTextureIdx=o,this.wrapType=s,this.program=b(t,L,Gt)}uniforms(){this.gl.uniform2fv(this.gl.getUniformLocation(this.program,"u_viewportCoord"),[this.gl.canvas.width,this.gl.canvas.height]),this.gl.uniform1f(this.gl.getUniformLocation(this.program,"u_timestep"),this.timestep),this.gl.uniform1i(this.gl.getUniformLocation(this.program,"u_velocity_texture"),this.velocityTextureIdx),this.gl.uniform1i(this.gl.getUniformLocation(this.program,"u_dye_texture"),this.dyeTextureIdx)}attributes(){}velocityTexture(t){return this.setVelTex=!0,R(this.gl,t,this.velocityTextureIdx,this.wrapType),this}use(t){if(!this.setVelTex)throw"Did not set velocity texture yet for Dye Advection shader";this.gl.useProgram(this.program),this.uniforms(),this.attributes(),R(this.gl,t,this.dyeTextureIdx,this.wrapType)}}var Bt=`#version 300 es
#ifdef GL_ES
precision highp float;
#endif
uniform vec2 u_viewportCoord;
out vec4 color;
#define PI 3.1415926538

// vec3 rgb2hsv(vec3 c)
// {
//     vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
//     vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
//     vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

//     float d = q.x - min(q.w, q.y);
//     float e = 1.0e-10;
//     return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
// }

// vec3 hsv2rgb(vec3 c)
// {
//     vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
//     vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
//     return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
// }

void main() {
  vec2 uv_coord = (gl_FragCoord.xy) / u_viewportCoord.xy;
  vec2 clip_coord = (uv_coord * vec2(2.,2.) - vec2(1.,1.));
  
  vec2 deriv_coord = vec2(-clip_coord.x + 2.*clip_coord.y, -5.*clip_coord.x)/5.;

  // float angle = atan(deriv_coord.y, deriv_coord.x);
  // float magn = length(deriv_coord);
  // angle = angle > 0. ? angle : angle + 2.*PI;

  // color = ivec2(round(vec2(angle, magn) * vec2(360./(2.*PI))));
  color = vec4( deriv_coord.x, deriv_coord.y, 0., 0.);
}
`,q=`#version 300 es
// attribute vec4 a_position;
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;class k{usePositions(t){if(!this.gl||!this.program)throw"Cannot call usePositions on baseShader without extending it first";ut(this.gl,this.program,t),this.uses_texture&&gt(this.gl,this.program,t)}}class Xt extends k{constructor(t){super();n(this,"program");n(this,"uses_texture",!1);this.gl=t,this.program=b(t,q,Bt)}uniforms(){this.gl.useProgram(this.program);var t=this.gl.getUniformLocation(this.program,"u_viewportCoord");this.gl.uniform2fv(t,[this.gl.canvas.width,this.gl.canvas.height])}attributes(){}use(){this.gl.useProgram(this.program),this.uniforms(),this.attributes()}}var Nt=`#version 300 es
#ifdef GL_ES
precision highp float;
#endif
uniform vec2 u_viewportCoord;
out vec4 color;
#define PI 3.1415926538

// vec3 rgb2hsv(vec3 c)
// {
//     vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
//     vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
//     vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

//     float d = q.x - min(q.w, q.y);
//     float e = 1.0e-10;
//     return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
// }

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec2 uv_coord = (gl_FragCoord.xy) / u_viewportCoord.xy;
  vec2 clip_coord = (uv_coord * vec2(2.,2.) - vec2(1.,1.));
  
  vec2 deriv_coord = vec2(-clip_coord.x + 2.*clip_coord.y, -5.*clip_coord.x);

  float angle = atan(deriv_coord.y, deriv_coord.x);
  float magn = length(deriv_coord) /5.;
  angle = angle > 0. ? angle : angle + 2.*PI;

  color = vec4(hsv2rgb(vec3(angle/ (2.*PI), 0.59, 0.73)), magn);
}
`;class zt extends k{constructor(t){super();n(this,"program");n(this,"uses_texture",!1);this.gl=t,this.program=b(t,q,Nt)}uniforms(){this.gl.useProgram(this.program);var t=this.gl.getUniformLocation(this.program,"u_viewportCoord");this.gl.uniform2fv(t,[this.gl.canvas.width,this.gl.canvas.height])}attributes(){}use(){this.gl.useProgram(this.program),this.uniforms(),this.attributes()}}function rt(e,t){if(!e.getExtension("EXT_color_buffer_float")){const s="need EXT_color_buffer_float";throw alert(s),s}ft(e,t,j(e)),e.bindTexture(e.TEXTURE_2D,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST);const r=$(e);return e.bindFramebuffer(e.FRAMEBUFFER,r),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),new _(e).draw(new Xt(e),r),r}var Kt=`#version 300 es
#ifdef GL_ES
precision highp float;
#endif
in vec2 v_texcoord;
uniform float u_timestep;
uniform sampler2D u_velocity_texture;
// uniform sampler2D u_dye_texture;
out vec4 color;
#define PI 3.1415926538
// vec3 rgb2hsv(vec3 c)
// {
//     vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
//     vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
//     vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

//     float d = q.x - min(q.w, q.y);
//     float e = 1.0e-10;
//     return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
// }

// vec3 hsv2rgb(vec3 c)
// {
//     vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
//     vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
//     return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
// }

vec4 f4texRECTbilerp(sampler2D tex, vec2 s)
{
  // https://www.omnicalculator.com/math/bilinear-interpolation#bilinear-interpolation-example equation
  // https://godotengine.org/qa/28151/how-to-check-color-of-adjacent-pixels-in-fragment-shader get pixel size
  // want to use the textureSize to get the pixel index by flooring it
  // then subtract 0.5, floor, add 0.5 and you will get the x boundary pixels, do for y and you have the for corners and can get the coefficients
  // then make sure the texture is sampled with 0-1 based tex coords and stuff
  vec2 unit_coord = 1. / vec2(textureSize(tex, 0)) / 2.;
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


  color = texture(u_velocity_texture, old_pos);
  // color = f4texRECTbilerp(u_velocity_texture, old_pos);
}
`;class ct extends U{constructor(t,i,r,o){super();n(this,"program");this.gl=t,this.timestep=i,this.velocityTextureIdx=r,this.wrapType=o,this.program=b(t,L,Kt)}uniforms(){this.gl.uniform2fv(this.gl.getUniformLocation(this.program,"u_viewportCoord"),[this.gl.canvas.width,this.gl.canvas.height]),this.gl.uniform1f(this.gl.getUniformLocation(this.program,"u_timestep"),this.timestep),this.gl.uniform1i(this.gl.getUniformLocation(this.program,"u_velocity_texture"),this.velocityTextureIdx)}attributes(){}use(t){this.gl.useProgram(this.program),this.uniforms(),this.attributes(),R(this.gl,t,this.velocityTextureIdx,this.wrapType)}}var Ot=`#version 300 es
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
`;class nt extends U{constructor(t,i,r){super();n(this,"program");n(this,"_dataTexture");n(this,"dataLen");this.gl=t,this.dataTexLoc=i,this.inputTexLoc=r,this.dataLen=4*Math.round(t.canvas.width)*Math.round(t.canvas.height),this.program=b(t,L,Ot)}uniforms(){var t=this.gl.getUniformLocation(this.program,"u_input_tex"),i=this.gl.getUniformLocation(this.program,"u_data_tex");this.gl.uniform1i(i,this.dataTexLoc),this.gl.uniform1i(t,this.inputTexLoc)}attributes(){}dataTexture(t){return this._dataTexture=t,this}data(t,i=B.Color){if(t.length!=this.dataLen)throw`data list was found to have length: ${t.length}, but was expected to have 4 x width x height: ${this.dataLen}`;switch(this._dataTexture&&this.gl.deleteTexture(this._dataTexture),this._dataTexture=D(this.gl),this.gl.bindTexture(this.gl.TEXTURE_2D,this._dataTexture),i){case B.Color:var r=new Uint8Array(t),o=K(this.gl);break;case B.Float:var r=new Float32Array(t),o=j(this.gl)}return ft(this.gl,this._dataTexture,o,r),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this}use(t){if(!this._dataTexture)throw"Must initialize data texture before using DataMultiplyShader";R(this.gl,this._dataTexture,0,x.Clamp),R(this.gl,t,1,x.Clamp),this.gl.useProgram(this.program),this.uniforms(),this.attributes()}}var Wt=`#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
out vec4 color;

 
void main() {
   color = vec4(0.,0.,0.,1.);
}
`;class W extends k{constructor(t){super();n(this,"program");n(this,"uses_texture",!1);this.gl=t,this.program=b(t,q,Wt)}uniforms(){}attributes(){}use(){this.gl.useProgram(this.program),this.uniforms(),this.attributes()}}class Yt{constructor(t,i){n(this,"gl");n(this,"debouncer");n(this,"dyeRenderSeq");n(this,"drawDebounced");n(this,"dataRandomShader");n(this,"paused",!1);this.gl=H(t),this.gl.canvas.width=i.res_x,this.gl.canvas.height=i.res_y,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.dataRandomShader=new nt(this.gl,0,1),this.setup(),this.drawDebounced=new C(o=>{var s=t.getBoundingClientRect();this.drawPoint(o.clientX-s.left,o.clientY-s.top,t.clientWidth,t.clientHeight)},100),this.mouseEvents(t),new _(this.gl).draw(new W(this.gl),null)}getInstructions(){return"Paste in an image and watch it explode!"}mouseEvents(t){t.onmousedown=i=>{this.drawDebounced.run(i),t.onmousemove=r=>{i.button==0&&!i.ctrlKey&&this.drawDebounced.run(r)}},t.onmouseup=i=>{t.onmousemove=null},window.onkeydown=i=>{i.key==" "&&(this.paused=!this.paused,console.log(this.paused?"pause!":"play!"))}}setup(){const t=i=>{ot(this.gl,i).then(r=>{const o=new _(this.gl),s=D(this.gl);rt(this.gl,s);const a=new I(this.gl,o,j(this.gl),s);this.dyeRenderSeq=new I(this.gl,o,K(this.gl),r);const c=new ct(this.gl,.03,0,x.Clamp),h=new it(this.gl,.1,0,1,x.Clamp);this.debouncer=new C(()=>{if(!this.dyeRenderSeq)throw"Render sequence was undefined";a.apply(c,d=>{if(!this.dyeRenderSeq)throw"Render sequence was undefined";this.dyeRenderSeq.apply(h.velocityTexture(d))}),this.dyeRenderSeq.render(new A(this.gl,0),null)},25)})};document.onpaste=t}drawPoint(t,i,r,o){if(!this.dyeRenderSeq)throw"Render sequence was undefined";const s=this.gl.canvas.width,a=this.gl.canvas.height,c=new Array(4*s*a).fill(0),h=Math.floor(s/30),d=Math.floor(s*t/r),l=Math.floor(a*i/o),y=d-Math.floor(h/2),S=l-Math.floor(h/2);for(let g=0;g<h;g++)for(let m=0;m<h;m++){const f=y+g,w=S+m;if(f<0||f>=s||w<0||w>=a)continue;const p=(f+w*s)*4,F=new Date().getTime()%5e3/5e3,E=Math.PI*2*F,J=Math.sin(E)*255,Q=Math.cos(E)*255,Z=Math.sin(E)*Math.cos(E)*255;c[p]=J,c[p+1]=Q,c[p+2]=Z,c[p+3]=255}this.dyeRenderSeq.apply(this.dataRandomShader.data(c)),this.dyeRenderSeq.render(new A(this.gl,0),null)}render(){var t;this.paused||(t=this.debouncer)==null||t.run()}debugRender(){}}class Vt extends N{constructor(t){super();n(this,"points");n(this,"primitive");this.gl=t;const i=1/t.canvas.width/2,r=1/t.canvas.height/2;this.points=[new u(i,1-r),new u(1-i,1-r),new u(1-i,r),new u(0,r),new u(i,1-r)],this.primitive=t.LINE_STRIP}}class dt extends N{constructor(t){super();n(this,"points");n(this,"primitive");this.gl=t;const i=1/t.canvas.width/2,r=1/t.canvas.height/2;this.points=[new u(i*2,1-r*2),new u(i*2,r*2),new u(1-i*2,r*2),new u(i*2,1-r*2),new u(1-i*2,r*2),new u(1-i*2,1-r*2)],this.primitive=t.TRIANGLES}}var Ht=`#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_viewportCoord;
uniform float u_angle_rad;
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
}
`;class z extends k{constructor(t,i){super();n(this,"program");n(this,"uses_texture",!1);this.gl=t,this.ms_per_cycle=i,this.program=b(t,q,Ht)}uniforms(){this.gl.useProgram(this.program);var t=this.gl.getUniformLocation(this.program,"u_viewportCoord");this.gl.uniform2fv(t,[this.gl.canvas.width,this.gl.canvas.height]);var i=this.gl.getUniformLocation(this.program,"u_angle_rad");const r=new Date,o=1e3*r.getSeconds()+r.getMilliseconds();this.gl.uniform1f(i,2*Math.PI*(o%this.ms_per_cycle)/this.ms_per_cycle)}attributes(){}use(){this.uniforms(),this.attributes()}}class $t{constructor(t,i){n(this,"gl");n(this,"width");n(this,"height");n(this,"skinGeometry");n(this,"coreGeometry");n(this,"skinShader");n(this,"coreShader");const r=G(t);if(!r)throw"Could not create webgl2 context";this.gl=r,this.width=i.res_x,this.height=i.res_y,this.skinGeometry=new Vt(r),this.coreGeometry=new dt(r),this.skinShader=new z(r,4e3),this.coreShader=new z(r,6e3),this.setup()}getInstructions(){return"There's a border around the screen!"}setup(){this.gl.canvas.width=this.width,this.gl.canvas.height=this.height,this.gl.viewport(0,0,this.width,this.height)}render(){this.coreGeometry.draw(this.coreShader,null),this.skinGeometry.draw(this.skinShader,null)}debugRender(){}}class jt{constructor(t,i){n(this,"gl");n(this,"width");n(this,"height");n(this,"shader");n(this,"geometry");const r=G(t);if(!r)throw"Could not create webgl2 context";this.gl=r,this.width=i.res_x,this.height=i.res_y,this.geometry=new _(r),this.shader=new z(r,4e3),this.setup()}getInstructions(){return"Look Moving Colors"}setup(){this.gl.canvas.width=this.width,this.gl.canvas.height=this.height,this.gl.viewport(0,0,this.width,this.height)}render(){this.geometry.draw(this.shader,null)}debugRender(){this.geometry.draw(this.shader,null)}}class Jt{constructor(t,i){n(this,"gl");n(this,"width");n(this,"height");n(this,"spiralShader");n(this,"geometry");const r=G(t);if(!r)throw"Could not create webgl2 context";this.gl=r,this.width=i.res_x,this.height=i.res_y,this.geometry=new _(r),this.spiralShader=new zt(r),this.setup()}getInstructions(){return"Look a spiral!"}setup(){this.gl.canvas.width=this.width,this.gl.canvas.height=this.height,this.gl.viewport(0,0,this.width,this.height)}render(){this.geometry.draw(this.spiralShader,null)}debugRender(){this.geometry.draw(this.spiralShader,null)}}class Qt{constructor(t,i){n(this,"gl");n(this,"debouncer");n(this,"dyeRenderSeq");n(this,"drawDebounced");n(this,"dataRandomShader");n(this,"paused",!1);this.gl=H(t),this.gl.canvas.width=i.res_x,this.gl.canvas.height=i.res_y,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.dataRandomShader=new nt(this.gl,0,1),this.setup(),this.drawDebounced=new C(o=>{var s=t.getBoundingClientRect();this.drawPoint(o.clientX-s.left,o.clientY-s.top,t.clientWidth,t.clientHeight)},100),this.mouseEvents(t),new _(this.gl).draw(new W(this.gl),null)}getInstructions(){return"Paste in an image and watch it go down the drain!"}mouseEvents(t){t.onmousedown=i=>{this.drawDebounced.run(i),t.onmousemove=r=>{i.button==0&&!i.ctrlKey&&this.drawDebounced.run(r)}},t.onmouseup=i=>{t.onmousemove=null},window.onkeydown=i=>{i.key==" "&&(this.paused=!this.paused,console.log(this.paused?"pause!":"play!"))}}setup(){const t=i=>{ot(this.gl,i).then(r=>{const o=new _(this.gl),s=D(this.gl);rt(this.gl,s),this.dyeRenderSeq=new I(this.gl,o,K(this.gl),r);const a=new it(this.gl,.1,0,1,x.Clamp);this.debouncer=new C(()=>{if(!this.dyeRenderSeq)throw"Render sequence was undefined";this.dyeRenderSeq.apply(a.velocityTexture(s)),this.dyeRenderSeq.render(new A(this.gl,0),null)},20)})};document.onpaste=t}drawPoint(t,i,r,o){if(!this.dyeRenderSeq)throw"Render sequence was undefined";const s=this.gl.canvas.width,a=this.gl.canvas.height,c=new Array(4*s*a).fill(0),h=Math.floor(s/30),d=Math.floor(s*t/r),l=Math.floor(a*i/o),y=d-Math.floor(h/2),S=l-Math.floor(h/2);for(let g=0;g<h;g++)for(let m=0;m<h;m++){const f=y+g,w=S+m;if(f<0||f>=s||w<0||w>=a)continue;const p=(f+w*s)*4,F=new Date().getTime()%5e3/5e3,E=Math.PI*2*F,J=Math.sin(E)*255,Q=Math.cos(E)*255,Z=Math.sin(E)*Math.cos(E)*255;c[p]=J,c[p+1]=Q,c[p+2]=Z,c[p+3]=255}this.dyeRenderSeq.apply(this.dataRandomShader.data(c)),this.dyeRenderSeq.render(new A(this.gl,0),null)}render(){var t;this.paused||(t=this.debouncer)==null||t.run()}debugRender(){}}class Zt{constructor(t,i){n(this,"gl");n(this,"debouncer");n(this,"dyeRenderSeq");n(this,"velocityRenderSeq");n(this,"drawDebounced");n(this,"dataRandomShader");n(this,"paused",!1);n(this,"lastCoords");this.gl=H(t),this.gl.canvas.width=i.res_x,this.gl.canvas.height=i.res_y,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.dataRandomShader=new nt(this.gl,0,1),this.setup(),this.drawDebounced=new C(o=>{var s=t.getBoundingClientRect();this.drawPoint(o.clientX-s.left,o.clientY-s.top,t.clientWidth,t.clientHeight)},50),this.mouseEvents(t),new _(this.gl).draw(new W(this.gl),null)}getInstructions(){return"Paste in an image and draw velocity on it!"}mouseEvents(t){t.onmousedown=i=>{this.drawDebounced.run(i),t.onmousemove=r=>{i.button==0&&!i.ctrlKey&&this.drawDebounced.run(r)}},t.onmouseup=i=>{t.onmousemove=null},window.onkeydown=i=>{i.key==" "&&(this.paused=!this.paused,console.log(this.paused?"pause!":"play!"))}}setup(){const t=i=>{ot(this.gl,i).then(r=>{const o=new _(this.gl),s=D(this.gl);rt(this.gl,s),this.velocityRenderSeq=new I(this.gl,o,j(this.gl)),this.dyeRenderSeq=new I(this.gl,o,K(this.gl),r);const a=new ct(this.gl,.03,0,x.Clamp);new A(this.gl,0);const c=new it(this.gl,.1,0,1,x.Clamp);this.debouncer=new C(()=>{if(!this.dyeRenderSeq)throw"Render sequence was undefined";if(!this.velocityRenderSeq)throw"velocity render seq was undefined";this.velocityRenderSeq.apply(a,h=>{if(!this.dyeRenderSeq)throw"Render sequence was undefined";this.dyeRenderSeq.apply(c.velocityTexture(h))}),this.dyeRenderSeq.render(new A(this.gl,0),null)},25)})};document.onpaste=t}drawPoint(t,i,r,o){if(!this.dyeRenderSeq)throw"Render sequence was undefined";const s=this.gl.canvas.width,a=this.gl.canvas.height,c=new Array(4*s*a).fill(0),h=Math.floor(s/30),d=Math.floor(s*t/r),l=Math.floor(a*i/o);if(!this.lastCoords){this.lastCoords=[d,l],setTimeout(()=>this.lastCoords=void 0,100);return}const y=d-Math.floor(h/2),S=l-Math.floor(h/2);for(let g=0;g<h;g++)for(let m=0;m<h;m++){const f=y+g,w=S+m;if(f<0||f>=s||w<0||w>=a)continue;const p=(f+w*s)*4;new Date().getTime()%5e3/5e3,c[p]=(d-this.lastCoords[0])/s*10,c[p+1]=-((l-this.lastCoords[1])/a)*10,c[p+2]=0,c[p+3]=255}if(!this.velocityRenderSeq)throw alert("Paste image first"),"Didn't paste image before drawing";this.velocityRenderSeq.apply(this.dataRandomShader.data(c,B.Float))}render(){var t;this.paused||(t=this.debouncer)==null||t.run()}debugRender(){}}var te=`#version 300 es
#ifdef GL_ES
precision highp float;
#endif
uniform vec2 u_viewportCoord;
out vec4 color;
#define PI 3.1415926538


vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec2 uv_coord = (gl_FragCoord.xy) / u_viewportCoord.xy;
  vec2 clip_coord = (uv_coord * vec2(2.,2.) - vec2(1.,1.));
  
  vec2 deriv_coord = vec2(-clip_coord.x + 2.*clip_coord.y, -5.*clip_coord.x);

  float angle = atan(deriv_coord.y, deriv_coord.x);
  float magn = length(deriv_coord)*0.3;
  angle = angle > 0. ? angle : angle + 2.*PI;

  color = vec4(hsv2rgb(vec3(angle/ (2.*PI), 0.59, 0.9*magn + 0.35)), 1.);

  float third = 1./3.;
  float twothird = 2./3.;

  int iterations = int(ceil(log(max(u_viewportCoord.x,u_viewportCoord.y) / 9.)));

  for (int i = 0; i < iterations; i++) {
    if (uv_coord.x > third && uv_coord.x < twothird && uv_coord.y > third && uv_coord.y < twothird) {
      color = vec4(0.,0.,0.,1);
    }
    else {
      for (int i = 0; i < 2; i++) {
        if (uv_coord.x > third) {
          uv_coord.x -= third;
        }

        if (uv_coord.y > third) {
          uv_coord.y -= third;
        }
      }
      uv_coord.x *= 3.;
      uv_coord.y *= 3.;
    }
  }
}
`;class ee extends k{constructor(t){super();n(this,"program");n(this,"uses_texture",!1);this.gl=t,this.program=b(t,q,te)}uniforms(){this.gl.useProgram(this.program);var t=this.gl.getUniformLocation(this.program,"u_viewportCoord");this.gl.uniform2fv(t,[this.gl.canvas.width,this.gl.canvas.height])}attributes(){}use(){this.gl.useProgram(this.program),this.uniforms(),this.attributes()}}class ie{constructor(t,i){n(this,"gl");n(this,"width");n(this,"height");n(this,"carpetShader");n(this,"geometry");const r=G(t);if(!r)throw"Could not create webgl2 context";this.gl=r,this.width=i.res_x,this.height=i.res_y,this.geometry=new _(r),this.carpetShader=new ee(r),this.setup()}getInstructions(){return"Look Sierpinski Carpet!"}setup(){this.gl.canvas.width=this.width,this.gl.canvas.height=this.height,this.gl.viewport(0,0,this.width,this.height)}render(){this.geometry.draw(this.carpetShader,null)}debugRender(){this.geometry.draw(this.carpetShader,null)}}var re=`#version 300 es
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
`;class ne extends k{constructor(t,i){super();n(this,"program");n(this,"uses_texture",!1);n(this,"locations");n(this,"velocities");n(this,"sizes");this.gl=t,this.s_per_cycle=i,this.program=b(t,q,re),this.locations=[Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random()],this.velocities=[(Math.random()-.5)*2,(Math.random()-.5)*2,(Math.random()-.5)*2,(Math.random()-.5)*2,(Math.random()-.5)*2,(Math.random()-.5)*2,(Math.random()-.5)*2,(Math.random()-.5)*2,(Math.random()-.5)*2,(Math.random()-.5)*2,(Math.random()-.5)*2,(Math.random()-.5)*2,(Math.random()-.5)*2,(Math.random()-.5)*2,(Math.random()-.5)*2,(Math.random()-.5)*2,(Math.random()-.5)*2,(Math.random()-.5)*2,(Math.random()-.5)*2,(Math.random()-.5)*2],this.sizes=[Math.random()*1.5+.5,Math.random()*1.5+.5,Math.random()*1.5+.5,Math.random()*1+.5,Math.random()*1+.5,Math.random()*1+.5,Math.random()*1.5+.5,Math.random()*2+.5,Math.random()*2+.5,Math.random()*2+.5]}uniforms(){this.gl.useProgram(this.program);var t=this.gl.getUniformLocation(this.program,"u_viewportCoord");this.gl.uniform2fv(t,[this.gl.canvas.width,this.gl.canvas.height]);var i=this.gl.getUniformLocation(this.program,"u_angle_rad");const o=new Date().getSeconds();this.gl.uniform1f(i,2*Math.PI*(o%this.s_per_cycle)/this.s_per_cycle);for(var s=0;s<this.locations.length;s++)this.locations[s]+=this.velocities[s]*.05/this.s_per_cycle;for(var s=0;s<this.locations.length;s++)this.locations[s]<0&&(this.locations[s]=0,this.velocities[s]*=-1),this.locations[s]>1&&(this.locations[s]=1,this.velocities[s]*=-1);this.gl.uniform2fv(this.gl.getUniformLocation(this.program,"u_locations"),this.locations),this.gl.uniform1fv(this.gl.getUniformLocation(this.program,"u_sizes"),this.sizes)}attributes(){}use(){this.uniforms(),this.attributes()}}class oe{constructor(t,i){n(this,"gl");n(this,"width");n(this,"height");n(this,"shader");n(this,"geometry");const r=G(t);if(!r)throw"Could not create webgl2 context";this.gl=r,this.width=i.res_x,this.height=i.res_y,this.geometry=new _(r),this.shader=new ne(r,10),this.setup()}getInstructions(){return"Look! Metaballs!"}setup(){this.gl.canvas.width=this.width,this.gl.canvas.height=this.height,this.gl.viewport(0,0,this.width,this.height)}render(){this.geometry.draw(this.shader,null)}debugRender(){this.geometry.draw(this.shader,null)}}const Y=300;class se extends N{constructor(t){super();n(this,"points");n(this,"primitive");this.gl=t;const i=1/t.canvas.width/2,r=1/t.canvas.height/2;this.points=[new u(0,r),new u(1-i,1-r)],this.primitive=t.LINES}setCurve(t,i,r,o){this.points=new Array(2+Y*2),this.points[0]=t,this.points[1+Y*2]=r;for(let s=0;s<Y;s++){const a=s/Y,c=t.lerpTo(i,a),h=i.lerpTo(o,a),d=o.lerpTo(r,a),l=c.lerpTo(h,a),y=h.lerpTo(d,a);this.points[2*s+1]=l.lerpTo(y,a),this.points[2*s+2]=l.lerpTo(y,a)}return this}}class ae extends N{constructor(t){super();n(this,"points");n(this,"primitive");this.gl=t;const i=1/t.canvas.width/2,r=1/t.canvas.height/2;this.points=[new u(0,r),new u(1-i,1-r)],this.primitive=t.POINTS}setPoints(t){return this.points=t,this}}const he=50,V=.05;var T;(function(e){e.UP="UP",e.DOWN="DOWN",e.RIGHT="RIGHT",e.LEFT="LEFT"})(T||(T={}));class ce{constructor(t,i){n(this,"gl");n(this,"width");n(this,"height");n(this,"skinGeometry");n(this,"coreGeometry");n(this,"pointGeometry");n(this,"skinShader");n(this,"coreShader");n(this,"pointShader");n(this,"intervalID",0);n(this,"start",new u(0,0));n(this,"startControl",new u(.2,.6));n(this,"end",new u(1,1));n(this,"endControl",new u(.8,.2));n(this,"moveDirection",T.UP);n(this,"keyDown",!1);const r=G(t);if(!r)throw"Could not create webgl2 context";this.gl=r,this.width=i.res_x,this.height=i.res_y,this.skinGeometry=new se(r).setCurve(this.start,this.startControl,this.end,this.endControl),this.coreGeometry=new dt(r),this.pointGeometry=new ae(r).setPoints([this.startControl,this.endControl]),this.skinShader=new z(r,4e3),this.coreShader=new z(r,6e3),this.pointShader=new W(r),this.setup()}getInstructions(){return"Press Arrow keys (one at a time) to control start control point, hold shift whilst doing so to control end control point"}setup(){this.gl.canvas.width=this.width,this.gl.canvas.height=this.height,this.gl.viewport(0,0,this.width,this.height),document.addEventListener("keydown",t=>{if(!t.code.startsWith("Arrow")||this.keyDown)return;this.keyDown=!0;const i=t.shiftKey;let r=0,o=0;switch(t.code){case"ArrowUp":o=1,this.moveDirection=T.UP;break;case"ArrowDown":o=-1,this.moveDirection=T.DOWN;break;case"ArrowRight":r=1,this.moveDirection=T.RIGHT;break;case"ArrowLeft":r=-1,this.moveDirection=T.LEFT;break}console.log("MOVING: "+this.moveDirection),window.clearInterval(this.intervalID);const s=()=>{console.log("UPDATE"),i?this.changePoints(this.start,this.startControl,this.end,this.endControl.incrementBy(r*V,o*V)):this.changePoints(u.zero,this.startControl.incrementBy(r*V,o*V),this.end,this.endControl)};s(),this.intervalID=window.setInterval(s,he)}),document.addEventListener("keyup",t=>{if(!t.code.startsWith("Arrow"))return;let i=!1;switch(t.code){case"ArrowUp":i=this.moveDirection==T.UP;break;case"ArrowDown":i=this.moveDirection==T.DOWN;break;case"ArrowRight":i=this.moveDirection==T.RIGHT;break;case"ArrowLeft":i=this.moveDirection==T.LEFT;break}i&&(console.log("STOPPING: "+this.moveDirection),window.clearInterval(this.intervalID),this.keyDown=!1)})}changePoints(t,i,r,o){console.log(t,i,r,o),this.skinGeometry.setCurve(t,i,r,o),this.start=t,this.startControl=i,this.end=r,this.endControl=o,this.pointGeometry.setPoints([this.startControl,this.endControl])}render(){this.coreGeometry.draw(this.coreShader,null),this.skinGeometry.draw(this.skinShader,null),this.pointGeometry.draw(this.pointShader,null)}debugRender(){}}function lt(e,t,i){var r=e.createShader(t);if(r){e.shaderSource(r,i),e.compileShader(r);var o=e.getShaderParameter(r,e.COMPILE_STATUS);if(o)return r;console.log(e.getShaderInfoLog(r)),e.deleteShader(r)}console.error("Shader creation borked")}function de(e,t,i){var r=e.createProgram();if(r){e.attachShader(r,t),e.attachShader(r,i),e.linkProgram(r);var o=e.getProgramParameter(r,e.LINK_STATUS);if(o)return r;console.log(e.getProgramInfoLog(r)),e.deleteProgram(r)}console.error("Shader program borked")}function b(e,t,i){const r=lt(e,e.VERTEX_SHADER,t),o=lt(e,e.FRAGMENT_SHADER,i);if(!r){const a="failed to make vertex shader";throw console.error(a),a}if(!o){const a="failed to make vertex shader";throw console.error(a),a}const s=de(e,r,o);if(!s){const a="failed to make shader program";throw console.error(a),alert(a),a}if(e.linkProgram(s),!e.getProgramParameter(s,e.LINK_STATUS))throw"Program link failed with: "+e.getProgramInfoLog(s);return s}function G(e){const t=e.getContext("webgl2");return t===null?(alert("Unable to initialize WebGL. Your browser or machine may not support it."),null):t}function ut(e,t,i){const r=e.createBuffer();if(!r){const l="Failed to make position buffer";throw console.error(l),l}ue(e,r,i),e.useProgram(t);var o=e.getAttribLocation(t,"a_position");e.enableVertexAttribArray(o),e.bindBuffer(e.ARRAY_BUFFER,r);var s=2,a=e.FLOAT,c=!1,h=0,d=0;e.vertexAttribPointer(o,s,a,c,h,d)}function gt(e,t,i){const r=e.createBuffer();if(!r){const l="failed to make texcoord buffer";console.error(l),alert(l);return}ge(e,r,i),e.useProgram(t);const o=e.getAttribLocation(t,"a_texcoord");e.enableVertexAttribArray(o),e.bindBuffer(e.ARRAY_BUFFER,r);var s=2,a=e.FLOAT,c=!1,h=0,d=0;e.vertexAttribPointer(o,s,a,c,h,d)}function R(e,t,i,r){switch(e.activeTexture(e.TEXTURE0+i),e.bindTexture(e.TEXTURE_2D,t),r){case x.Repeat:e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT);break;case x.Clamp:e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);break}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST)}var x;(function(e){e[e.Repeat=0]="Repeat",e[e.Clamp=1]="Clamp"})(x||(x={}));function H(e){const t=e.getContext("webgl2");if(!t){const i="couldn't create canvas webgl2 context";throw console.log(i),i}return t}function mt(e){const t=e.getContext("2d");if(!t){const i="couldn't create canvas 2d context";throw console.log(i),i}return t}function D(e){const t=e.createTexture();if(!t)throw"Couldn't create texture";return t}function $(e){const t=e.createFramebuffer();if(!t)throw"Couldn't create texture";return t}async function ot(e,t){var o;const i=(o=t.clipboardData)==null?void 0:o.items;if(!i){const s="Couldn't get items from paste";throw console.log(s),s}for(let s in i){var r=i[s];if(r.kind==="file"){const a=r.getAsFile();if(!a){const h="couldn't get paste blob";throw console.log(h),h}const c=URL.createObjectURL(a);if(!c){const h="couldn't create object url from blob";throw console.log(h),h}return le(c).then(h=>{const d=document.createElement("canvas"),l=document.createElement("canvas"),y=mt(d),S=mt(l);d.width=h.width,d.height=h.height,y.drawImage(h,0,0,h.width,h.height),l.width=e.canvas.width,l.height=e.canvas.height,S.drawImage(d,0,0,d.width,d.height,0,0,l.width,l.height);const g=D(e);e.bindTexture(e.TEXTURE_2D,g),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,l);const m=new _(e),f=new A(e,0);return m.draw(new et(f,g),null),g})}}}function le(e){return new Promise(t=>{const i=new Image;i.onload=()=>{t(i)},i.src=e})}class st{constructor(t,i){if(this.x=t,this.y=i,t<-1||t>1||i<-1||i>1)throw"constructed invalid clip point";this.x=t,this.y=i}static fromUVPoint(t){return new st(t.x*2-1,t.y*2-1)}}class u{constructor(t,i){if(this.x=t,this.y=i,t<0||t>1||i<0||i>1)throw"constructed invalid uv point";this.x=t,this.y=i}static get zero(){return new u(0,0)}lerpTo(t,i){const r=this.x+i*(t.x-this.x),o=this.y+i*(t.y-this.y);return new u(r,o)}incrementBy(t,i){let r=this.x+t;r=r>1?1:r,r=r<0?0:r;let o=this.y+i;return o=o>1?1:o,o=o<0?0:o,new u(r,o)}}function ue(e,t,i){e.bindBuffer(e.ARRAY_BUFFER,t);let r=[];for(let o of i){const s=st.fromUVPoint(o);r.push(s.x),r.push(s.y)}e.bufferData(e.ARRAY_BUFFER,new Float32Array(r),e.STATIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,null)}function ge(e,t,i){e.bindBuffer(e.ARRAY_BUFFER,t);let r=[];for(let o of i)r.push(o.x),r.push(o.y);e.bufferData(e.ARRAY_BUFFER,new Float32Array(r),e.STATIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,null)}class me{constructor(t,i,r){this.res_x=t,this.res_y=i,this.grid_spacing=r}}var P;(function(e){e[e.Border=0]="Border",e[e.Conway=1]="Conway",e[e.Sine=2]="Sine",e[e.Spiral=3]="Spiral",e[e.StaticAdvection=4]="StaticAdvection",e[e.DynamicAdvection=5]="DynamicAdvection",e[e.DrawVelocity=6]="DrawVelocity",e[e.SierpinskiCarpet=7]="SierpinskiCarpet",e[e.Metaballs=8]="Metaballs",e[e.Bezier=9]="Bezier"})(P||(P={}));var B;(function(e){e[e.Color=0]="Color",e[e.Float=1]="Float"})(B||(B={}));function pe(e,t,i){switch(t){case 0:return new $t(e,i);case 1:return new ht(e,i);case 2:return new jt(e,i);case 3:return new Jt(e,i);case 4:return new Qt(e,i);case 5:return new Yt(e,i);case 6:return new Zt(e,i);case 7:return new ie(e,i);case 8:return new oe(e,i);case 9:return new ce(e,i);default:return new ht(e,i)}}class pt{constructor(t,i,r,o,s,a,c,h,d){this.textureTarget=t,this.mipmapLevel=i,this.internalFormat=r,this.width=o,this.height=s,this.border=a,this.format=c,this.type=h,this.pixels=d}}function j(e){return new pt(e.TEXTURE_2D,0,e.RGBA32F,e.canvas.width,e.canvas.height,0,e.RGBA,e.FLOAT,null)}function K(e){return new pt(e.TEXTURE_2D,0,e.RGBA,e.canvas.width,e.canvas.height,0,e.RGBA,e.UNSIGNED_BYTE,null)}function ft(e,t,i,r=null){e.bindTexture(e.TEXTURE_2D,t),e.texImage2D(i.textureTarget,i.mipmapLevel,i.internalFormat,i.width,i.height,i.border,i.format,i.type,r)}function fe(e){const{onCheckShowGrid:t,onChangeRes:i,res:r,onChangeSpacing:o,spacing:s,canvasRef:a,instructions:c}=e;return M.exports.useEffect(()=>{if(!window.location.hash)return;const h=window.location.hash.split("/")[1],d=h.charAt(0).toUpperCase()+h.slice(1),l=P[d];l&&e.setModule(l)}),X("div",{style:{backgroundColor:"black",display:"flex",flex:1,flexDirection:"column"},children:[X(wt,{sx:{position:"fixed",right:0,backgroundColor:"#111",color:"#eee",width:"15%"},children:[v(_t,{"aria-controls":"panel1d-content",id:"panel1d-header",children:v(O,{style:{margin:"auto"},children:"Settings"})}),X(yt,{children:[v(bt,{sx:{color:"white",display:"inline"},onChange:t}),v(O,{sx:{display:"inline"},children:"show grid"}),v(at,{sx:{width:"50%"},value:r,min:1,max:window.innerWidth*window.devicePixelRatio,step:1,onChange:(h,d)=>i(d)}),X(O,{sx:{display:"inline"},children:[" res: ",r]}),v(at,{sx:{width:"50%"},value:s,min:1,max:50,step:1,onChange:(h,d)=>o(d)}),v(O,{sx:{display:"inline"},children:" spacing"})]}),v(Tt,{sx:{minWidth:120},children:X(Rt,{fullWidth:!0,children:[v(St,{id:"demo-simple-select-label",children:"Age"}),v(Et,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:e.module,label:"Module",style:{color:"white"},onChange:h=>{window.location.hash="#/"+P[h.target.value],e.setModule(h.target.value)},children:Object.keys(P).filter(h=>isNaN(Number(h))).map(h=>v(At,{value:P[h],children:h},h))})]})})]}),v("canvas",{ref:a,style:{margin:"auto",width:`${Math.min(window.innerWidth,window.innerHeight)}px`,height:`${Math.min(window.innerWidth,window.innerHeight)}px`,backgroundColor:"grey",imageRendering:"pixelated"}}),v(Ct,{sx:{maxWidth:300},style:{position:"absolute"},children:c})]})}function ve(){function e(g,m,f,w=!1){if(!g||!g.current)return;cancelAnimationFrame(m.current),console.log("Setting up canvas...");const p=f(g.current);S(p.getInstructions());function F(){w?p.debugRender():p.render(),m.current=requestAnimationFrame(F)}return m.current=requestAnimationFrame(F),()=>cancelAnimationFrame(m.current)}let t=tt.useRef(null),i=tt.useRef(-1);const[r,o]=M.exports.useState(!1),[s,a]=M.exports.useState(300),[c,h]=M.exports.useState(1),[d,l]=M.exports.useState(P.Conway),[y,S]=M.exports.useState("");return M.exports.useEffect(()=>{const g=new me(s,s,c);return e(t,i,f=>pe(f,d,g),r)},[t,r,s,c,d]),v("div",{children:v(fe,{onCheckShowGrid:()=>o(!r),onChangeRes:a,res:s,onChangeSpacing:h,spacing:c,canvasRef:t,setModule:l,module:d,instructions:y})})}Dt.render(v(tt.StrictMode,{children:v(ve,{})}),document.getElementById("root"));
